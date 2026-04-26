{Agregar al menú del programa del ejercicio 5, opciones para:
a. Añadir uno o más celulares al final del archivo con sus
datos ingresados por teclado.
b. Modificar el stock de un celular dado.
c. Exportar el contenido del archivo binario a un archivo de texto
denominado: ”SinStock.txt”, con aquellos celulares que tengan stock 0.
NOTA: Las búsquedas deben realizarse por nombre de celular.}
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

procedure leerDatos (var cel: celular);
	begin
		write('Ingrese el codigo del celular: ');
		readln(cel.codigo);
		if (cel.codigo <> 0) then begin
			write('Ingrese el nombre del celular: ');
			readln(cel.nombre);
			write('Ingrese la descripcion del celular: ');
			readln(cel.desc);
			write('Ingrese la marca del celular: ');
			readln(cel.marca);
			write('Ingrese el precio del celular: ');
			readln(cel.precio);
			write('Ingrese el stock actual del celular: ');
			readln(cel.stock);
			write('Ingrese el stock minimo del celular: ');
			readln(cel.stockmin);
		end;
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

procedure agregarNuevos (var celulares: archivo_celular);
	var
		cel: celular;
		nombre: string[20];
	begin
		write('Ingrese el nombre del archivo binario: ');
		readln(nombre);
		assign(celulares, nombre);
		reset(celulares);
		seek(celulares, fileSize(celulares));
		leerDatos(cel);
		while (cel.codigo <> 0) do begin
			write(celulares,cel);
			leerDatos(cel);
		end;
	end;

function buscarPosicion(var celulares: archivo_celular; cod: integer): integer;
	var
		encontre: boolean;
		cel: celular;
	begin
		encontre:= false;
		reset(celulares);
		while (not eof(celulares)) and (not encontre) do begin
			read(celulares,cel);
			if (cel.codigo = cod) then begin
				encontre:= true;
			end;
		end;
		buscarPosicion:= filePos(celulares) - 1;
	end;

procedure modificar (var celulares: archivo_celular);
	var
		cel: celular;
		nombre: string[20];
		cod, nueStock: integer;
	begin
		write('Ingrese el nombre del archivo binario: ');
		readln(nombre);
		assign(celulares, nombre);
		reset(celulares);
		write('Ingrese el codigo del celular que desee modificar: ');
		readln(cod);
		seek(celulares,buscarPosicion(celulares,cod));
		read(celulares,cel);
		write('Ingrese el nuevo stock del celular: ');
		readln(nueStock);
		cel.stock:= nueStock;
		seek(celulares,filePos(celulares)-1);
		write(celulares,cel);
		close(celulares);
	end;

procedure exportarDatosSinStock(var celulares: archivo_celular; var carga: text);
	var
		nombre: string[20];
		cel: celular;
	begin
		write('Ingrese el nombre del archivo binario: ');
		readln(nombre);
		assign(celulares, nombre);
		assign(carga, 'SinStock.txt');
		rewrite(carga);
		reset(celulares);
		while (not eof(celulares)) do begin
			read(celulares,cel);
			if (cel.stock = 0) then begin
				writeln(carga,cel.codigo,' ',cel.precio:0:2,' ',cel.marca);
				writeln(carga,cel.stock,' ',cel.stockmin,' ',cel.desc);
				writeln(carga,cel.nombre);
			end;
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
	writeln('5. Agregar nuevos celulares a un archivo existente.');
	writeln('6. Modificar el stock de un celular.');
	writeln('7. Exportar celulares sin stock a un archivo de texto.');
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
			5: agregarNuevos(celulares);
			6: modificar(celulares);
			7: exportarDatosSinStock(celulares,carga);
		end;
		writeln;
		write('Ingrese el numero segun lo que desea hacer: ');
		readln(seleccion);
	until seleccion = 0;
END.

