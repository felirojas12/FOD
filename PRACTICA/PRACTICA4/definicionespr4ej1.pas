program punto1a;
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
		datos: array[1..M-1] of reg_alumno;
		hijos: array[1..M] of integer;
	end;
	
	tArchArbol = file of tNodo;

var
	arbol: tArchArbol;
begin
	writeln('Ejercicio 1 de practica 4');
end;
