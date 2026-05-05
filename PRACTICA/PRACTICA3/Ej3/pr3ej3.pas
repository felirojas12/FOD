program libreria;

const valorAlto = 9999;

type
    str20 = string[20];

    libro = record
        codigo: integer;
        genero: str20;
        titulo: str20;
        autor: str20;
        paginas: integer;
        precio: real;
    end;

    archivo = file of libro;

procedure leerLibro(var l: libro);
	begin
		writeln('--- NUEVO LIBRO ---');
		write('Codigo (0 corta): '); readln(l.codigo);
		if (l.codigo <> 0) then begin
			write('Genero: '); readln(l.genero);
			write('Titulo: '); readln(l.titulo);
			write('Autor: '); readln(l.autor);
			write('Paginas: '); readln(l.paginas);
			write('Precio: '); readln(l.precio);
		end;
	end;

procedure crearArchivo(var arch: archivo);
	var
		l: libro;
	begin
		rewrite(arch);

		// cabecera
		l.codigo := 0;
		write(arch, l);

		leerLibro(l);
		while (l.codigo <> 0) do begin
			write(arch, l);
			leerLibro(l);
		end;

		close(arch);
	end;

procedure alta(var arch: archivo; l: libro);
	var
		cabecera, libre: libro;
		pos: integer;
	begin
		reset(arch);

		read(arch, cabecera);

		if (cabecera.codigo < 0) then begin
			// hay espacio libre
			pos := -1 * cabecera.codigo;

			seek(arch, pos);
			read(arch, libre);

			// actualizar cabecera
			seek(arch, 0);
			write(arch, libre);

			// escribir nuevo libro
			seek(arch, pos);
			write(arch, l);
		end
		else begin
			// no hay espacio libre → agregar al final
			seek(arch, filesize(arch));
			write(arch, l);
		end;

		close(arch);
	end;

procedure baja(var arch: archivo; cod: integer);
	var
		cabecera, l: libro;
		pos: integer;
		encontrado: boolean;
	begin
		reset(arch);

		read(arch, cabecera);

		encontrado := false;
		while (not eof(arch)) and (not encontrado) do begin
			pos := filepos(arch);
			read(arch, l);
			// leo hasta encontrar el codigo y actualizo la pos
			if (l.codigo = cod) then begin
				encontrado := true;

				// enlazar con lista invertida, pongo en el codigo
				// el lugar que estaba en la cabecera
				l.codigo := cabecera.codigo;

				// escribo el libro con el codigo del lugar libre actualizado
				seek(arch, pos);
				write(arch, l);

				// actualizo la cabecera con el valor negativo del lugar
				// que acabo de desocupar
				cabecera.codigo := -pos;
				seek(arch, 0);
				write(arch, cabecera);
			end;
		end;

		close(arch);
	end;

procedure modificar(var arch: archivo; cod: integer);
	var
		l: libro;
		pos: integer;
		encontrado: boolean;
	begin
		reset(arch);

		encontrado := false;
		while (not eof(arch)) and (not encontrado) do begin
			pos := filepos(arch);
			read(arch, l);

			if (l.codigo = cod) then begin
				encontrado := true;

				writeln('Modificar datos:');
				write('Genero: '); readln(l.genero);
				write('Titulo: '); readln(l.titulo);
				write('Autor: '); readln(l.autor);
				write('Paginas: '); readln(l.paginas);
				write('Precio: '); readln(l.precio);

				seek(arch, pos);
				write(arch, l);
			end;
		end;

		close(arch);
	end;

procedure exportar(var arch: archivo);
	var
		l: libro;
		txt: text;
	begin
		reset(arch);
		assign(txt, 'libros.txt');
		rewrite(txt);

		// saltar cabecera
		read(arch, l);

		while not eof(arch) do begin
			read(arch, l);
			if (l.codigo > 0) then begin
				writeln(txt, l.codigo, ' ', l.genero, ' ', l.titulo, ' ',
							l.autor, ' ', l.paginas, ' ', l.precio:0:2);
			end;
		end;

		close(arch);
		close(txt);
	end;

var
    arch: archivo;
    nombre: string;
    opcion: integer;
    l: libro;
    cod: integer;

begin
    write('Nombre del archivo: ');
    readln(nombre);
    assign(arch, nombre);

    repeat
        writeln('--- MENU ---');
        writeln('1. Crear archivo');
        writeln('2. Alta');
        writeln('3. Modificar');
        writeln('4. Baja');
        writeln('5. Exportar');
        writeln('0. Salir');
        readln(opcion);

        case opcion of
            1: crearArchivo(arch);
            2: begin
                    leerLibro(l);
                    if (l.codigo <> 0) then
                        alta(arch, l);
               end;
            3: begin
                    write('Codigo: '); readln(cod);
                    modificar(arch, cod);
               end;
            4: begin
                    write('Codigo: '); readln(cod);
                    baja(arch, cod);
               end;
            5: exportar(arch);
        end;
    until opcion = 0;
end.
