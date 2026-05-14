{Se cuenta con un archivo que almacena información sobre especies de 
aves en peligro de extinción. De cada especie se registran los 
siguientes datos: código, nombre de la especie, familia, descripción y 
zona geográfica. El archivo no se encuentra ordenado por ningún 
criterio.
Se desea desarrollar un programa que permita eliminar especies de aves 
extintas. Para ello, el programa deberá contar con dos procedimientos: 
Un procedimiento que, dado el código de una especie, la marque como 
borrada (baja lógica). En caso de querer eliminar múltiples especies, 
este procedimiento podrá invocarse repetidamente.
Un procedimiento que realice la compactación del archivo (baja física), 
eliminando definitivamente aquellas especies marcadas como borradas. 
Para ello, cada vez que se elimine un registro, se deberá reemplazar su 
posición con el último registro del archivo y luego eliminar dicho 
último registro, evitando así dejar espacios vacíos y registros 
duplicados.}

program pajaros;
type
	str = string[20];
	reg_pajaro = record
		cod: integer;
		nombre: str;
		familia: str;
		descripcion: str;
		zona: str;
	end;
	
	tArchPajaros = file of reg_pajaro;
	
procedure leerPajaro(var pajaro: reg_pajaro);
	begin
		writeln();
		writeln('||| PAJARO NUEVO |||');
		write('Ingrese el codigo del pajaro (0 para terminar): ');
		readln(pajaro.cod);
		if pajaro.cod <> 0 then begin
			write('Ingrese el nombre del pajaro: ');
			readln(pajaro.nombre);
			write('Ingrese la familia del pajaro: ');
			readln(pajaro.familia);
			write('Ingrese la descripcion del pajaro: ');
			readln(pajaro.descripcion);
			write('Ingrese la zona geografica del pajaro: ');
			readln(pajaro.zona);
		end;
	end;

procedure imprimirArchivo(var arch: tArchPajaros);
var
    pajaro: reg_pajaro;
begin
    assign(arch,'maestro.dat');
    reset(arch);
    while (not eof(arch)) do begin
        read(arch, pajaro);
		writeln();
        writeln('--------------------------');
        writeln('Codigo: ', pajaro.cod);
        writeln('Nombre: ', pajaro.nombre);
        writeln('Familia: ', pajaro.familia);
        writeln('Descripcion: ', pajaro.descripcion);
        writeln('Zona: ', pajaro.zona);
        writeln('--------------------------');
        writeln();
    end;

    close(arch);
end;

procedure cargarMaestro(var arch: tArchPajaros);
	var
		pajaro: reg_pajaro;
	begin
		assign(arch,'maestro.dat');
		rewrite(arch);
		leerPajaro(pajaro);
		while (pajaro.cod <> 0) do begin
			write(arch,pajaro);
			leerPajaro(pajaro);
		end;
		close(arch);
	end;

procedure darBajaLogica(var arch: tArchPajaros; cod: integer);
	var
		pajaro: reg_pajaro;
	begin
		assign(arch,'maestro.dat');
		reset(arch);
		while (not eof(arch)) do begin
			read(arch,pajaro);
			if (pajaro.cod = cod) then begin
				pajaro.cod:= -1;
				seek(arch,filePos(arch)-1);
				write(arch,pajaro);
			end;
		end;
		close(arch);
	end;

procedure darBajaFisica(var arch: tArchPajaros);
var
    eliminado, ultimaPosicion: reg_pajaro;
    pos: integer;
begin
    assign(arch,'maestro.dat');
    reset(arch);
    while (not eof(arch)) do begin
        pos := filePos(arch);
        read(arch, eliminado);
        if (eliminado.cod = -1) then begin
            seek(arch, fileSize(arch)-1);
            read(arch, ultimaPosicion);
            seek(arch, pos);
            write(arch, ultimaPosicion);
            seek(arch, fileSize(arch)-1);
            truncate(arch);
            seek(arch, pos);
        end;
    end;
    close(arch);
end;

procedure darBajaFisicaAlterna(var arch: tArchPajaros);
	var
		eliminado, ultimaPosicion: reg_pajaro;
		pos, dimL: integer;
	begin
		assign(arch,'maestro.dat');
		reset(arch);
		dimL:= fileSize(arch);
		while (filePos(arch) < dimL) do begin
			pos:= filePos(arch);
			read(arch,eliminado);
			if (eliminado.cod = -1) then begin
				seek(arch,dimL - 1);
				read(arch,ultimaPosicion);
				seek(arch,pos);
				write(arch,ultimaPosicion);
				seek(arch,pos+1);
				dimL:= dimL - 1;
			end;
		end;
		seek(arch,dimL);
		truncate(arch);
		close(arch);
	end;

VAR
	archivoPajaros: tArchPajaros;
BEGIN
	cargarMaestro(archivoPajaros);
	writeln('Impresion 1');
	imprimirArchivo(archivoPajaros);
	darBajaLogica(archivoPajaros, 23);
	writeln('Impresion 2');
	imprimirArchivo(archivoPajaros);
	writeln('Impresion 3');
	darBajaFisicaAlterna(archivoPajaros);
	imprimirArchivo(archivoPajaros);
END.

