{Una cadena de tiendas de indumentaria dispone de un archivo maestro no 
ordenado que contiene la información de las prendas que se encuentran a 
la venta. De cada prenda se registran los siguientes datos: cod_prenda, 
descripción, colores, tipo_prenda, stock y precio_unitario.
Debido a un cambio de temporada, es necesario actualizar las prendas disponibles. 
Para ello, se recibe un archivo detalle que contiene los códigos 
(cod_prenda) de aquellas prendas que quedarán obsoletas. Se deberá 
implementar un procedimiento que reciba ambos archivos y realice la 
baja lógica de las prendas indicadas; para ello, se deberá modificar el 
campo stock de la prenda correspondiente asignándole un valor negativo 
como marca de eliminación.
Adicionalmente, se deberá implementar otro 
procedimiento que permita efectivizar las bajas lógicas realizadas 
sobre el archivo maestro. Para ello, se deberá crear un archivo 
auxiliar en el cual se copien únicamente aquellas prendas que no estén 
marcadas como eliminadas (es decir, aquellas cuyo stock sea mayor o 
igual a cero).
Finalmente, una vez completado el proceso de 
compactación, el archivo auxiliar deberá reemplazar al archivo maestro 
original, adoptando su mismo nombre.}
program indumentaria;
type
	str = string[20];
	reg_prenda = record
		cod: integer;
		descripcion: str;
		colores: str;
		tipo: str;
		stock: integer;
		precio: real;
	end;
	
	tArchMaestro = file of reg_prenda;
	tArchDetalle = file of integer;

procedure leerPrenda(var prenda: reg_prenda);
	begin
		writeln();
		writeln('||| PRENDA NUEVA |||');
		write('Ingrese el codigo de la prenda (0 para terminar): ');
		readln(prenda.cod);
		if (prenda.cod <> 0) then begin
			write('Ingrese la descripcion de la prenda: ');
			readln(prenda.descripcion);
			write('Ingrese los colores de la prenda: ');
			readln(prenda.colores);
			write('Ingrese el tipo de la prenda: ');
			readln(prenda.tipo);
			write('Ingrese el stock de la prenda: ');
			readln(prenda.stock);
			write('Ingrese el precio de la prenda: ');
			readln(prenda.precio);
		end;
	end;

procedure imprimirMaestro(var maestro: tArchMaestro);
	var
		prenda: reg_prenda;
	begin
		assign(maestro, 'maestro.dat');
		reset(maestro);
		writeln();
		writeln('||| ARCHIVO MAESTRO |||');
		writeln();
		while (not eof(maestro)) do begin
			read(maestro, prenda);
			writeln('Codigo: ', prenda.cod);
			writeln('Descripcion: ', prenda.descripcion);
			writeln('Colores: ', prenda.colores);
			writeln('Tipo: ', prenda.tipo);
			writeln('Stock: ', prenda.stock);
			writeln('Precio: $', prenda.precio:0:2);
			writeln('-----------------------------');
		end;
		close(maestro);
end;

procedure cargarMaestro(var arch: tArchMaestro);
	var
		prenda: reg_prenda;
	begin
		assign(arch, 'maestro.dat');
		rewrite(arch);
		leerPrenda(prenda);
		while (prenda.cod <> 0) do begin
			write(arch,prenda);
			leerPrenda(prenda);
		end;
		close(arch);
	end;

procedure cargarDetalle(var arch: tArchDetalle);
	var
		num: integer;
	begin
		assign(arch,'detalle.dat');
		rewrite(arch);
		writeln();
		write('Ingrese el codigo de las prendas que desee eliminar (0 para terminar): ');
		readln(num);
		while (num <> 0) do begin
			write(arch,num);
			write('Ingrese el codigo de las prendas que desee eliminar (0 para terminar): ');
			readln(num);
		end;
		close(arch);
	end;

procedure darBajaLogica(var maestro: tArchMaestro; var detalle: tArchDetalle);
	var
		codABuscar: integer;
		prenda: reg_prenda;
		encontre: boolean;
	begin
		assign(maestro,'maestro.dat'); assign(detalle,'detalle.dat');
		reset(detalle);
		while (not eof(detalle)) do begin
			encontre:= false;
			reset(maestro);
			read(detalle,codABuscar);
			while (not eof(maestro)) and (not encontre) do begin
				read(maestro,prenda);
				if (prenda.cod = codABuscar) then begin
					encontre:= true;
					prenda.stock:= -prenda.stock;
					seek(maestro,filePos(maestro)-1);
					write(maestro,prenda);
				end;
			end;
			close(maestro);
		end;
		close(detalle);
	end;

procedure efectivizarBajas(var maestro: tArchMaestro);
	var
		maestroNuevo: tArchMaestro;
		prenda: reg_prenda;
	begin
		assign(maestro,'maestro.dat'); assign(maestroNuevo,'maestroNuevo.dat');
		reset(maestro); rewrite(maestroNuevo);
		while (not eof(maestro)) do begin
			read(maestro, prenda);
			if (prenda.stock >= 0) then
				write(maestroNuevo, prenda);
		end;
		close(maestro); close(maestroNuevo);
		rename(maestro,'maestroViejo.dat');
		rename(maestroNuevo,'maestro.dat');
	end;

VAR
	maestro: tArchMaestro;
	detalle: tArchDetalle;
BEGIN
	cargarMaestro(maestro);
	cargarDetalle(detalle);
	darBajaLogica(maestro, detalle);
	efectivizarBajas(maestro);
	imprimirMaestro(maestro);
END.

