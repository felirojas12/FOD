{Se necesita contabilizar los votos de las diferentes mesas electorales 
registradas por provincia y localidad. Para ello, se posee un archivo 
con la siguiente información: código de provincia, código de localidad, 
número de mesa y cantidad de votos en dicha mesa. Presentar en pantalla 
un listado como se muestra a continuación:}


program pr2ej10;
const valorAlto = 9999;
type
	elecciones = record
		codProvincia: integer;
		codLocalidad: integer;
		nroMesa: integer;
		votos: integer;
	end;
	maestro = file of elecciones;

VAR
	mae: maestro;
	regm: elecciones;
	provinciaActual, localidadActual, totalProvincia, totalLocalidad: integer;

procedure leer(var mae: maestro; var regm: elecciones);
	begin
		if (not eof(mae)) then
			read(mae,regm)
		else
			regm.codProvincia:= valorAlto;
	end;
BEGIN
	assign(mae,'maestro.dat');
	reset(mae);
	leer(mae,regm);
	while (regm.codProvincia <> valorAlto) do begin
		provinciaActual:= regm.codProvincia;
		writeln('Codigo de provincia: ',provinciaActual);
		totalProvincia:= 0;
		writeln('Codigo de localidad          Cantidad de votos');
		while (provinciaActual = regm.codProvincia) do begin
			localidadActual:= regm.codLocalidad;
			totalLocalidad:= 0;
			while (provinciaActual = regm.codProvincia) and
			(localidadActual = regm.codLocalidad) do begin
				totalLocalidad:= totalLocalidad + regm.votos;
				leer(mae,regm);
			end;
			writeln(localidadActual:10,totalLocalidad:10);
			totalProvincia:= totalProvincia + totalLocalidad;
		end;
		writeln('Total de votos en provincia: ',totalProvincia);
	end;
	close(mae);
END.

