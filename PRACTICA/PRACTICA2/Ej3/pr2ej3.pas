{A partir de información sobre la alfabetización en la Argentina, se 
desea actualizar un archivo maestro que contiene los siguientes datos: 
nombre de la provincia, cantidad de personas alfabetizadas y total de 
encuestados. Para ello, se dispone de dos archivos detalle, 
provenientes de distintas agencias de censo. Cada uno de estos archivos 
contiene: nombre de la provincia, código de localidad, cantidad de 
personas alfabetizadas y cantidad de encuestados. Se solicita 
desarrollar los módulos necesarios para actualizar el archivo maestro a 
partir de la información contenida en ambos archivos detalle. Nota: 
Todos los archivos están ordenados por nombre de provincia. En los 
archivos detalle pueden existir cero, uno o más registros por cada 
provincia.}


program pr2ej3;
const 
	valorAlto = 'ZZZZ';
type
	str = string[20];
	provincias = record
		provincia: str;
		cantPersonas: integer;
		encuestados: integer;
	end;
	agencias = record
		provincia: str;
		localidad: integer;
		cantPersonas: integer;
		encuestados: integer;
	end;
	maestro = file of provincias;
	detalle = file of agencias;

VAR
	regm: provincias ;
	min, regd1, regd2: agencias;
	mae1: maestro;
	det1,det2: detalle;
	
procedure leer(var det: detalle; var dato: agencias);
	begin
		if (not eof(det)) then
			read(det,dato)
		else
			dato.provincia:= valorAlto;
	end;
procedure minimo(var r1, r2, min: agencias);
	begin
		if (r1.provincia <= r2.provincia) then begin
			min:= r1;
			leer(det1,r1);
		end else begin
			min:= r2;
			leer(det2,r2);
		end;
	end;
procedure imprimirMaestro(var mae: maestro);
var
    reg: provincias;
begin
    reset(mae);
    writeln('--- CONTENIDO DEL ARCHIVO MAESTRO ---');
    writeln('Provincia | Alfabetizados | Encuestados');
    writeln('--------------------------------------');
    while (not eof(mae)) do begin
        read(mae, reg);
        writeln(reg.provincia, ' | ', reg.cantPersonas, ' | ', reg.encuestados);
    end;
    close(mae);
end;
	
BEGIN
	assign(mae1,'maestro.dat');
	assign(det1,'detalle1.dat'); assign(det2,'detalle2.dat');
	reset(mae1); reset(det1); reset(det2);
	leer(det1,regd1); leer(det2,regd2);
	minimo(regd1,regd2,min);
	while (min.provincia <> valorAlto) do begin
		read(mae1,regm);
		while (regm.provincia <> min.provincia) do
			read(mae1,regm);
		while (regm.provincia = min.provincia) do begin
			regm.cantPersonas:= regm.cantPersonas + min.cantPersonas;
			regm.encuestados:= regm.encuestados + min.encuestados;
			minimo(regd1,regd2,min);
		end;
		seek(mae1, filePos(mae1)-1);
		write(mae1,regm);
	end;
	close(mae1); close(det1); close(det2);
	imprimirMaestro(mae1);
END.

