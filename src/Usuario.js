class Usuario {
  constructor(nombre, apellido, libros = [], mascotas = []) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  getFullName() {
    return this.nombre + " " + this.apellido;
  }

  addMascota(mascotaName) {
    this.mascotas.push(mascotaName);
  }

  countMascotas() {
    return this.mascotas.length;
  }

  addBook(bookName, autorName) {
    this.libros.push({ nombre: bookName, autor: autorName });
  }

  getBookNames() {
    return this.libros.map(({ nombre }) => nombre);
  }
}

module.exports = Usuario;
