{Realizar un algoritmo que cree un archivo binario de números enteros 
no ordenados y permita incorporar datos al archivo. Los números son 
ingresados desde el teclado. La carga finaliza cuando se ingresa el 
número 30000, que no debe incorporarse al archivo. El nombre del 
archivo debe ser proporcionado por el usuario desde el teclado.}

program pr1p1;
type
	archivo_entero = file of integer;
	str20 = string[20];
var
	archEntero: archivo_entero;
	num: integer;
	nombre: str20;
BEGIN
	write('Ingrese un nombre para el archivo de enteros: ');
	readln(nombre);
	assign(archEntero, nombre);
	rewrite(archEntero);
	writeln('Ingrese un numero para insertar en el archivo: ');
	readln(num);
	while (num <> 30000) do begin
		write(archEntero,num);
		writeln('Ingrese un numero para insertar en el archivo, 30000 para terminar: ');
		readln(num);
	end;
	writeln('Programa terminado');
	close(archEntero);
END.

