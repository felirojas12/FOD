program pr2ej7;
const
	valorAlto = 9999;
type
	str = string[20];
	alumnoMaestro = record
		cod: integer;
		apellido: str;
		nombre: str;
		cantCursadas: integer;
		cantFinales: integer;
	end;
	alumnoCursada = record
		cod: integer;
		codMateria: integer;
		anio: integer;
		resultado: boolean;
	end;
	alumnoFinal = record
		cod: integer;
		codMateria: integer;
		fecha: str;
		nota: real;
	end;
	
	maestro = file of alumnoMaestro;
	detalleCursada = file of alumnoCursada;
	detalleFinal = file of alumnoFinal;

VAR
	mae1: maestro;
	det1: detalleCursada;
	det2: detalleFinal;
	regm: alumnoMaestro;
	regd1, min1: alumnoCursada;
	regd2, min2: alumnoFinal;

procedure leer
BEGIN
	
	
END.

