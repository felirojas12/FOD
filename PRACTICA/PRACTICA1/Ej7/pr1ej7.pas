{7. Realizar un programa que permita:
a) Crear un archivo binario a partir de la
información almacenada en un archivo de texto. El nombre 
del archivo de texto es: “novelas.txt”. La información en el archivo de 
texto consiste en: código de novela, nombre, género y precio de 
diferentes novelas argentinas. Los datos de cada novela se almacenan en 
dos líneas en el archivo de texto. La primera línea contendrá la 
siguiente información: código novela, precio y género, y la segunda 
línea almacenará el nombre de la novela.
b) Abrir el archivo binario y 
permitir la actualización del mismo. Se debe poder agregar una novela y 
modificar una existente. Las búsquedas se realizan por código de 
novela.}


program pr1ej7;
type
	str = string[20];
	novela = record
		cod: integer;
		nombre: str;
		genero: str;
		precio: real;
	end;
	archivo_novela = file of novela;

procedure leerNovela (var nov: novela);
	begin
		write('Ingrese el codigo de la novela (0 para terminar): ');
		readln(nov.cod);
		if (nov.cod <> 0) then begin
			write('Ingrese el nombre de la novela: ');
			readln(nov.nombre);
			write('Ingrese el genero de la novela: ');
			readln(nov.genero);
			write('Ingrese el precio de la novela: ');
			readln(nov.precio);
		end;
	end;

procedure cargarArchivo(var novelas: archivo_novela; var texto: text;
						var nombre: str);
	var
		nov: novela;
	begin
		write('Ingrese el nombre que desea para el archivo binario: ');
		readln(nombre);
		assign(novelas,nombre);
		assign(texto,'novelas.txt');
		reset(texto);
		rewrite(novelas);
		while (not eof(texto)) do begin
			readln(texto,nov.cod,nov.precio,nov.genero);
			readln(texto,nov.nombre);
			write(novelas,nov);
		end;
		writeln('Archivo cargado.');
		close(novelas);close(texto);
	end;

procedure agregarNovela(var novelas: archivo_novela; nombre: str);
	var
		nov: novela;
	begin
		assign(novelas,nombre);
		reset(novelas);
		seek(novelas,fileSize(novelas));
		leerNovela(nov);
		while (nov.cod <> 0) do begin
			write(novelas,nov);
			leerNovela(nov);
		end;
		close(novelas);
	end;

procedure actualizarNovela(var novelas: archivo_novela; nombre: str);
	var
		nov: novela;
		encontre: boolean;
		cod: integer;
	begin
		encontre:= false;
		assign(novelas,nombre);
		reset(novelas);
		write('Ingrese el codigo de novela que desee actualizar: ');
		readln(cod);
		while (not eof(novelas)) and (not encontre) do begin
			read(novelas,nov);
			if (nov.cod = cod) then
				encontre:= true;
		end;
		seek(novelas,filePos(novelas)-1);
		leerNovela(nov);
		write(novelas,nov);
		close(novelas);
	end;

VAR
	novelas: archivo_novela;
	texto: text;
	seleccion: 0..3;
	nombre: str;
BEGIN
	writeln('0. Cerrar el programa.');
	writeln('1. Cargar archivo binario.');
	writeln('2. Agregar una novela.');
	writeln('3. Actualizar una novela');
	writeln;
	write('Ingrese el numero segun lo que desee hacer: ');
	readln(seleccion);
	writeln;
	repeat
		case seleccion of
			1: cargarArchivo(novelas,texto,nombre);
			2: agregarNovela(novelas,nombre);
			3: actualizarNovela(novelas,nombre);
		end;
		write('Ingrese el numero segun lo que desee hacer: ');
		readln(seleccion);
		writeln;
	until (seleccion = 0);
END.

