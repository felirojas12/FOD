program parcial3;
const 
	valorAlto = 9999;
	df = 30;
type
	str = string[20];
	municipio = record
		codMunicipio: integer;
		nomMunicipio: str;
		cantCasos: integer;
	end;
	
	tArch = file of municipio;
	
	vDetalle = array [1..df] of tArch;
	vRegistro = array [1..df] of municipio;
	
procedure leer(var arch: tArch; var reg: municipio);
	begin
		if not(eof(arch)) then
			read(arch, reg)
		else
			reg.codMunicipio:= valorAlto;
	end;

procedure minimo(var vectorDetalle: vDetalle; var vectorRegistro: vRegistro; var min: municipio);
	var
		posMin, i: integer;
	begin
		posMin:= -1;
		min.codMunicipio:= valorAlto;
		for i:= 1 to df do begin
			if (vectorRegistro[i].codMunicipio < min.codMunicipio) then begin
				min:= vectorRegistro[i];
				posMin:= i;
			end;
		end;
		if (posMin <> -1) then
			leer(vectorDetalle[posMin],vectorRegistro[i]);
	end;

procedure actualizarMaestro(var maestro: tArch; var vectorDetalle: vDetalle; var vectorRegistro: vRegistro);
	var
		i, cantCasos, codActual: integer;
		min, regM: municipio;
		nombre: str;
	begin
		assign(maestro, 'maestro.dat');
		reset(maestro);
		for i:= 1 to df do begin
			write('Ingrese el nombre para el archivo ',i,': ');
			readln(nombre);
			assign(vectorDetalle[i], nombre);
			reset(vectorDetalle[i]);
			leer(vectorDetalle[i], vectorRegistro[i]);
		end;
		minimo(vectorDetalle, vectorRegistro, min);
		while (min.codMunicipio <> valorAlto) do begin
			read(maestro,regM);
			while (regM.codMunicipio <> min.codMunicipio) do begin
				if (regM.cantCasos > 15) then
					writeln('El municipio de ',regM.nomMunicipio,' (COD: ',regM.codMunicipio,
					') registro mas de 15 casos positivos.');
				read(maestro, regM);
			end;
			codActual:= min.codMunicipio;
			cantCasos:= 0;
			while (min.codMunicipio = codActual) do begin
				cantCasos:= cantCasos + min.cantCasos;
				minimo(vectorDetalle, vectorRegistro, min);
			end;
			regM.cantCasos:= regM.cantCasos + cantCasos;
			if (regM.cantCasos > 15) then
					writeln('El municipio de ',regM.nomMunicipio,' (COD: ',regM.codMunicipio,
					') registro mas de 15 casos positivos.');
			seek(maestro,filePos(maestro) - 1);
			write(maestro, regM);
		end;
		while not eof(maestro) do begin
			read(maestro, regM);
			if (regM.cantCasos > 15) then
					writeln('El municipio de ',regM.nomMunicipio,' (COD: ',regM.codMunicipio,
					') registro mas de 15 casos positivos.');
		end;
		close(maestro);
		for i:= 1 to df do
			close(vectorDetalle[i]);
	end;

var
	maestro: tArch;
	vectorDetalle: vDetalle;
	vectorRegistro: vRegistro;
begin
	actualizarMaestro(maestro,vectorDetalle, vectorRegistro);
end.
