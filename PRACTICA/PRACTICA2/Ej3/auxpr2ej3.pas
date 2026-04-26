program cargarArchivos;
{programa hecho con IA para cargar los archivos Maestro y Detalles}
type
    str = string[20];

    provincias = record
        provincia: str;
        cantPersonas: integer;
        encuestados: integer;
    end;

    agencias = record
        provincia: str;
        localidad: integer;
        cantPersonas: integer;
        encuestados: integer;
    end;

    maestro = file of provincias;
    detalle = file of agencias;

var
    mae: maestro;
    det1, det2: detalle;
    regm: provincias;
    regd: agencias;

begin
    { ====== CREAR MAESTRO ====== }
    assign(mae, 'maestro.dat');
    rewrite(mae);

    { Buenos Aires }
    regm.provincia := 'Buenos Aires';
    regm.cantPersonas := 1000;
    regm.encuestados := 1200;
    write(mae, regm);

    { Cordoba }
    regm.provincia := 'Cordoba';
    regm.cantPersonas := 800;
    regm.encuestados := 1000;
    write(mae, regm);

    { Mendoza }
    regm.provincia := 'Mendoza';
    regm.cantPersonas := 500;
    regm.encuestados := 700;
    write(mae, regm);

    close(mae);

    { ====== CREAR DETALLE 1 ====== }
    assign(det1, 'detalle1.dat');
    rewrite(det1);

    { Buenos Aires - La Plata }
    regd.provincia := 'Buenos Aires';
    regd.localidad := 1;
    regd.cantPersonas := 200;
    regd.encuestados := 250;
    write(det1, regd);

    { Buenos Aires - Mar del Plata }
    regd.provincia := 'Buenos Aires';
    regd.localidad := 2;
    regd.cantPersonas := 150;
    regd.encuestados := 200;
    write(det1, regd);

    { Cordoba - Capital }
    regd.provincia := 'Cordoba';
    regd.localidad := 1;
    regd.cantPersonas := 100;
    regd.encuestados := 150;
    write(det1, regd);

    close(det1);

    { ====== CREAR DETALLE 2 ====== }
    assign(det2, 'detalle2.dat');
    rewrite(det2);

    { Buenos Aires - Bahía Blanca }
    regd.provincia := 'Buenos Aires';
    regd.localidad := 3;
    regd.cantPersonas := 180;
    regd.encuestados := 220;
    write(det2, regd);

    { Mendoza - Capital }
    regd.provincia := 'Mendoza';
    regd.localidad := 1;
    regd.cantPersonas := 120;
    regd.encuestados := 180;
    write(det2, regd);

    close(det2);

    writeln('Archivos creados correctamente.');
end.
