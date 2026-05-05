program flores;
type
	reg_flor = record
		nombre: String;
		codigo: integer;
	end;
	tArchFlores = file of reg_flor;

procedure leerFlor(var flor: reg_flor);
	begin
		writeln();
		writeln(' ||| FLOR NUEVA ||| ');
		write('Ingrese el codigo de la flor (0 para terminar): ');
		readln(flor.codigo);
		if (flor.codigo <> 0) then begin
			write('Ingrese el nombre de la flor: ');
			readln(flor.nombre);
		end;
	end;

procedure imprimirFlor(flor: reg_flor);
	begin
		writeln();
		writeln(' ||| FLOR #',flor.codigo,' ||| ');
		writeln('Nombre: ',flor.nombre);
	end;

procedure crearArchivo(var arch: tArchFlores);
	var
		flor: reg_flor;
		nombre: string;
	begin
		writeln('Ingrese el nombre para el archivo: ');
		readln(nombre);
		assign(arch,nombre);
		rewrite(arch);
		flor.codigo:= 0;
		write(arch,flor);
		leerFlor(flor);
		while (flor.codigo <> 0) do begin
			write(arch,flor);
			leerFlor(flor);
		end;
		close(arch);
	end;

procedure agregarFlor(var arch: tArchFlores; nombre: string; codigo: integer);
	var
		cabecera, libre, flor: reg_flor;
		pos: integer;
	begin
		flor.nombre:= nombre;
		flor.codigo:= codigo;
		reset(arch);
		read(arch, cabecera);
		if (cabecera.codigo < 0) then begin
			pos:= -1 * cabecera.codigo;
			seek(arch,pos);
			read(arch,libre);
			seek(arch,0);
			write(arch,libre);
			seek(arch,pos);
			write(arch,flor);
		end
		else begin
			seek(arch,fileSize(arch));
			write(arch, flor);
		end;
		close(arch);
	end;

procedure eliminarFlor(var arch: tArchFlores; flor: reg_flor);
	var
		cabecera,florActual: reg_flor;
		pos, codigo: integer;
		encontre: boolean;
	begin
		codigo:= flor.codigo;
		reset(arch);
		read(arch,cabecera);
		encontre:= false;
		while (not eof(arch)) and (not encontre) do begin
			pos:= filePos(arch);
			read(arch, florActual);
			if (florActual.codigo = codigo) then begin
				encontre:= true;
				
				florActual.codigo:= cabecera.codigo;
				seek(arch,pos);
				write(arch,florActual);
				
				cabecera.codigo:= pos * -1; //se debe almacenar la pos en negativo
				seek(arch,0);
				write(arch, cabecera);
			end;
		end;
		close(arch);
	end;

procedure listarFlores(var arch: tArchFlores);
	var
		flor: reg_flor;
	begin
		reset(arch);
		read(arch, flor);
		while (not eof(arch)) do begin
			read(arch, flor);
			if (flor.codigo > 0) then
				imprimirFlor(flor);
		end;
		close(arch);
	end;

VAR
	archivoFlores: tArchFlores;
	flor: reg_flor;
BEGIN
	crearArchivo(archivoFlores);
	agregarFlor(archivoFlores, 'Ceibo', 32);
	flor.nombre:= 'Eucalipto';
	flor.codigo:= 25;
	eliminarFlor(archivoFlores, flor);
	listarFlores(archivoFlores);
	agregarFlor(archivoFlores, 'Lavanda', 55);
	listarFlores(archivoFlores);
END.

