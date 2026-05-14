{Se cuenta con un archivo con información de las diferentes 
distribuciones de linux existentes. De cada distribución se conoce: 
nombre, año de lanzamiento, número de versión del kernel, cantidad de 
desarrolladores y descripción. El nombre de las distribuciones no puede 
repetirse. Este archivo debe ser mantenido realizando bajas lógicas y 
utilizando la técnica de reutilización de espacio libre llamada lista 
invertida. Escriba la definición de las estructuras de datos necesarias 
y los siguientes procedimientos:}


program linux;
type
	str = string[20];
	reg_distribucion = record
		nombre: str;
		lanzamiento: integer;
		version: integer;
		cantDesarrolladores: integer;
		descripcion: str;
	end;
	
	tArchDistros = file of reg_distribucion;

procedure leerDistribucion(var dis: reg_distribucion);
	begin
		writeln();
		writeln('||| DISTRIBUCION DE LINUX NUEVA |||');
		write('Ingrese el nombre de la distribucion (ZZZ para terminar): ');
		readln(dis.nombre);
		if dis.nombre <> 'ZZZ' then begin
			write('Ingrese el anio de lanzamiento de la distribucion: ');
			readln(dis.lanzamiento);
			write('Ingrese la version del kernel de la distribucion: ');
			readln(dis.version);
			write('Ingrese la cantidad de desarrolladores de la distribucion: ');
			readln(dis.cantDesarrolladores);
			write('Ingrese la descripcion de la distribucion: ');
			readln(dis.descripcion);
		end;
	end;

procedure imprimirArchivo(var arch: tArchDistros);
	var
		dis: reg_distribucion;
	begin
		assign(arch,'maestro.dat');
		reset(arch);
		read(arch,dis);
		while (not eof(arch)) do begin
			read(arch, dis);
			writeln();
			writeln('--------------------------');
			writeln('Nombre de distribucion de Linux: ', dis.nombre);
			writeln('Anio de lanzamiento: ', dis.lanzamiento);
			writeln('Version del kernel: ', dis.version);
			writeln('Cantidad de desarrolladores: ', dis.cantDesarrolladores);
			writeln('Descripcion: ', dis.descripcion);
			writeln('--------------------------');
			writeln();
		end;
		close(arch);
	end;

procedure cargarArchivo(var arch: tArchDistros);
	var
		dis: reg_distribucion;
	begin
		assign(arch,'maestro.dat');
		rewrite(arch);
		dis.version:= 0;
		write(arch, dis);
		leerDistribucion(dis);
		while (dis.nombre <> 'ZZZ') do begin
			write(arch,dis);
			leerDistribucion(dis);
		end;
		close(arch);
	end;

function buscarDistribucion(var arch: tArchDistros; nombre: str): integer;
	var
		dis: reg_distribucion;
		pos: integer;
	begin
		assign(arch,'maestro.dat');
		reset(arch);
		pos:= -1;
		read(arch,dis); //para saltear la cabecera
		while (not eof(arch)) do begin
			read(arch,dis);
			if (dis.nombre = nombre) then
				pos:= filePos(arch) - 1;
		end;
		close(arch);
		buscarDistribucion:= pos;
	end;

procedure altaDistribucion(var arch: tArchDistros; dis: reg_distribucion);
	var
		cabecera, libre: reg_distribucion;
		pos: integer;
	begin
		if buscarDistribucion(arch,dis.nombre) = -1 then begin
			assign(arch,'maestro.dat');
			reset(arch);
			read(arch,cabecera);
			if (cabecera.version < 0) then begin
				pos:= -cabecera.version;
				seek(arch,pos);
				read(arch,libre);
				seek(arch,0);
				write(arch,libre);
				seek(arch,pos);
				write(arch,dis);
			end else begin
				seek(arch,fileSize(arch));
				write(arch,dis);
			end;
			close(arch);
		end else
			writeln('Ya existe la distribucion en el archivo.');
	end;

procedure bajaDistribucion(var arch: tArchDistros; dis: reg_distribucion);
	var
		disActual, cabecera: reg_distribucion;
		pos: integer;
	begin
		pos:= buscarDistribucion(arch,dis.nombre);
		if pos = -1 then
			writeln('No existe la distribucion en el archivo.')
		else begin
			assign(arch,'maestro.dat');
			reset(arch);
			read(arch,cabecera);
			seek(arch,pos);
			
			read(arch,disActual);
			disActual.version:= cabecera.version;
			seek(arch,pos);
			write(arch,disActual);
			
			seek(arch,0);
			cabecera.version:= pos * -1;
			write(arch,cabecera);
			
			close(arch);
		end;
	end;

VAR
	archivoDistribuciones: tArchDistros;
	dis1, dis2: reg_distribucion;
BEGIN
	cargarArchivo(archivoDistribuciones);
	imprimirArchivo(archivoDistribuciones);
	leerDistribucion(dis2);
	bajaDistribucion(archivoDistribuciones, dis2);
	imprimirArchivo(archivoDistribuciones);
	leerDistribucion(dis1);
	altaDistribucion(archivoDistribuciones, dis1);
	imprimirArchivo(archivoDistribuciones);
END.

