// array of selected values
function selected_val (){
  var s_v = new Array();
  s_v['type_disp'] = $('input:radio[name=tipodispersion]:checked').val();
  s_v['func']      = parseInt($('#funcion').val());
  s_v['base']      = parseInt($('#base').val());
  s_v['node_cap']  = parseInt($('#capacidadcubeta').val());
  s_v['keys']      = parseInt($('#cantidadclaves').val());
  s_v['tech']      = parseInt($('#tecnica').val());
  s_v['sec_func']  = parseInt($('#primo').val());
  
  if (s_v['tech'] == 2){
    s_v['node_cap'] = 1;
  }  
  if ( $('#capacidadmemoria').val() != -1) {
	s_v['mem_cap']  = parseInt($('#capacidadmemoria').val());  
	s_v['den']      = Math.floor((s_v['keys'] / (s_v['mem_cap']*s_v['node_cap'])) * 100);
  } else { 
	  s_v['den']     = parseInt($('#densidad').val());
	  s_v['mem_cap'] = Math.floor((s_v['keys'] / (s_v['den']*s_v['node_cap'])) * 100); 
	}  
  s_v['number_read']          = 0;
  s_v['number_write']         = 0;
  s_v['number_read_partial']  = 0;
  s_v['number_write_partial'] = 0;

  return s_v;
}

// constant of the selected values
function name_selected_values (){
  var n_s_v = new Array();   
  if (sel_val['type_disp'] == 1){
    n_s_v['func_name']     = $("#funcion option[value='"+$('#funcion').val()+"']").text();  
	n_s_v['base_name']     = $("#base option[value='"+$('#base').val()+"']").text();   
	n_s_v['tech_name']     = $("#tecnica option[value='"+$('#tecnica').val()+"']").text();
	n_s_v['sec_func_name'] = $("#primo option[value='"+$('#primo').val()+"']").text();	
  } else {
	  n_s_v['func_name'] = 'String de bits';
	  n_s_v['tech_name'] = 'Dispersi&oacute;n Extensible';    
  }  
  return n_s_v;	
}


function selected_val_din(){
  var s_v = new Array();
  s_v['func'] = 4;
  s_v['node_cap']  = parseInt($('#capacidadcubeta').val());
  s_v['keys']      = parseInt($('#cantidadclaves').val());
  s_v['mem_cap']   = 1;
  s_v['tab_dim']   = 1;
  
  return s_v;
}

// constant for the limit of keys
function constant_limit_keys(){
  str = "Se llego a la cantidad total de claves seleccionadas para dispersar.";
  return str;
}

// constant for key empty
function constant_key_empty(){
  var str = "Debe ingresar un valor para la clave.";
  return str;
}

// constant for area of saturation completes
function area_saturation_completes(){
  var str = "El \u00E1rea de desborde se encuentra completa.";
  return str;
}

// string for progressive saturation without overflow
function string_insert_progressive_saturation (k, dir){
  var str = "Alta de la clave '"+k+"' en su direcci&oacute;n base "+dir+".";
  return str;
}

//string for progressive saturation with overflow
function string_insert_progressive_saturation_overflow (k, dir){
  var str = "Alta de la clave '"+k+"', su direcci&oacute;n base es "+dir+", se produce saturaci&oacute;n y es almacenada en la direcci&oacute;n "+gen_inf['mem_loc']+".";
  return str;
}

//string for delete progressive saturation
function string_delete_progressive_saturation (k, dir){
  var str = "Se elimin&oacute; la clave '"+k+ "' de su direcci&oacute;n base "+dir+".";
  return str;
}

//string for delete progressive saturation
function string_delete_overflow_progressive_saturation (k, dir){
  var str = "Se elimin&oacute; la clave '"+k+"', su direcci&oacute;n base es "+dir+" pero por ser una clave en saturaci&oacute;n estaba en la direcci&oacute;n "+gen_inf['mem_loc']+".";
  return str;
}

//string for delete progressive saturation
function string_not_found_progressive_saturation (k){
  var str = "La clave '"+k+"' no fue encontrada.";
  return str;
}

// string for search progressive saturation
function string_search_progressive_saturation(k, dir){
  var str = "Se busc&oacute; la clave '"+k+"' y fue encontrada en su direcci&oacute;n base "+dir+".";
  return str;
}

//string for search progressive saturation
function string_search_overflow_progressive_saturation(k, dir){
  var str = "Se busc&oacute; la clave '"+k+"', su direcci&oacute;n base es "+dir+", pero por ser una clave en saturaci&oacute;n fue encontrada en la direcci&oacute;n "+gen_inf['mem_loc']+".";
  return str;
}

// string insert progressive chained saturation overflow
function string_insert_progressive_chained_saturation_overflow(k, dir){
  var str = "Alta de la clave '"+k+"', su direcci&oacute;n base es "+dir+", se produce saturaci&oacute;n, es almacenada en la direcci&oacute;n "+gen_inf['mem_loc']+" y se actualizan los enlaces correspondientes.";
  return str;	
}

// string insert progressive chained saturation intruder
function string_insert_progressive_chained_saturation_intruder(k, dir){
  var str = "Alta de la clave '"+k+"', su direcci&oacute;n base es "+dir+", hay presencia de clave intrusa la cual es reubicada en la direcci&oacute;n "+gen_inf['mem_loc']+" y se actualizan los enlaces correspondientes.";
  return str;	
}

// string for delete progressive chained saturation
function string_delete_progressive_chained_saturation (k, dir){
  var str = "Se elimin&oacute; la clave '"+k+ "' de su direcci&oacute;n base "+dir+". Se reacomoda en la direcci&oacute;n base la siguiente clave en la cadena de sin&oacute;nimos y se actulizan los enlaces correspondientes.";
  return str;
}

// string delete progressive chained saturation with overflow
function string_delete_progressive_chained_saturation_overflow (k, dir){
  var str = "Se elimin&oacute; la clave '"+k+"', su direcci&oacute;n base es "+dir+", pero por ser una clave en saturaci&oacute;n fue encontrada en la direcci&oacute;n "+gen_inf['mem_loc']+". Se actualizan los enlaces correspondientes.";
  return str;
}

// string insert progressive saturation chained separated with overflow
function string_insert_progressive_saturation_chained_separated_overflow(k, dir){
  var str = "Alta de la clave '"+k+"', su direcci&oacute;n base es "+dir+", se produce saturaci&oacute;n y es almacenada en el &aacute;rea de desborde, en la direcci&oacute;n "+gen_inf['mem_loc']+". Se actualizan los enlaces correspondientes.";
  return str;	
}

// string delete progressive saturation chained separated with overflow
function string_delete_progressive_saturation_chained_separated_overflow(k, dir){
  var str = "Se elimin&oacute; la clave '"+k+"', su direcci&oacute;n base es "+dir+" pero por ser una clave en saturaci&oacute;n estaba en el &aacute;rea de desborde, en la direcci&oacute;n "+gen_inf['mem_loc']+". Se actualizan los enlaces correspondientes.";
  return str;
}

// string search progressive saturation chained separated with overflow
function string_search_progressive_saturation_chained_separated_overflow (k, dir){
  var str = "Se busc&oacute; la clave '"+k+"', su direcci&oacute;n base es "+dir+", pero por ser una clave en saturaci&oacute;n fue encontrada en el &aacute;rea de desborde, en la direcci&oacute;n "+gen_inf['mem_loc']+".";
  return str;
}

// string insert double dispersion overflow
function string_insert_double_dispersion_overflow (k, dir){
  var str = "Alta de la clave '"+k+"', su direcci&oacute;n base es "+dir+", se produce saturaci&oacute;n, se aplica la segunda funci&oacute;n de dispersi&oacute;n y la clave es almacenada en la direcci&oacute;n "+gen_inf['mem_loc']+".";
  return str;
}

// string delete double dispersion overflow
function string_delete_double_dispersion_overflow(k, dir){
  var str = "Se elimin&oacute; la clave '"+k+"', su direcci&oacute;n base es "+dir+" pero por ser una clave en saturaci&oacute;n se aplica la segunda funci&oacuten y se la encuentra en la direcci&oacute;n "+gen_inf['mem_loc']+".";
  return str;
}

// string search double dispersion overflow
function string_search_double_dispersion_overflow(k, dir){
  var str = "Se elimin&oacute; la clave '"+k+"', su direcci&oacute;n base es "+dir+" pero por ser una clave en saturaci&oacute;n se aplica la segunda funci&oacute;n de dispersi&oacute;n y se la encuentra en la direcci&oacute;n "+gen_inf['mem_loc']+".";
  return str;	
}

/* CONSTANTES DISPERSION EXTENSIBLE */

function string_insert_extensible_dispersion_overflow(k){
  var index_str      = 'mem_loc_0_1';
  var dir_insert_str = gen_inf[index_str];  	
  
  var bin = hash_function (k);
  
  var str = "Alta de la clave '"+k+"' ("+bin+"), se produce saturaci&oacute;n en la direcci&oacute;n "+dir_insert_str+".";
  return str;
}

function string_insert_extensible_dispersion(k){
  var index_str      = 'mem_loc_0_1';
  var dir_insert_str = gen_inf[index_str];  
  
  var bin = hash_function (k);
  
  var str = "Alta de la clave '"+k+"' ("+bin+") en la direcci&oacute;n "+dir_insert_str+".";
  return str;	
}

function string_search_extensible_dispersion(k){
  var bin = hash_function (k);	
  
  var str = "Se busc&oacute; la clave '"+k+"' ("+bin+") en la direcci&oacute;n "+gen_inf['mem_loc']+" y la misma fue encontrada.";
  return str;
}

function string_not_found_extensible_dispersion(k){
  var bin = hash_function (k);
  
  var str = "Se busc&oacute; la clave '"+k+"' ("+bin+") en la direcci&oacute;n "+gen_inf['mem_loc']+". La clave no se encuentra en el archivo.";
  return str;
}

function string_delete_extensible_dispersion(k){
  var bin = hash_function (k);
	
  var str = "Se elimin&oacute; la clave '"+k+"' ("+bin+"), su direcci&oacute;n es la "+gen_inf['mem_loc']+".";
  return str;
}