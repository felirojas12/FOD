program cargarArchivoEmpleados;
{es un programa hecho con IA para cargar el archivo que se dispone}
type
	str = string[20];
	empleado = record
		cod: integer;
		nombre: str;
		monto: real;
	end;
	archivo_empleados = file of empleado;
var
	arch: archivo_empleados;
	e: empleado;
begin
	{ Asociar archivo lógico con físico }
	assign(arch, 'empleados.dat');
	
	{ Crear archivo }
	rewrite(arch);

	{ Leer primer código }
	writeln('Ingrese el codigo del empleado (0 para finalizar): ');
	readln(e.cod);

	while (e.cod <> 0) do begin
		writeln('Ingrese el nombre del empleado: ');
		readln(e.nombre);
		writeln('Ingrese el monto de la comision: ');
		readln(e.monto);
		{ Escribir en el archivo }
		write(arch, e);
		writeln;
		writeln('Ingrese el codigo del empleado (0 para finalizar): ');
		readln(e.cod);
	end;
	{ Cerrar archivo }
	close(arch);
	writeln('Archivo cargado correctamente.');
end.
