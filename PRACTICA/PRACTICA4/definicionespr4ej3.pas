program punto2a;
const M = 8;
type
	str = string[20];
	reg_alumno = record
		apellido: str;
		nombre: str;
		dni: str;
		legajo: str;
		anioIngreso: integer;
	end;
	
	tNodo = record
		cantDatos: integer;
		claves: array[1..M-1] of integer;
		enlaces: array[1..M-1] of integer;
		hijos: array[1..M] of integer;
		sigHermano: integer;
	end;
	
	tArchArbol = file of tNodo;
	tArchDatos = file of reg_alumno;

var
	arbol: tArchArbol;
	datos: tArchDatos;
begin
	writeln('Ejercicio 3 de practica 4');
end;
