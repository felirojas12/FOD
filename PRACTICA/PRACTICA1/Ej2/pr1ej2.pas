{Realizar un algoritmo, que utilizando el archivo de números enteros no 
ordenados creado en el ejercicio 1, informe por pantalla cantidad de 
números menores a 15000 y el promedio de los números ingresados. El 
nombre del archivo a procesar debe ser proporcionado por el usuario una 
única vez. Además, el algoritmo deberá listar el contenido del archivo 
en pantalla. Resolver el ejercicio realizando un único recorrido del 
archivo.}
program pr1ej2;
type
	archivo_entero = file of integer;
	str20 = string[20];

function cumple(num: integer; x: integer): boolean;
	begin
		cumple:= num < x;
	end;

function promedio(cant: integer; total: integer): real;
	begin
		promedio:= total/cant;
	end;
var
	archEntero: archivo_entero;
	num, cant, total, cantCumple: integer;
	nombre: str20;
BEGIN
	total:= 0; cant:= 0; cantCumple:= 0;
	write('Ingrese el nombre del archivo con el que va a trabajar: ');
	readln(nombre);
	assign(archEntero,nombre);
	reset(archEntero);
	writeln('Numeros en el archivo: ');
	while (not eof(archEntero)) do begin
		read(archEntero,num);
		write(num,' - ');
		total:= total + num;
		cant:= cant + 1;
		if (cumple(num,15000)) then
			cantCumple:= cantCumple + 1;
	end;
	writeln('FIN');
	writeln(cantCumple,' numeros fueron menores a 15000.');
	writeln('El promedio de los numeros ingresados fue ',promedio(cant,total):0:2);
	close(archEntero);
END.

