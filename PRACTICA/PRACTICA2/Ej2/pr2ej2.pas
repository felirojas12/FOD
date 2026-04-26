{El encargado de ventas de un negocio de productos de limpieza desea 
administrar el stock de los productos que comercializa. Para ello, 
dispone de un archivo maestro en el que se registran todos los 
productos. De cada producto se almacena la siguiente información: 
código de producto, nombre comercial, precio de venta, stock actual y 
stock mínimo. Diariamente se genera un archivo detalle donde se 
registran todas las ventas realizadas. De cada venta se almacena: 
código de producto y cantidad de unidades vendidas. Se solicita 
desarrollar un programa que permita:
a. Actualizar el archivo maestro a partir del archivo detalle, teniendo en cuenta que:
● Ambos archivos están ordenados por código de producto.
● Cada registro del archivo maestro puede ser actualizado por cero, uno o más registros del archivo detalle.
● El archivo detalle sólo contiene registros cuyos códigos existen en el archivo maestro. 
b. Generar un archivo de texto llamado “stock_minimo.txt” que contenga
aquellos productos cuyo stock actual se encuentre por debajo del stock mínimo permitido.}


program pr2ej2;
const
	valorAlto = 9999;
type
	str = string[20];
	producto = record
		cod: integer;
		nombre: str;
		precio: real;
		stock: integer;
		stockmin: integer;
	end;
	venta = record
		cod: integer;
		cant: integer;
	end;
	archivo_productos = file of producto;
	archivo_ventas = file of venta;

procedure leer(var ventas: archivo_ventas; var ven: venta);
	begin
		if (not eof(ventas)) then
			read(ventas,ven)
		else
			ven.cod:= valorAlto;
	end;

procedure imprimirArchivo(var arch: archivo_productos);
var
	p: producto;
begin
	reset(arch);
	while (not eof(arch)) do begin
		read(arch, p);
		writeln('Codigo: ', p.cod, 
		        ' | Nombre: ', p.nombre, 
		        ' | Precio: ', p.precio:0:2,
		        ' | Stock: ',p.stock,
		        ' | Stock minimo: ',p.stockmin);
	end;
	close(arch);
end;

procedure pasarATexto(var productos: archivo_productos; var texto: text);
	var
		p: producto;
	begin
		reset(productos);
		assign(texto,'stock_minimo.txt');
		rewrite(texto);
		while (not eof(productos)) do begin
			read(productos,p);
			if (p.stock < p.stockmin) then begin
				writeln(texto,'Codigo: ', p.cod, 
		        ' | Nombre: ', p.nombre, 
		        ' | Precio: ', p.precio:0:2,
		        ' | Stock: ',p.stock,
		        ' | Stock minimo: ',p.stockmin);
			end;
		end;
		close(productos);
		close(texto);
	end;

VAR
	productos: archivo_productos;
	ventas: archivo_ventas;
	pro: producto;
	ven: venta;
	texto: text;
	codActual,cantVentas: integer;
BEGIN
	assign(productos,'productos.dat');
	assign(ventas,'ventas.dat');
	reset(productos); reset(ventas);
	leer(ventas,ven);
	read(productos,pro);
	while (ven.cod <> valorAlto) do begin
		codActual:= ven.cod;
		cantVentas:= 0;
		while (ven.cod <> valorAlto) and (ven.cod = codActual) do begin
			cantVentas:= cantVentas + ven.cant;
			leer(ventas,ven);
		end;
		while (pro.cod <> codActual) do
			read(productos,pro);
		pro.stock:= pro.stock - cantVentas;
		seek(productos,filePos(productos)-1);
		write(productos,pro);
		if (not eof(productos)) then
			read(productos,pro);
	end;
	close(productos); close(ventas);
	pasarATexto(productos,texto);
	imprimirArchivo(productos);
END.

