// const path = require('path');
// const fs = require('fs');

// // Directorio o archivo
// const directoryOrFile = route => {
//   return new Promise ((resolve, reject) => {
//     fs.stat(route, (err, stats) => {
//       if (err) {
//         reject(console.log(`'Ruta no valida, error' => ${err}`))
//       } else if (stats.isFile()) {
//         resolve(true);
//       } else if (stats.isDirectory()) {
//         resolve(true);
//       }          
//     });
//   });
// }

// // Obtener archivos del directorio
// const getFilesDirectory = route => {  
//   return new Promise ((resolve, reject) => {
//     fs.readdir(route, (err, files) => {
//       if (err) {
//         reject(console.error('error'));
//       } resolve (files)
//     });
//   });
// }

// console.log(__dirname + '/README.md');
// directoryOrFile(__dirname + '/README.md').then((data) => {
//   console.log(data); 
// });

// // console.log(directoryOrFile(__dirname + 'README.md'))


// const rutaValida = route => fs.existsSync(route);

// const rutaAbsoluta = route => path.isAbsolute(route);

// const rutaRelativa = route => path.resolve(route);

// const extension = route => path.extname(route);








