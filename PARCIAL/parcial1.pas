program parcial1;
const
	valorAlto = 9999;

type
	str = string[20];
	presentacion = record
		codArtista: integer;
		nombreArtista: str;
		anio: integer;
		codEvento: integer;
		nombreEvento: str;
		likes: integer;
		dislikes: integer;
		puntaje: real;
	end;
	
	tArch = file of presentacion;

procedure leer(var arch: tArch; var rArch: presentacion);
	begin
		if (not eof(arch)) then
			read(tArch, rArch)
		else
			rArch.anio:= valorAlto;
	end;

procedure informarArchivo(var arch: tArch);
	var
		pres, act: presentacion;
		anioActual, dislikesMax, presentacionesAnio, presentacionesTotal,anios: integer;
		puntajeMin: real;
		nombreArtista: str;
	begin
		assign(arch, 'archivoPresentaciones.dat');
		reset(arch);
		presentacionesTotal:= 0;
		anios:= 0;
		leer(arch, pres);
		while (pres.anio <> valorAlto) do begin
			act.anio:= pres.anio;
			writeln('Anio ',act.anio,':');
			anios:= anios + 1;
			presentacionesAnio:= 0;
			while(act.anio = pres.anio) do begin
				act.nombreEvento:= pres.nombreEvento;
				act.codEvento:= pres.codEvento;
				puntajeMin:= valorAlto;
				dislikesMax:= -1;
				writeln('Evento: ',act.nombreEvento,' (Codigo: ',act.codEvento,')');
				while (act.anio = pres.anio) and (act.codEvento = pres.codEvento) do begin
					act.nombreArtista:= pres.nombreArtista;
					act.codArtista:= pres.codArtista;
					act.likes:= 0;
					act.dislikes:= 0;
					act.puntaje:= 0;
					writeln('Artista: ',act.nombreArtista,' (Codigo: ',act.codArtista,')');
					while (act.anio = pres.anio) and 
						  (act.codEvento = pres.codEvento) and
						  (act.codArtista = pres.codArtista) do begin
						  act.likes:= act.likes + pres.likes;
						  act.dislikes:= act.dislikes + pres.dislikes;
						  act.puntaje:= act.puntaje + pres.puntaje;
						  presentacionesAnio:= presentacionesAnio + 1;
						  leer(arch, pres);
					end;
					if (act.puntaje <= puntajeMin) and (act.dislikes > maxDislikes) then begin
						maxDislikes:= act.dislikes;
						puntajeMin:= act.puntaje;
						nombreArtista:= act.nombreArtista;
					end;
				end;
				writeln('El artista ',nombreArtista,' fue el menos influyente del evento ',act.nombreEvento,
						' del anio ',act.anio,'.');
			end;
			writeln('En el anio ',act.anio,' hubo ',presentacionesAnio,' de artistas.');
			presentacionesTotal:= presentacionesTotal + presentacionesAnio;
		end;
		writeln;
		if (anios > 0) then
			writeln('Promedio de presentaciones por anio: '(presentacionesTotal/anios):0:2)
		else
			writeln('No se registraron presentaciones');
		close(arch);
	end;
		
