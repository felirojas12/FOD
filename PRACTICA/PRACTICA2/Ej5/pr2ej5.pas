{5. Suponga que trabaja en una oficina donde se encuentra instalada una 
red local (LAN). La misma está conformada por 2 máquinas conectadas 
entre sí y a un servidor central. Semanalmente, cada máquina genera un 
archivo detalle de logs que registra las sesiones abiertas por los 
usuarios en cada terminal, junto con su duración. Cada archivo contiene 
los siguientes campos: código de usuario, fecha y tiempo de sesión. Se 
solicita desarrollar un procedimiento que reciba los archivos detalle y 
genere un archivo maestro con la siguiente información: código de 
usuario, fecha y tiempo total de sesiones abiertas. Notas:
● Cada archivo detalle está ordenado por código de usuario y fecha.
● Un usuario puede iniciar más de una sesión el mismo día, ya sea en la 
misma máquina o en diferentes máquinas. 
● El archivo maestro debe 
crearse en la siguiente ubicación física: /var/log.}


program pr2ej3;
const 
	valorAlto = 9999;
type
	servidor = record
		cod: integer;
		fecha: integer;
		tiempo: integer;
	end;
	maquina = record
		cod: integer;
		fecha: integer;
		tiempo: integer;
	end;
	maestro = file of servidor;
	detalle = file of maquina;

VAR
	regm: servidor;
	min, regd1, regd2: maquina;
	mae1: maestro;
	det1,det2: detalle;
	codActual, fecActual, tiempoTotal: integer;
	
procedure leer(var det: detalle; var dato: maquina);
	begin
		if (not eof(det)) then
			read(det,dato)
		else
			dato.cod:= valorAlto;
	end;
	
procedure minimo(var r1, r2, min: maquina);
	begin
		if ((r1.cod < r2.cod) or 
			 (r1.cod = r2.cod) and (r1.fecha <= r2.fecha) ) then begin
			min:= r1;
			leer(det1,r1);
		end
		else begin
			min:= r2;
			leer(det2,r2);
		end;
	end;
	
BEGIN
	assign(mae1,'maestro.dat');
	assign(det1,'detalle1'); assign (det2,'detalle2');
	rewrite(mae1); reset(det1); reset(det2);
	leer(det1,regd1); leer(det2,regd2);
	minimo(regd1,regd2,min);
	while (min.cod <> valorAlto) do begin
		codActual:= min.cod;
		while (min.cod <> valorAlto) and (codActual = min.cod) do begin
			tiempoTotal:= 0;
			fecActual:= min.fecha;
			while (min.cod <> valorAlto) and (fecActual = min.fecha) do begin
				tiempoTotal:= tiempoTotal + min.tiempo;
				minimo(regd1,regd2,min);
			end;
			regm.cod:= codActual;
			regm.fecha:= fecActual;
			write(mae1,regm);
		end;
	end;
	close(mae1); close(det1); close(det2);
END.


