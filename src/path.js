const path = require('path');
const fs = require('fs');

// Directorio o archivo
const directoryOrFile = route => {
  return new Promise ((resolve, reject) => {
    fs.stat(route, (err, stats) => {
      if (err) {
        reject(console.log(`'Ruta no valida, error' => ${err}`))
      } else if (stats.isFile()) {
        resolve(true);
      } else if (stats.isDirectory()) {
        resolve(true);
      }          
    });
  });
}

// Obtener archivos del directorio
const getFilesDirectory = route => {  
  return new Promise ((resolve, reject) => {
    fs.readdir(route, (err, files) => {
      if (err) {
        reject(console.error('error'));
      } resolve (files)
    });
  });;
}

// const directoryOrFile = route => {
//   if (path.extname(route) === '.md') {
//     console.log('sii');
//     return true
//   } else {
//     return new Promise ((resolve, reject) => {
//       getFilesDirectory(route).then(files => {
//         resolve(files);
//         console.log(files);
//       }).catch(err => {
//         reject(console.error(err));
//       })     
//     })
//   }
// }


console.log(__dirname + '/README.md');
directoryOrFile(__dirname + '/README.md').then((data) => {
  console.log(data); 
});

// console.log(directoryOrFile(__dirname + 'README.md'))


const rutaValida = route => fs.existsSync(route);

const rutaAbsoluta = route => path.isAbsolute(route);

const rutaRelativa = route => path.resolve(route);

const extension = route => path.extname(route);


// console.log(rutaValida('README.md'));

// console.log(rutaAbsoluta('/README.md'));

// console.log(extension('README.md'));

// console.log(rutaRelativa('/README.md'));


// fs.readdir('src', (err, archivos) => {
//   let routes = [];
//   if (err) {
//     console.log('error');
//   } 
//   for (let i = 0; i < archivos.length; i++) {
//     routes.push(path.resolve(archivos[i]));
//   }
//   console.log(routes);
// })

// fs.stat('README.md', (err, stats) => {
// if (stats.isDirectory()) {  
//   console.log(true);
// } else if (stats.isFile()) {
//   console.log(false)
// } else {
//  console.error(err);
// }
// });






