const md = require ( 'markdown-it' ) ();
const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');

const rutaRelativa = route => path.resolve(route);

//Leer el archivo .md
const readFile = route => {  
  return new Promise((resolve, reject) => {   
    fs.readFile(route, 'utf8', (err, data) => {
      if (err) {
        reject(console.error('Error en la ruta'))
      }
      resolve(data);
    })       
  });
};

//Obtener links e informacion
const getLinks = route => {
  return new Promise ((resolve, reject) => {
    readFile(route).then((res) => {
      let arrayLink = [];
      const regExp = /<a href="(http.*?)">(.*?)<\/a>/g;
      const convertHtml = md.render(res);
      const results = convertHtml.split('\n');      
      results.forEach((elem) => {
        elem.replace(regExp, (match, texto1, texto2) => {
          arrayLink.push({
            URL: texto1,
            Text: texto2,
            File: rutaRelativa(route),            
          });
        });
      });
      resolve(arrayLink);
    }).catch((err) => {
      reject(console.error(err))
    });
  });
};

// Identificar si es un archivo o directorio
const directoryOrFile = route => {
  const filesMd = [];
  if (path.extname(route) === '.md'){
    filesMd.push(route)      
    return filesMd
  } else {
    const files = fs.readdirSync(route)              
    const filesFilter = files.filter(file => path.extname(file) === '.md' )
    filesFilter.forEach((elem) => {
      const validFiles = path.join(route, elem);
      filesMd.push(validFiles)
    })   
    return filesMd       
  }
}

// Opcion --validate 
const validateLinks = route => {
  return new Promise((resolve, reject) => {
    getLinks(route).then((link) => {
      let statusLinks = link.map((elem) => {        
        return fetch(elem.URL).then((res) => {         
          if(res.status <= 299) {
            elem.status = "OK";
            elem.statusNumber = res.status;
          } else if (res.status > 299 && res.status <= 499) {
            elem.status = "FAIL";
            elem.statusNumber = res.status;
          }          
        }).catch((err) => {
          elem.status = `Error en el servidor, no se encuentra la pagina => ${err}`;
        });
      });
      Promise.all(statusLinks).then(() => {
        resolve(link);        
      });      
    }).catch((err) => {
      reject(err);
    });    
  }); 
}  


//Opcion --stats
const statsLink = route => {
  return new Promise((resolve, reject) => {
    getLinks(route).then((link) => {
      const linksUnique = new Set(link.map(elem => elem.URL))
      resolve({
        File: rutaRelativa(route),
        Unique: linksUnique.size,
        Total: link.length,
      })
    }).catch((err) => {
      reject(err);
    })
  })
}

// opcion --validate y --stats
const optionStatsValidate = route => {
  return new Promise((resolve, reject) => {
    validateLinks(route).then((links) => {
      const linksUnique = new Set(links.map(elem => elem.URL))
      let content = 0;
      links.forEach((elem) => {
        if (elem.status !== 'OK') {
          content += 1;
        }
      })          
      resolve({
      File: rutaRelativa(route),
      Unique: linksUnique.size,
      Total: links.length,
      Broken: content,
      });
    }).catch((err) => {
      reject(err)
    })   
  })
}

const mdLinks = (route, options) => {
  return new Promise ((resolve, reject) => {
    const filesDirectory = directoryOrFile(route); 
    let variables = filesDirectory.map((elem) => {      
      if (options.validate && !options.stats) {    
        return validateLinks(elem);
      } else if (options.stats && !options.validate) {
        return statsLink(elem);
      } else if (options.validate && options.stats) {        
        return optionStatsValidate(elem);
      } else if (options) {
        return getLinks(elem);
      }
    })
    
    Promise.all(variables).then((res) => {
      let newArray = [].concat.apply([], res);      
      resolve(newArray);        
    }).catch(err => {
      reject(err)
    })
  })
}

module.exports = mdLinks;












  












