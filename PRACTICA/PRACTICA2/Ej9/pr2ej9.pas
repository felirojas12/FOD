{Se cuenta con un archivo que posee información de las ventas que 
realiza una empresa a los diferentes clientes. Se necesita obtener un 
reporte con las ventas organizadas por cliente. Para ello, se deberá 
informar por pantalla: los datos personales del cliente, el total 
mensual (mes por mes cuánto compró) y finalmente el monto total 
comprado en el año por el cliente.
Además, al finalizar el reporte, se 
debe informar el monto total de ventas obtenido por la empresa. El 
formato del archivo maestro está dado por: cliente (cod cliente, nombre 
y apellido), año, mes, día y monto de la venta. El orden del archivo 
está dado por: cod cliente, año y mes.
Nota: tenga en cuenta que puede 
haber meses en los que los clientes no realizaron compras. No es 
necesario que informe tales meses en el reporte.}


program pr2ej9;
const 
	valorAlto = 9999;
type
	str = string[20];
	cliente = record
		cod: integer;
		apellido: str;
		nombre: str;
	end;
	empresa = record
		cli: cliente;
		anio: integer;
		mes: integer;
		dia: integer;
		monto: real;
	end;
	maestro = file of empresa;

VAR
	mae1: maestro;
	regm: empresa;
	codActual, mesActual, anioActual: integer;
	montoMensual, montoAnual, totalEmpresa: real;

procedure leer(var mae: maestro; var regm: empresa);
	begin
		if (not eof(mae)) then
			read(mae,regm)
		else
			regm.cli.cod:= valorAlto;
	end;

BEGIN
	assign(mae1, 'maestro.dat');
	reset(mae1);
	leer(mae1,regm);
	totalEmpresa:= 0;
	while (regm.cli.cod <> valorAlto) do begin
		codActual:= regm.cli.cod;
		writeln('Cliente: ');
		writeln('Codigo: ',regm.cli.cod,
		' | Apellido y nombre: ',regm.cli.apellido,' ',regm.cli.nombre);
		while (codActual = regm.cli.cod) do begin
			montoAnual:= 0;
			anioActual:= regm.anio;
			while (codActual = regm.cli.cod) and (anioActual = regm.anio) do begin
				montoMensual:= 0;
				mesActual:= regm.mes;
				while (codActual = regm.cli.cod) and
				(anioActual = regm.anio) and (mesActual = regm.mes) do begin
					montoMensual:= montoMensual + regm.monto;
					leer(mae1,regm);
				end;
				writeln('Monto total del mes ',mesActual,': ',montoMensual);
				montoAnual:= montoAnual + montoMensual;
			end;
			writeln('Monto total del anio ',anioActual,': ',montoAnual);
			totalEmpresa:= totalEmpresa + montoAnual;
		end;
	end;
	close(mae1);
END.

