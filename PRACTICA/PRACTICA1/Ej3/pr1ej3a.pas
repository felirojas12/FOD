{Realizar un programa que presente un menú con opciones para:
a. Crear un archivo binario de registros no ordenados de empleados y 
completarlo con datos ingresados desde teclado.
De cada empleado se registra: número de empleado, apellido, nombre,
edad y DNI. Algunos empleados  pueden ingresan el DNI con valor 0,
lo que significa que al momento de la carga puede no tenerlo.
La carga finaliza cuando se ingresa el String ‘fin’ como apellido.}
program pr1ej3a;
type
	empleado = record
		numero: integer;
		apellido: string[20];
		nombre: string[20];
		edad: integer;
		dni: string[9];
	end;
	archivo_empleado = file of empleado;

procedure leerEmpleado(var emp: empleado);
	begin
		write('Ingrese el numero del empleado: ');
		readln(emp.numero);
		write('Ingrese el apellido del empleado: ');
		readln(emp.apellido);
		if (emp.apellido <> 'fin') then begin
			write('Ingrese el nombre del empleado: ');
			readln(emp.nombre);
			write('Ingrese la edad del empleado: ');
			readln(emp.edad);
			write('Ingrese el DNI del empleado: ');
			readln(emp.dni);
		end;
	end;

VAR
	archEmpleado: archivo_empleado;
	emp: empleado;
	nombre: string[20];
BEGIN
	write('Ingrese el nombre del archivo a crear: ');
	readln(nombre);
	assign(archEmpleado, nombre);
	rewrite(archEmpleado);
	writeln('|| INGRESO DE EMPLEADOS ||');
	leerEmpleado(emp);
	while (emp.apellido <> 'fin') do begin
		write(archEmpleado,emp);
		leerEmpleado(emp);
	end;
	close(archEmpleado);
END.

