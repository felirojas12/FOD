program pr2ej2;
{es un programa hecho con IA para cargar los archivos que se disponen}
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

{-------------------- LECTURA SEGURA --------------------}
procedure leer(var ventas: archivo_ventas; var ven: venta);
begin
	if (not eof(ventas)) then
		read(ventas, ven)
	else
		ven.cod := valorAlto;
end;

{-------------------- CARGAR MAESTRO --------------------}
procedure cargarMaestro(var arch: archivo_productos);
var
	p: producto;
begin
	rewrite(arch);

	{ Datos ordenados por código }
	p.cod := 1; p.nombre := 'Lavandina'; p.precio := 100; p.stock := 50; p.stockmin := 20; write(arch, p);
	p.cod := 2; p.nombre := 'Detergente'; p.precio := 200; p.stock := 40; p.stockmin := 15; write(arch, p);
	p.cod := 3; p.nombre := 'Jabon'; p.precio := 150; p.stock := 30; p.stockmin := 10; write(arch, p);
	p.cod := 4; p.nombre := 'Desinfectante'; p.precio := 250; p.stock := 25; p.stockmin := 10; write(arch, p);

	close(arch);
end;

{-------------------- CARGAR DETALLE --------------------}
procedure cargarDetalle(var arch: archivo_ventas);
var
	v: venta;
begin
	rewrite(arch);

	{ También ordenado por código }
	v.cod := 1; v.cant := 10; write(arch, v);
	v.cod := 1; v.cant := 5; write(arch, v);

	v.cod := 2; v.cant := 20; write(arch, v);

	v.cod := 3; v.cant := 15; write(arch, v);
	v.cod := 3; v.cant := 10; write(arch, v);

	v.cod := 4; v.cant := 5; write(arch, v);

	close(arch);
end;
var
	productos: archivo_productos;
	ventas: archivo_ventas;
begin
	assign(productos, 'productos.dat');
	assign(ventas, 'ventas.dat');
	cargarMaestro(productos);
	cargarDetalle(ventas);
	writeln('Proceso completo.');
end.
