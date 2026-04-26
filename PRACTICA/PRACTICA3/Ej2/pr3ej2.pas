{Definir un programa que genere un archivo con registros de longitud 
fija con información de productos de un comercio. Los datos se ingresan 
por teclado y de cada producto se almacena: código de producto, nombre, 
descripción, precio y stock disponible. Implementar un procedimiento 
que, a partir del archivo de datos generado, realice la baja lógica de 
todos aquellos productos cuyo stock disponible sea igual a 0.
La baja lógica debe indicarse marcando el registro con un carácter especial que 
se sitúa como prefijo en algún campo de tipo string a su elección. Por 
ejemplo, se puede anteponer el carácter @ al nombre del producto: 
‘@Arroz Gallo 1K’.}


program pr3ej2;
type
	str = string[20];
	producto = record
		cod: integer;
		nombre: str;
		descripcion: str;
		precio: real;
		stock: integer;
	end;
	arch = file of producto;

procedure leerProducto(var pro: producto);
	begin
		writeln(' |||| PRODUCTO NUEVO |||| ');
		write('Ingrese el codigo del producto: ');
		readln(pro.cod);
		if (pro.cod <> 0) then begin
			write('Ingrese el nombre del producto: ');
			readln(pro.nombre);
			write('Ingrese la descripcion del producto: ');
			readln(pro.descripcion);
			write('Ingrese el precio del producto: ');
			readln(pro.precio);
			write('Ingrese el stock del producto: ');
			readln(pro.stock);
		end;
		writeln();
	end;

procedure imprimirProducto(pro: producto);
begin
    writeln(' |||| PRODUCTO |||| ');
    writeln('Codigo: ', pro.cod);
    if (pro.cod <> 0) then begin
        writeln('Nombre: ', pro.nombre);
        writeln('Descripcion: ', pro.descripcion);
        writeln('Precio: ', pro.precio:0:2);
        writeln('Stock: ', pro.stock);
    end;
    writeln();
end;
	
procedure cargarArchivo (var archivo: arch);
	var
		pro: producto;
	begin
		rewrite(archivo);
		leerProducto(pro);
		while (pro.cod <> 0) do begin
			write(archivo,pro);
			leerProducto(pro);
		end;
		close(archivo);
	end;

procedure imprimirArchivo (var archivo: arch);
	var
		pro: producto;
	begin
		reset(archivo);
		while (not eof(archivo)) do begin
			read(archivo,pro);
			imprimirProducto(pro);
		end;
		close(archivo);
	end;

procedure darBajaLogica(var archivo: arch);
	var
		pro: producto;
	begin
		reset(archivo);
		while (not eof(archivo)) do begin
			read(archivo,pro);
			if (pro.stock = 0) then begin
				pro.nombre:= '@' + pro.nombre;
				seek(archivo,filePos(archivo)-1);
				write(archivo,pro);
			end;
		end;
		close(archivo);
	end;

VAR
	archProductos: arch;
	nombre: str;
BEGIN
	write('Ingrese el nombre que desea para el archivo: ');
	readln(nombre);
	assign(archProductos,nombre);
	//cargarArchivo(archProductos);
	imprimirArchivo(archProductos);
	darBajaLogica(archProductos);
	imprimirArchivo(archProductos);
END.

