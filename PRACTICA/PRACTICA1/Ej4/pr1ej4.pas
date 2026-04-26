{a. Añadir uno o más empleados al final del archivo con sus datos ingresados
por teclado. Tener en cuenta que no se debe agregar al archivo un empleado
con un número de empleado ya registrado (control de unicidad).
b. Modificar la edad de un empleado dado.
c. Exportar el contenido del archivo a un archivo de
texto llamado “todos_empleados.txt”.
d. Exportar a un archivo de texto llamado “faltaDNIEmpleado.txt”,
los empleados que no tengan cargado el DNI (DNI en 0).}

program pr1ej4;
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
	
procedure exportarDatos(var archEmpleado: archivo_empleado;var archTexto: text);
	var
		nombre: string[20];
		emp: empleado;
	begin
		write('Ingrese el nombre que desea para el archivo de texto: ');
		readln(nombre);
		assign(archTexto,nombre);
		reset(archEmpleado);
		rewrite(archTexto);
		writeln(archTexto, '||||| EMPLEADOS |||||');
		while (not eof(archEmpleado)) do begin
			read(archEmpleado, emp);
			writeln(archTexto,'Numero de empleado: ',emp.numero);
			writeln(archTexto,'Apellido de empleado: ',emp.apellido);
			writeln(archTexto,'Nombre de empleado: ',emp.nombre);
			writeln(archTexto,'Edad de empleado: ',emp.edad);
			writeln(archTexto,'DNI de empleado: ',emp.dni);
			writeln(archTexto,'');
		end;
		close(archEmpleado); close(archTexto);
	end;

procedure exportarDatosDNI(var archEmpleado: archivo_empleado;var archDNI: text);
	var
		nombre: string[20];
		emp: empleado;
	begin
		write('Ingrese el nombre que desea para el archivo de texto: ');
		readln(nombre);
		assign(archDNI,nombre);
		reset(archEmpleado);
		rewrite(archDNI);
		writeln(archDNI, '||||| EMPLEADOS |||||');
		while (not eof(archEmpleado)) do begin
			read(archEmpleado, emp);
			if (emp.dni = '0') then begin
				writeln(archDNI,'Numero de empleado: ',emp.numero);
				writeln(archDNI,'Apellido de empleado: ',emp.apellido);
				writeln(archDNI,'Nombre de empleado: ',emp.nombre);
				writeln(archDNI,'Edad de empleado: ',emp.edad);
				writeln(archDNI,'DNI de empleado: ',emp.dni);
				writeln(archDNI,'');
			end;
		end;
		close(archEmpleado); close(archDNI);
	end;


VAR
	archEmpleado: archivo_empleado;
	archTexto, archDNI: Text;
	emp, empAuxiliar: empleado;
	nombre, apellidoBuscar: string[20];
	seleccion, numEmpleado, edadNueva: integer;
	encontre, puedeAgregar: boolean;
BEGIN
	encontre:= false; puedeAgregar:= true;
	write('Ingrese el nombre del archivo a abrir: ');
	readln(nombre);
	assign(archEmpleado, nombre);
	writeln('Ingrese el numero segun lo que quiera hacer: ');
	writeln('1. Listar en pantalla los datos de empleados que tengan un nombre o apellido determinado, el cual se proporciona desde el teclado.');
	writeln('2. Listar en pantalla los empleados de a uno por linea.');
	writeln('3. Listar en pantalla los empleados mayores de 70 anios, proximos a jubilarse.');
	writeln('4. Aniadir mas empleados al archivo.');
	writeln('5. Modificar la edad de un empleado.');
	writeln('6. Exportar los datos a un archivo de texto.');
	writeln('7. Exportar los datos de los empleados sin DNI a un archivo de texto.');
	readln(seleccion);
	repeat
		case seleccion of
			1:
			begin
				reset(archEmpleado);
				write('Ingrese el apellido del empleado que desea buscar: ');
				readln(apellidoBuscar);
				while (not eof(archEmpleado)) and (encontre = false) do begin
					read(archEmpleado, emp);
					if (emp.apellido = apellidoBuscar) then begin
						mostrarDatos(emp);
						encontre:= true;
					end;
				end;
				close(archEmpleado);
			end;
			2:
			begin
				reset(archEmpleado);
				while (not eof(archEmpleado)) do begin
					read(archEmpleado, emp);
					mostrarDatosLinea(emp);
				end;
				close(archEmpleado);
			end;
			3:
			begin
				reset(archEmpleado);
				while (not eof(archEmpleado)) do begin
					read(archEmpleado, emp);
					if (emp.edad > 70) then
						mostrarDatos(emp);
				end;
				close(archEmpleado);
			end;
			4:
			begin
				reset(archEmpleado);
				writeln('|| INGRESO DE EMPLEADOS ||');
				leerEmpleado(emp);
				while (emp.apellido <> 'fin') do begin
					while (not eof(archEmpleado)) do begin
						read(archEmpleado, empAuxiliar);
						if (empAuxiliar.numero = emp.numero) then
							puedeAgregar:= false;
					end;
					if puedeAgregar then begin
						seek(archEmpleado, fileSize(archEmpleado));
						write(archEmpleado, emp);
					end
					else
						writeln('El numero de empleado ya fue ingresado.');
					leerEmpleado(emp);
				end;
				close(archEmpleado);
			end;
			5:
			begin
				reset(archEmpleado);
				write('Ingrese el numero del empleado al que desee modificar la edad: ');
				readln(numEmpleado);
				while (not eof(archEmpleado)) and (encontre = false) do begin
					read(archEmpleado, empAuxiliar);
					if (empAuxiliar.numero = numEmpleado) then begin
						encontre:= true;
						seek(archEmpleado, filePos(archEmpleado) - 1);
						write('Ingrese la edad nueva para el empleado #',numEmpleado,': ');
						readln(edadNueva);
						empAuxiliar.edad:= edadNueva;
						write(archEmpleado,empAuxiliar);
					end;
				end;
				close(archEmpleado);
			end;
			6:
			begin
				exportarDatos(archEmpleado,archTexto);
			end;
			7:
			begin
				exportarDatosDNI(archEmpleado,archDNI);
			end;
		end;
		writeln('Ingrese el numero segun lo que quiera hacer: ');
		readln(seleccion);
	until (seleccion = 0);
END.
