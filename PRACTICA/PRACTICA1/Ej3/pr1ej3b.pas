{b. Abrir el archivo anteriormente generado y:
1. Listar en pantalla los datos de empleados que tengan un nombre o
apellido determinado, el cual se proporciona desde el teclado.
2. Listar en pantalla los empleados de a uno por línea.
3. Listar en pantalla los empleados mayores de 70 años,
próximos a jubilarse.}


program pr1ej3b;
type
	empleado = record
		numero: integer;
		apellido: string[20];
		nombre: string[20];
		edad: integer;
		dni: string[9];
	end;
	archivo_empleado = file of empleado;

procedure mostrarDatos(emp: empleado);
	begin
		writeln('Numero de empleado: ',emp.numero);
		writeln('Apellido de empleado: ',emp.apellido);
		writeln('Nombre de empleado: ',emp.nombre);
		writeln('Edad de empleado: ',emp.edad);
		writeln('DNI de empleado: ',emp.dni);
	end;

procedure mostrarDatosLinea(emp: empleado);
	begin
		write('Numero de empleado: ',emp.numero);
		write(' / Apellido de empleado: ',emp.apellido);
		write(' / Nombre de empleado: ',emp.nombre);
		write(' / Edad de empleado: ',emp.edad);
		writeln(' / DNI de empleado: ',emp.dni);
	end;
	
VAR
	archEmpleado: archivo_empleado;
	emp: empleado;
	nombre, apellidoBuscar: string[20];
	seleccion: integer;
	encontre: boolean;
BEGIN
	encontre:= false;
	write('Ingrese el nombre del archivo a abrir: ');
	readln(nombre);
	assign(archEmpleado, nombre);
	reset(archEmpleado);
	writeln('Ingrese el numero segun lo que quiera hacer: ');
	writeln('1. Listar en pantalla los datos de empleados que tengan un nombre o apellido determinado, el cual se proporciona desde el teclado.');
	writeln('2. Listar en pantalla los empleados de a uno por linea.');
	writeln('3. Listar en pantalla los empleados mayores de 70 anios, proximos a jubilarse.');
	readln(seleccion);
	case seleccion of
		1:
		begin
			write('Ingrese el apellido del empleado que desea buscar: ');
			readln(apellidoBuscar);
			while (not eof(archEmpleado)) and (encontre = false) do begin
				read(archEmpleado, emp);
				if (emp.apellido = apellidoBuscar) then begin
					mostrarDatos(emp);
					encontre:= true;
				end;
			end;
		end;
		2:
		begin
			while (not eof(archEmpleado)) do begin
				read(archEmpleado, emp);
				mostrarDatosLinea(emp);
			end;
		end;
		3:
		begin
			while (not eof(archEmpleado)) do begin
				read(archEmpleado, emp);
				if (emp.edad > 70) then
					mostrarDatos(emp);
			end;
		end;
	end;
	close(archEmpleado);
END.

