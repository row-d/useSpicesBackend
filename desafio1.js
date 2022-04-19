class Usuario{
	constructor(nombre,apellido,libros=[],mascotas=[]){
		this.nombre=nombre;
		this.apellido=apellido;
		this.libros=libros;
		this.mascotas=mascotas;
	}
	
	getFullName(){
		return this.nombre +' '+this.apellido
	}	
	addMascota(mascotaName){
		this.mascotas.push(mascotaName)
	}
	countMascotas(){
		return this.mascotas.length
	}
	addBook(bookName,autorName){
		this.libros.push({nombre:bookName,autor:autorName})
	}
	getBookNames(){
		return this.libros.map(({nombre})=>nombre)
	}
}

const David = new Usuario('David','Gomez');
console.log(David.getFullName())
David.addMascota('Luna')
console.log(David.countMascotas())
David.addBook('Introduction to Algorithms','Thomas H. Cormen')
console.log(David.getBookNames())
