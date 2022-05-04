import Usuario from "../Usuario";

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
