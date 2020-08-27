const  md  =  require ( 'markdown-it' ) ();
const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');

const rutaRelativa = route => path.resolve(route);
// console.log(rutaRelativa(__dirname + '/README.md'));

//Leer el archivo .md
const readFile = route => {  
  return new Promise((resolve, reject) => {    
    if (path.extname(route) === '.md'){
      fs.readFile(route, 'utf8', (err, data) => {
        if (err) {
          reject(console.error('Error en la ruta'))
        }
        resolve(data);
      });
    } else {
      console.error('La extension del archivo no es .md, verifica nuevamente');
    };
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

// Opcion --validate 
const validateLinks = route => {
  return new Promise((resolve, reject) => {
    getLinks(route).then((link) => {
      let statusLinks = link.map((elem) => {
        return fetch(elem.URL).then((res) => {
          // console.log(statusLinks);
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
      Promise.all(statusLinks).then((res) => {
        resolve(link);        
    });      
    }).catch((err) => {
      reject(err);
    });    
  }); 
}  



validateLinks(__dirname + '/READMEE.md').then((data) => {
  console.log(data); 
});

// fetch('https://es.wikipedia.org/wiki/Markdon', {  
// }).then((res) => { 
//   console.log(res)  
// });






  









// const rutaValida = route => fs.existsSync(route);

// const rutaAbsoluta = route => path.isAbsolute(route);

// const rutaRelativa = route => path.resolve(route);

// const extension = route => path.extname(route)

// console.log(rutaValida('README.md'));

// console.log(rutaAbsoluta('/README.md'));

// console.log(extension('README.md'));

// console.log(rutaRelativa('/README.md'));


