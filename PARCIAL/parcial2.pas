program parcial2;
const valorAlto = 9999;
type
	str = string[20];
	prestamo = record
		numSucursal: integer;
		dni: integer;
		numPrestamo: integer;
		fecha: integer;
		monto: real;
	end;
	
	tArch = file of prestamo;

procedure leer (var arch: tArch; var reg: prestamo);
	begin
		if not(eof(arch)) then
			read(arch,reg)
		else
			reg.numSucursal:= valorAlto;
	end;

procedure generarInforme(var arch: tArch);
	var
		pres: prestamo;
		informe: text;
		ventasEmpresa, ventasSucursal, ventasEmpleado, ventasAnio,
		sucursalActual, dniActual, anioActual: integer;
		montoEmpresa, montoSucursal, montoEmpleado, montoAnio: real;
	begin
		assign(informe, 'informe.txt');
		reset(arch); rewrite(informe);
		montoEmpresa:= 0; ventasEmpresa:= 0;
		leer(arch, pres);
		writeln(informe, 'Informe de ventas de la empresa');
		while (pres.numSucursal <> valorAlto) do begin
			sucursalActual:= pres.numSucursal;
			montoSucursal:= 0;
			ventasSucursal:= 0;
			writeln(informe, 'Sucursal ',sucursalActual);
			while (sucursalActual = pres.numSucursal) do begin
				dniActual:= pres.dni;
				montoEmpleado:= 0;
				ventasEmpleado:= 0;
				writeln(informe, 'Empleado: DNI ',dniActual);
				writeln(informe, 'Anio || Cantidad de ventas || Monto de ventas');
				while (sucursalActual = pres.numSucursal) and
					  (dniActual = pres.dni) do begin
					anioActual:= extraerAnio(pres.fecha);
					ventasAnio:= 0;
					montoAnio:= 0;
					while (sucursalActual = pres.numSucursal) and
						  (dniActual = pres.dni) and
						  (anioActual = extraerAnio(pres.fecha) do begin
						ventasAnio:= ventasAnio + 1;
						montoAnio:= montoAnio + pres.monto;
						leer(arch, pres);
					end;
					writeln(informe, anioActual, ventasAnio, montoAnio);
					ventasEmpleado:= ventasEmpleado + ventasAnio;
					montoEmpleado:= montoEmpleado + montoAnio;
				end;
				writeln(informe, 'Totales: ', ventasEmpleado, montoEmpleado);
				ventasSucursal:= ventasSucursal + ventasEmpleado;
				montoSucursal:= montoSucursal + montoEmpleado;
			end;
			writeln(informe, 'Cantidad total de ventas sucursal: ', ventasSucursal);
			writeln(informe, 'Monto total vendido por sucursla: ',montoSucursal);
			ventasEmpresa:= ventasEmpresa + ventasSucursal;
			montoEmpresa:= montoEmpresa + montoSucursal;
		end;
		writeln(informe,'Cantidad de ventas de la empresa: ', ventasEmpresa);
		writeln(informe,'Monto total vendido por la empresa: ', montoEmpresa);
		close(arch); close(informe);
	end;
