const mdLinks = require('../src/index.js');
const { 
  getLinksDirectory,
  validateLinksDirectory,
  statsLinksDirectory,
  statsValidateLinksDirectory,
  getLinksFile,
  validateLinksFile,
  statsLinksFile,
  statsValidateLinksFile,
 } = require('../test/__mocks__/mocks');

const routeDirectory = `${__dirname}/test_directory/`;
const routeFile = `${__dirname}/test_directory/README.md`;
const routeError = `${__dirname}/test_directory/READM.md`;

describe('mdLinks', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof(mdLinks)).toBe('function');
  });

  it('Deberia retornar un arreglo con informacion de archivos markdown', () => {
    return mdLinks(routeDirectory, { validate:false, stats: false }).then((res) => {
      expect(res).toStrictEqual(getLinksDirectory);
    });
  });

  it('Deberia retornar un arreglo con validacion de links de archivos markdown', () => {
    return mdLinks(routeDirectory, { validate: true }).then((res) => {
      expect(res).toStrictEqual(validateLinksDirectory);
    });
  });

  it('Deberia retornar un arreglo con el estado de links de archivos markdown', () => {
    return mdLinks(routeDirectory, { stats: true }).then((res) => {
      expect(res).toStrictEqual(statsLinksDirectory);
    });
  });

  it('Deberia retornar un arreglo con el estado y validacion de links de archivos markdown', () => {
    return mdLinks(routeDirectory, { stats: true, validate: true }).then((res) => {
      expect(res).toStrictEqual(statsValidateLinksDirectory);
    });
  });

  it('Deberia retornar un arreglo con informacion de archivos markdown en un archivo .md', () => {
    return mdLinks(routeFile, { validate: false, stats: false }).then((res) => {
      expect(res).toStrictEqual(getLinksFile);
    });
  });

  it('Deberia retornar un arreglo con validacion de links de archivos markdown en un archivo .md', () => {
    return mdLinks(routeFile, { validate: true }).then((res) => {
      expect(res).toStrictEqual(validateLinksFile);
    });
  });

  it('Deberia retornar un arreglo con el estado de links de archivos markdown en un archivo .md', () => {
    return mdLinks(routeFile, { stats: true }).then((res) => {
      expect(res).toStrictEqual(statsLinksFile);
    });
  });

  it('Deberia retornar un arreglo con el estado y validacion de links de archivos markdown', () => {
    return mdLinks(routeFile, { stats: true, validate: true }).then((res) => {
      expect(res).toStrictEqual(statsValidateLinksFile);
    });
  });

  // it('Debe retornar error en la ruta', () => {
  //   return mdLinks(routeError).then((res) => {
  //     expect(res).toEqual('Error en la ruta');
  //   });
  // });
});
