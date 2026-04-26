program pr2ej8;
const
	valorAlto = 9999;
	df = 16;
type
	str = string[20];
	provinciaMaestro = record
		cod: integer;
		nombre: str;
		habitantes: integer;
		kilos: real;
	end;
	provinciaDetalle = record
		cod: integer;
		kilos: real;
	end;
	maestro = file of provinciaMaestro;
	detalle = file of provinciaDetalle;
	arrayDetalle = array[1..df] of detalle;
	regDetalle = array[1..df] of provinciaDetalle;

VAR
	mae1: maestro;
	regm: provinciaMaestro;
	det: arrayDetalle;
	regd: regDetalle;
	min: provinciaDetalle;
	i: integer;

procedure leer(var det: detalle; var dato: provinciaDetalle);
	begin
		if (not eof(det)) then
			read(det,dato)
		else
			dato.cod:= valorAlto;
	end;
procedure minimo(var det: arrayDetalle; var regd: regDetalle; var min: provinciaDetalle);
var
	i, posMin: integer;
begin
	posMin := -1;
	min.cod := valorAlto;
	for i := 1 to df do begin
		if (regd[i].cod < min.cod) then begin
			min := regd[i];
			posMin := i;
		end;
	end;
  if (posMin <> -1) then
    leer(det[posMin], regd[posMin]);
end;

BEGIN
	assign(mae1,'maestro.dat');
	assign(det[1], 'detalle1.dat');
	assign(det[2], 'detalle2.dat');
	assign(det[3], 'detalle3.dat');
	assign(det[4], 'detalle4.dat');
	assign(det[5], 'detalle5.dat');
	assign(det[6], 'detalle6.dat');
	assign(det[7], 'detalle7.dat');
	assign(det[8], 'detalle8.dat');
	assign(det[9], 'detalle9.dat');
	assign(det[10], 'detalle10.dat');
	assign(det[11], 'detalle11.dat');
	assign(det[12], 'detalle12.dat');
	assign(det[13], 'detalle13.dat');
	assign(det[14], 'detalle14.dat');
	assign(det[15], 'detalle15.dat');
	assign(det[16], 'detalle16.dat');
	reset(mae1);
	for i:= 1 to df do begin
		reset(det[i]);
		leer(det[i], regd[i]);
	end;
	minimo(det,regd,min);
	while (min.cod <> valorAlto) do begin
		read(mae1,regm);
		while (regm.cod <> min.cod) do begin
			if (regm.kilos > 10000) then
				writeln('Nombre de la provincia: ',regm.nombre,
				' | Consumo historico en kilos: ',regm.kilos,
				' | Consumo promedio: ',regm.kilos/regm.habitantes);
			read(mae1,regm);
		end;
		while (regm.cod = min.cod) do begin
			regm.kilos:= regm.kilos + min.kilos;
			minimo(det,regd,min);
		end;
		if (regm.kilos > 10000) then
			writeln('Nombre de la provincia: ',regm.nombre,
				' | Consumo historico en kilos: ',regm.kilos,
				' | Consumo promedio: ',regm.kilos/regm.habitantes);
		seek(mae1,filePos(mae1)-1);
		write(mae1,regm);
	end;
	while not eof(mae1) do begin
		if (regm.kilos > 10000) then
			writeln('Provincia: ',regm.nombre,
					' | Kilos: ',regm.kilos:0:2,
					' | Promedio: ',(regm.kilos/regm.habitantes):0:2);
		read(mae1,regm);
	end;
	close(mae1);
	for i:= 1 to df do
		close(det[i]);
END.

