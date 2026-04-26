{Realizar un programa para una tienda de celulares, que presente un 
menú con opciones para:
a. Crear un archivo de registros no ordenados 
de celulares y cargarlo con datos ingresados desde un archivo de texto 
denominado “celulares.txt”. Los registros correspondientes a los 
celulares deben contener: código de celular, nombre, descripción, 
marca, precio, stock mínimo y stock disponible. El formato del archivo 
de texto de carga se especifica en la NOTA 2 ubicada al final del 
ejercicio.
b. Listar en pantalla los datos de aquellos celulares que 
tengan un stock menor al stock mínimo.
c. Listar en pantalla los 
celulares del archivo cuya descripción contenga una cadena de 
caracteres proporcionada por el usuario.
d. Exportar el archivo binario 
creado en el inciso a) a un archivo de texto denominado “celulares.txt” 
con todos los celulares del mismo. El archivo de texto generado podría 
ser utilizado en un futuro como archivo de carga (ver inciso a), por lo 
que debería respetar el formato dado para este tipo de archivos en la 
NOTA 2.}

program untitled;

type
	celular = record
		codigo: integer;
		nombre: string[20];
		desc: string[20];
		marca: string[20];
		precio: real;
		stockmin: integer;
		stock: integer;
	end;
	
	archivo_celular = file of celular;

procedure crearCargar(var celulares: archivo_celular; var carga: text);
	var
		nombre: string[20];
		cel: celular;
	begin
		write('Ingrese el nombre para el archivo binario: ');
		readln(nombre);
		assign(celulares, nombre);
		assign(carga, 'celulares.txt');
		rewrite(celulares);
		reset(carga);
		while (not eof(carga)) do begin
			readln(carga,cel.codigo,cel.precio,cel.marca);
			readln(carga,cel.stock,cel.stockmin,cel.desc);
			readln(carga,cel.nombre);
			write(celulares,cel);
		end;
		writeln('Archivo cargado');
		close(celulares); close(carga);
	end;
	
procedure mostrarDatos (cel: celular);
	begin
		writeln('Codigo de celular: ', cel.codigo);
		writeln('Nombre: ', cel.nombre);
		writeln('Descripcion: ', cel.desc);
		writeln('Marca: ', cel.marca);
		writeln('Precio: ', cel.precio:0:2);
		writeln('Stock actual: ', cel.stock);
		writeln('Stock minimo: ', cel.stockmin);
	end;

procedure controlStock (var celulares: archivo_celular);
	var
		cel: celular;
		nombre: string[20];
	begin
		write('Ingrese el nombre para el archivo binario: ');
		readln(nombre);
		assign(celulares, nombre);
		reset(celulares);
		writeln('||| CELULARES CON STOCK DISMINUIDO |||');
		while (not eof(celulares)) do begin
			read(celulares, cel);
			if (cel.stock < cel.stockmin) then
				mostrarDatos(cel);
		end;
		close(celulares);
	end;

procedure controlDescripcion (var celulares: archivo_celular);
	var
		cel: celular;
		nombre: string[20];
	begin
		write('Ingrese el nombre para el archivo binario: ');
		readln(nombre);
		assign(celulares, nombre);
		reset(celulares);
		writeln('||| CELULARES CON DESCRIPCION |||');
		while (not eof(celulares)) do begin
			read(celulares, cel);
			if (cel.desc <> '') then
				mostrarDatos(cel);
		end;
		close(celulares);
	end;

procedure exportarDatos(var celulares: archivo_celular; var carga: text);
	var
		nombre: string[20];
		cel: celular;
	begin
		write('Ingrese el nombre del archivo binario: ');
		readln(nombre);
		assign(celulares, nombre);
		assign(carga, 'celulares.txt');
		rewrite(carga);
		reset(celulares);
		while (not eof(celulares)) do begin
			read(celulares,cel);
			writeln(carga,cel.codigo,' ',cel.precio:0:2,' ',cel.marca);
			writeln(carga,cel.stock,' ',cel.stockmin,' ',cel.desc);
			writeln(carga,cel.nombre);
		end;
		writeln('Texto cargado');
		close(celulares); close(carga);
	end;

VAR
	celulares: archivo_celular;
	carga: text;
	seleccion: integer;
BEGIN
	writeln('0. Cerrar programa.');
	writeln('1. Crear archivo binario a partir de texto.');
	writeln('2. Listar los celulares con stock menor al minimo.');
	writeln('3. Listar los celulares con descripcion.');
	writeln('4. Exportar lista de celulares a un texto con el formato debido.');
	writeln;
	write('Ingrese el numero segun lo que desea hacer: ');
	readln(seleccion);
	repeat
		writeln;
		case seleccion of
			1: crearCargar(celulares,carga);
			2: controlStock(celulares);
			3: controlDescripcion(celulares);
			4: exportarDatos(celulares, carga);
		end;
		writeln;
		write('Ingrese el numero segun lo que desea hacer: ');
		readln(seleccion);
	until seleccion = 0;
END.

