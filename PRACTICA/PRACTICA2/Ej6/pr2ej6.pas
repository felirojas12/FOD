{Se desea modelar la información necesaria para un sistema de recuento 
de casos de COVID del Ministerio de Salud de la Provincia de Buenos 
Aires. Diariamente se reciben 10 archivos detalle provenientes de 
distintos municipios. La información contenida en cada uno de ellos es 
la siguiente: código de localidad, código de cepa, cantidad de casos 
activos, cantidad de casos nuevos, cantidad de casos recuperados y 
cantidad de casos fallecidos. El ministerio cuenta con un archivo 
maestro que almacena la siguiente información: código de localidad, 
nombre de la localidad, código de cepa, nombre de la cepa, cantidad de 
casos activos, cantidad de casos nuevos, cantidad de casos recuperados 
y cantidad de casos fallecidos.
Todos los archivos están ordenados por código de localidad y código de cepa.
Se solicita desarrollar el procedimiento que
permita actualizar el archivo maestro a partir de los 
10 archivos detalle, teniendo en cuenta el siguiente criterio:
● A la cantidad de casos fallecidos del maestro se le debe sumar el valor 
recibido en el detalle.
● A la cantidad de casos recuperados del maestro se le
debe sumar el valor recibido en el detalle.
● La cantidad de casos activos del maestro debe actualizarse
con el valor recibido en el detalle.
● La cantidad de casos nuevos del maestro debe actualizarse 
con el valor recibido en el detalle. 
Realizar las declaraciones necesarias, el programa principal y
los procedimientos que se requieran para efectuar la actualización solicitada.}


program pr2ej6;
const
	valorAlto = 9999;
type
	reporte = record
		codLocalidad: integer;
		codCepa: integer;
		casosActivos: integer;
		casosNuevos: integer;
		casosRecuperados: integer;
		casosFallecidos: integer;
	end;
	
	arch = file of reporte;

VAR
	mae1, det1, det2, det3: arch;
	regm,regd1,regd2,regd3,min: reporte;
	
procedure leer(var det: arch; var dato: reporte);
	begin
		if (not eof(arch)) then
			read(arch,dato)
		else
			dato.codLocalidad:= valorAlto;
	end;

procedure minimo(var r1, r2, r3, min: reporte);
	begin
		min:= r1;
		
		if ((r2.codLocalidad < min.codLocalidad) or 
		(r2.codLocalidad = min.codLocalidad) and (r2.codCepa<min.codCepa)) then
			min:= r2;
		if ((r3.codLocalidad < min.codLocalidad) or 
		(r3.codLocalidad = min.codLocalidad) and (r3.codCepa<min.codCepa)) then
			min:= r3;
			
		if (min.codLocalidad = r1.codLocalidad) and (min.codCepa = r1.codCepa) then
			leer(det1,r1)
		else if (min.codLocalidad = r2.codLocalidad) and (min.codCepa = r2.codCepa) then
			leer(det2,r2)
		else
			leer(det3,r3);
	end;

BEGIN
	assign(mae1,'maestro.dat');
	assign(det1,'detalle1.dat'); assign(det2,'detalle2.dat'); assign(det3,'detalle3.dat');
	reset(mae1); reset(det1); reset(det2); reset(det3);
	leer(det1,regd1); leer(det2,regd2); leer(det3,regd3);
	minimo(regd1,regd2,regd3,min);
	while (min.codLocalidad <> valorAlto) do begin
		read(mae1,regm);
		while (regm.codLocalidad <> min.codLocalidad) or (regm.codCepa <> min.codCepa) do
			read(mae1,regm);
		while (regm.codLocalidad = min.codLocalidad) and (regm.codCepa = min.codCepa) do begin
			regm.casosFallecidos:= regm.casosFallecidos + min.casosFallecidos;
			regm.casosRecuperados:= regm.casosRecuperados + min.casosRecuperados;
			regm.casosActivos:= min.casosActivos;
			regm.casosNuevos:= min.casosNuevos;
			minimo(regd1,regd2,regd3,min);
		end;
		seek(mae1,filePos(mae1)-1);
		write(mae1,regm);
	end;
	close(mae1); close(det1); close(det2); close(det3);
END.

