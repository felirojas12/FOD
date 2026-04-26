{Una empresa posee un archivo que contiene información sobre los 
ingresos percibidos por diferentes empleados en concepto de comisión. 
De cada empleado se conoce: código de empleado, nombre y monto de la 
comisión. La información del archivo se encuentra ordenada por código 
de empleado, y cada empleado puede aparecer más de una vez en el 
archivo de comisiones. Se solicita realizar un procedimiento que reciba 
el archivo anteriormente descrito y lo compacte. Como resultado, deberá 
generar un nuevo archivo en el cual cada empleado aparezca una única 
vez, con el valor total acumulado de sus comisiones.
Nota: No se conoce a priori la cantidad de empleados.
Además, el archivo debe ser recorrido una única vez.}


program pr2ej1;
const
	valorAlto = 9999;
type
	str = string[20];
	empleado = record
		cod: integer;
		nombre: str;
		monto: real;
	end;
	archivo_empleados = file of empleado;

procedure leer(var comisiones: archivo_empleados; var emp: empleado);
	begin
		if (not eof(comisiones)) then
			read(comisiones,emp)
		else
			emp.cod:= valorAlto;
	end;

procedure imprimirArchivo(var arch: archivo_empleados);
var
	e: empleado;
begin
	reset(arch);
	while (not eof(arch)) do begin
		read(arch, e);
		writeln('Codigo: ', e.cod, 
		        ' | Nombre: ', e.nombre, 
		        ' | Total comisiones: ', e.monto:0:2);
	end;
	close(arch);
end;

VAR
	emp, empCarga: empleado;
	comisiones, compacto: archivo_empleados;
	codActual: integer;
	montoCalculo: real;
	nombreActual: str;
BEGIN
	assign(comisiones,'empleados.dat');
	assign(compacto,'empleadosCompacto.dat');
	reset(comisiones);
	rewrite(compacto);
	leer(comisiones,emp);
	while (emp.cod <> valorAlto) do begin
		codActual:= emp.cod; nombreActual:= emp.nombre;
		montoCalculo:= 0;
		while (emp.cod <> valorAlto) and (codActual = emp.cod) do begin
			montoCalculo:= montoCalculo + emp.monto;
			leer(comisiones,emp);
		end;
		empCarga.cod:= codActual;
		empCarga.nombre:= nombreActual;
		empCarga.monto:= montoCalculo;
		write(compacto,empCarga);  
	end;
	close(comisiones); close(compacto);
	imprimirArchivo(comisiones);
	imprimirArchivo(compacto);
END.

