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

const David = new Usuario("David", "Gomez");

David.addMascota("Luna");
David.addMascota("Maya");
David.addMascota("Coco");
David.addBook("Introduction to Algorithms", "Thomas H. Cormen");
David.addBook("Clean Code", "Robert Cecil Martin");
David.addBook("Clean Architecture", "Robert Cecil Martin");

console.log(David.getFullName());
console.log("Mascotas: " + David.countMascotas());
console.log("Libros: " + David.getBookNames());
