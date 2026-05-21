// Función que desglosa una llave alfanumérica y suma sus valores ASCII
function add_ascii_values (llave){	
  longitud = llave.length; 
  suma = 0;
  for (i=0; i<longitud; i++){
    suma = suma + llave.charCodeAt(i);		
  }
  return suma;
}


// Función de dispersión centros cuadrados
function centros_cuadrados (clave){
  valor_elevado = Math.pow(clave, 2);
  cadena        = valor_elevado.toString();
  longitud      = cadena.length;
  mitad         = Math.round(longitud/2);
  
  switch (longitud){
    case 1:                          
    case 2: valor = cadena;                          
    break;
    case 3:   valor = cadena[mitad-1];
    break;
    case 4:
    case 6: valor = cadena[mitad-1] + cadena[mitad]; 
    break;
    default: valor = cadena[mitad-2] + cadena[mitad-1] + cadena[mitad];	
  };
  valor = (parseInt(valor) % sel_val['mem_cap']);
  return valor;
}

// Transforma la llave recibida a la base recibida en valbas
function transformar_base(llave){
  num = parseInt(llave);
  valor = (num).toString(sel_val['base']);
  if (isNaN(valor)){
    valor = add_ascii_values (valor);
  }
  valor = parseInt(valor) % sel_val['mem_cap'];
  return valor;  	
}

// hash function
function hash_function (k){
  if (isNaN(k)){
   	k = add_ascii_values (k);
  }
  switch (sel_val['func']){
    case 1: value = (k % sel_val['mem_cap']); break;
	case 2: value = centros_cuadrados (k); break;
	case 3: value = transformar_base (k); break;
	case 4: 
      value = convert_to_binary (k);
      value = string_bits(value);
    break;
	default: value = 0;	
  };
  return value;	
}

// second hash function
function second_hash_function (k){
  var llave = k;
  if (isNaN(llave)){
   	llave = add_ascii_values (llave);
  }
  var offset = (llave % sel_val['sec_func']);
  if (offset == 0) {offset++;} 
  else 
  { if (offset == sel_val['mem_cap']){offset++;} }
  return(offset);
}

//Función que calcula el factorial del número recibido como parámetro
function factorial (num){
  if ((num == 0) || (num == 1)){
    return 1;	
  } else {
	return (num * factorial (num-1));
  }
}

// Función que aplica la formula de poisson para "x" recibida como parámetro
function p (x, capmem, cancla){
  cociente = cancla/capmem;
  cociente_elevado = Math.pow(cociente,x);
  e_elevado        = Math.pow(Math.E,(cociente * -1));  
  fac              = factorial(x);  
  prob = (cociente_elevado * e_elevado)/fac;
  return(prob);  
}

// converts a binary key
function convert_to_binary (k){
  b = parseInt(k);
  b = (b).toString(2);
  return b;
}

// takes 8 bits
function string_bits(val){
  var long = val.length;
  if (long >= 8) {
    str_b = val.substring((val.length-8) ,val.length);	  
  } else 
    {
	  dif = 8 - long;
	  str = '';
	  for (i=0; i<dif; i++){
	    str = str + '0';
	  }
	  str_b = str + val;
    }
  return str_b;  
}