// view table memory
function view_table_memory (desp, start){	 
  var id_tabla  = '#tabla';
  var id_indice = '#indice';
  str ='<div id="tabla">';
  str = str + "<table>";
  for(i=0; i<(sel_val['mem_cap']); i++){
    str = str + "<tr id ='fila"+i+"'>";
    str = str + "<td id='filaFlecha'><div id='filaIndice"+i+"' style='display:none;'></div></td>";
	
    for(j=0; j<(sel_val['node_cap']+desp); j++){
	  str = str + "<td>"+memoria[i][j]+"</td>";
    }
	str = str + "</tr>";	
  }
  str = str + "</table>";
  str = str + "</div>";
  if (start){
	$(str).appendTo("#contenedor");
  } else 
    {
      $(id_tabla).replaceWith(str);
    }
  return false;
}

// view table separate memory area
function view_table_separate_memory_area (desp, start){
  var id_tabla = '#tabla';
  var str;
  str = '<div id = "tabla">';
  str = str + "<table>";	  
  for(i=0; i<(sel_val['mem_cap']); i++){
    str = str + "<tr id='fila"+i+"'>";
    str = str + "<td id='filaFlecha'><div id='filaIndice"+i+"' style = 'display:none;'></div></td>";
	 
	for(j=0; j<(sel_val['node_cap']+desp); j++){
	  str = str + "<td>"+memoria[i][j]+"</td>";
	}
	str = str + "</tr>";	
  }
  str = str + "<tr><td id = 'filaFlecha'><div id = 'filaIndiceDesb' style = 'display:none;'><img src='js/css/arrowright.png' border='0'></div></td><td id = 'filaFlecha'></td><td id='filaFlecha'></td><td id='filaFlecha'></td></tr>";
  for(i=0; i<gen_inf['sep_mem_cap']; i++){
    str = str + "<tr id = 'filaDesb"+i+"'>";
    str = str + "<td id = 'filaFlecha'><div id='filaIndiceDesb"+i+"' style = 'display:none;'><img src='js/css/arrowright.png' border='0'></div></td>";
	 
    str = str + "<td>"+i+"</td><td>"+memoriadesborde[i][1]+"</td><td>"+memoriadesborde[i][2]+"</td>";
    str = str + "</tr>";	  
  }
	    
  str = str + "</table>"; 
  str = str + "</div>";
  
  if (start){
    $(str).appendTo("#contenedor");
	$(id_tabla).hide();
	$(id_tabla).show('slow');  
  } else { $(id_tabla).replaceWith(str); }
  return false;
}

//view function hash
function view_function_hash (k, dir, start){
  str = '';
  if (start) {
    tagFuncion = "<h4 id='funcion_animacion'>F(clave) = direcci&oacute;n</h4>";    	  
  } else {
      tagFuncion = "<h4 id='funcion_animacion'>F("+k+") = "+dir+"</h4>";
    }
  str = str+"<div id='panel-funcion'>";
  str = str+tagFuncion;
  str = str+"</div>";
  $("#panel-funcion").replaceWith(str);	
}

// view second function
function view_second_function (k, off){
  str        = '';
  tag_function = '';
  if (off != 0){
    tag_function = "<h4 id='funcion_segunda_animacion'>F<font size='1'>2</font>("+k+") = "+off+"</h4>";
  }
  str = str+"<div id='panel-segunda-funcion'>";
  str = str+tag_function;
  str = str+"</div>";
  $("#panel-segunda-funcion").replaceWith(str);	
}

// show sidebar read write
function view_sidebar_read_write (){
  str = '<h5 id="sidebar_read"> Lecturas en disco: '+sel_val['number_read']+'</h5>';	
  $("#sidebar_read").replaceWith(str);
  str = '<h5 id="sidebar_write"> Escrituras en disco: '+sel_val['number_write']+'</h5>';	
  $("#sidebar_write").replaceWith(str);
  
  str = '<h5 id="sidebar_read_partial"> Lecturas en disco: '+sel_val['number_read_partial']+'</h5>';	
  $("#sidebar_read_partial").replaceWith(str);
  str = '<h5 id="sidebar_write_partial"> Escrituras en disco: '+sel_val['number_write_partial']+'</h5>';	
  $("#sidebar_write_partial").replaceWith(str);  
}

// panel reset
function panel_reset(){
  $("h6").replaceWith("<h6 id='hist'></h6>");        
  $("#params").replaceWith('<div id="params"></div>');
}

// selected parameters
function view_selected_parameters(){
  $("#params").append("<h5><strong>Funci&oacute;n de dispersi&oacute;n: </strong>"+ sel_val_name['func_name']+"</h5>");
  if (sel_val['func'] == 3) {
    $("#params").append("<h5><strong>Base: </strong>"+sel_val_name['base_name']+"</h5>");
  }
  if (sel_val['type_disp'] == 1){
    $("#params").append("<h5><strong>Cantidad de direcciones: </strong>"+sel_val['mem_cap']+"</h5>");
  }
  if (sel_val['tech'] != 2){
    $("#params").append("<h5><strong>Capacidad de una direcci&oacute;n: </strong>"+sel_val['node_cap']+"</h5>");
  }  
  $("#params").append("<h5><strong>Claves a dispersar: </strong>"+sel_val['keys']+"</h5>");
  if (sel_val['type_disp'] == 1){
    $("#params").append("<h5><strong>Densidad de empaquetamiento: </strong>"+sel_val['den']+"%</h5>");
  }
  $("#params").append("<h5><strong>Resoluci&oacute;n de colisiones: </strong>"+sel_val_name['tech_name']+"</h5>");
  if (sel_val['tech'] == 4){
    $("#params").append("<h5><strong>Segunda funci&oacute;n: </strong>"+sel_val_name['sec_func_name']+"</h5>");  
  }                 
}

// show progressive saturation history
function view_progressive_saturation_history(k, dir, state, operation){
  var str = '';	
  switch (operation){
  case 1:
	str = str + "<img src='imagenes/comment_add.png' title='Alta de una clave'/>";
    if (state) {
	  str = str + string_insert_progressive_saturation_overflow (k, dir);
    } else 
      {
    	str = str + string_insert_progressive_saturation (k, dir);
      }
  break;
  case 2:
	str = str + "<img src='imagenes/comment_delete.png' title='Baja de una clave'/>";
	if (state) {
	  if (dir == gen_inf["mem_loc"]) {
	    str = str + string_delete_progressive_saturation(k, dir);  
	  } else
	    {
		  str = str + string_delete_overflow_progressive_saturation(k, dir);
	    }	
      
	} else 
	  {
		str = str + string_not_found_progressive_saturation(k);
	  }
  break;
  case 3: 
    str = str + "<img src='imagenes/comment_search.png' title='Búsqueda de una clave'/>";
    if (state){
      if (dir == gen_inf["mem_loc"]) {
        str = str + string_search_progressive_saturation(k, dir);
      } else
        {
    	  str = str + string_search_overflow_progressive_saturation(k, dir);
        }
    } else 
      {
    	str = str + string_not_found_progressive_saturation(k);
      }
  break;  
  };
  return str;
}

// history progressive saturation chained
function view_progressive_saturation_chained_history (k, dir, state, operation){
  var str = '';	
  switch (operation){
  case 1:
	str = str + "<img src='imagenes/comment_add.png' title='Alta de una clave'/>";  
    if (state){
      if (gen_inf['intr_key']){
    	  str = str + string_insert_progressive_chained_saturation_intruder(k, dir);
      } else 
        {
    	  str = str + string_insert_progressive_chained_saturation_overflow(k, dir); 
        }
    } else 
      {
    	str = str + string_insert_progressive_saturation(k, dir);
      }	  
  break;
  case 2:
    str = str + "<img src='imagenes/comment_delete.png' title='Baja de una clave'/>";
    if (state){
      if (dir == gen_inf["mem_loc"]) {
    	if (gen_inf['exist_chained']) {  
          str = str + string_delete_progressive_chained_saturation (k, dir);
    	} else
    	{
    		str = str + string_delete_progressive_saturation(k, dir);
    	}    
      } else 
        {
    	  str = str + string_delete_progressive_chained_saturation_overflow (k, dir);
        }
    } else {
    	  str = str + string_not_found_progressive_saturation(k);	
      }
  break;
  case 3:
    str = str + "<img src='imagenes/comment_search.png' title='Búsqueda de una clave'/>";
    if (state){
      if (dir == gen_inf["mem_loc"]) {
        str = str + string_search_progressive_saturation(k, dir);
      } else 
        {
    	  str = str + string_search_overflow_progressive_saturation(k, dir);   
        }  	
    } else 
      {
    	str = str + string_not_found_progressive_saturation(k);
      }
  break;
  }
  return str;
}

function view_progressive_saturation_chained_separated_overflow(k, dir, state, operation){
  var str = '';	
  switch (operation){
  case 1:
    str = str + "<img src='imagenes/comment_add.png' title='Alta de una clave'/>";
    if (state) {
  	  str = str + string_insert_progressive_saturation_chained_separated_overflow (k, dir);
    } else 
     {
       str = str + string_insert_progressive_saturation (k, dir);
     }
  break;
  case 2:
    str = str + "<img src='imagenes/comment_delete.png' title='Baja de una clave'/>";
    if (state) {
  	  if ((dir == gen_inf["mem_loc"]) && (!(gen_inf['search_area_overflow']))) {
  	    str = str + string_delete_progressive_saturation(k, dir);  
  	  } else
  	    {
  		  str = str + string_delete_progressive_saturation_chained_separated_overflow (k, dir);
  	    }        
  	} else 
  	  {
  		str = str + string_not_found_progressive_saturation(k);
  	  }
  break;
  case 3:
    str = str + "<img src='imagenes/comment_search.png' title='Búsqueda de una clave'/>";
    if (state){
      if ((dir == gen_inf["mem_loc"]) && (!(gen_inf['search_area_overflow']))) {
        str = str + string_search_progressive_saturation(k, dir);
      } else
        {
      	  str = str + string_search_progressive_saturation_chained_separated_overflow (k, dir);
        }
      } else 
        {
      	  str = str + string_not_found_progressive_saturation(k);
        }
  break;
  }
  return str;
}

// show the history of double dispersion
function view_history_double_dispersion(k, dir, state, operation){
  var str = '';
  switch (operation){
  case 1:
    str = str + "<img src='imagenes/comment_add.png' title='Alta de una clave'/>";
	if (state) {
	  str = str + string_insert_double_dispersion_overflow (k, dir);
	} else 
	  {
		str = str + string_insert_progressive_saturation (k, dir);		
	  }
  break;
  case 2:
    str = str + "<img src='imagenes/comment_delete.png' title='Baja de una clave'/>";
	if (state) {
	  if (dir == gen_inf["mem_loc"]) {
	    str = str + string_delete_progressive_saturation(k, dir);  
      } else
		{
		  str = str + string_delete_double_dispersion_overflow(k, dir);
		}	
	      
    } else 
	  {
	    str = str + string_not_found_progressive_saturation(k);
	  }	  
  break;
  case 3:
    str = str + "<img src='imagenes/comment_search.png' title='B&uacute;squeda de una clave'/>";
	if (state){
	  if (dir == gen_inf["mem_loc"]) {
	    str = str + string_search_progressive_saturation(k, dir);
	  } else
	    {
	      str = str + string_search_double_dispersion_overflow(k, dir);
	    }
	} else 
	  {
	    str = str + string_not_found_progressive_saturation(k);
	  }  
  break;
  }  
  return str;
}

function view_history_extensible_dispersion(k, dir, state, operation){
  var str = '';
  switch (operation){ 
  case 1:
    str = str + "<img src='imagenes/comment_add.png' title='Alta de una clave'/>";
    if (state) {
		  str = str + string_insert_extensible_dispersion_overflow(k);
	} else 
	  {
        str = str + string_insert_extensible_dispersion(k);		
      }
  break;
  case 2:
    str = str + "<img src='imagenes/comment_delete.png' title='Baja de una clave'/>";
	if (state) {
      str = str + string_delete_extensible_dispersion(k);
	} else {
		     str = str + string_not_found_progressive_saturation(k);		
		   }			  
  break;
  case 3:
    str = str + "<img src='imagenes/comment_search.png' title='B&uacute;squeda de una clave'/>";
	if (state) {
	  str = str + string_search_extensible_dispersion(k);
    } else 
		  {
	        str = str + string_not_found_extensible_dispersion(k);		
	      }
	  
  break;
  }  
  return str;
}



// view history panel
function view_history_panel (k, dir, technique, state, operation){
  var str = "<h6 id='hist' style='display: none'>";  
  switch (technique){
  case 1: str = str + view_progressive_saturation_history(k, dir, state, operation); break;
  case 2: str = str + view_progressive_saturation_chained_history(k, dir, state, operation); break;
  case 3: str = str + view_progressive_saturation_chained_separated_overflow(k, dir, state, operation); break;
  case 4: str = str + view_history_double_dispersion(k, dir, state, operation); break;
  case 5: str = str + view_history_extensible_dispersion(k, dir, state, operation); break;
  };
  
  str = str + "</h6>";
  $(str).insertBefore("#hist");
  $("h6").slideDown("slow");
  return false;
}


// view history panel key redispersed
function view_history_panel_solve_key_redispersed(number_saturation){
  var str   = "<h6 id='hist' style='display: none'>";
  str       = str + "<img src='imagenes/tag_info.png' title='Informaci&oacute;n sobre la &uacute;ltima operaci&oacute;n realizada'/>";  
  str_value = "";	  
  end       = sel_val['node_cap'] + 1;
  
  for (i=1; i <= end; i++){
    index     = "dispersed_keys_"+number_saturation+'_'+i;
	value     = dispersed_keys[index];
	str_value = str_value + "'"+value+"'";
	if (i < end){
	  str_value = str_value + ", ";
	}
  }	  
  str = str + "Se vuelven a dispersar las claves: "+str_value+".";//string_insert_solve_key_redispersed();
  str = str + "</h6>";
    
  $(str).insertBefore("#hist");
  $("h6").slideDown("slow");
  return false;
}


function view_history_panel_finish_key_insertion_with_saturation(dir_mem_loc){
  var str = "<h6 id='hist' style='display: none'>";
  str     = str + "<img src='imagenes/tag_info.png' title='Informaci&oacute;n sobre la &uacute;ltima operaci&oacute;n realizada'/>";
  str     = str + "Nuevamente se produce saturaci&oacute;n, la direcci&oacute;n afectada es la "+dir_mem_loc+".";
  str     = str + "</h6>";
  $(str).insertBefore("#hist");
  $("h6").slideDown("slow");
  return false;
}



//To show the bar of progress
function show_bar_progress(show){
  if (show) {
    $('#insertar-clave').hide();
    $('#eliminar-clave').hide();
    $('#buscar-clave').hide();
    $('#virtual-keyboard').hide();
    $('#close-simulation').hide();
    $('#container_progress').show('slow');
  } else 
    {
	  $('#insertar-clave').show();
	  $('#eliminar-clave').show();
	  $('#buscar-clave').show();
	  $('#virtual-keyboard').show();
	  $('#close-simulation').show();
	  $('#container_progress').hide('slow');
    }
}

// view function extensible dispersion
function view_function_extensible_dispersion (clv, str_b, number_saturation){
  str        = '';
  str_normal = str_b;
  str_bold   = '';
  
  v_a = copy_val_asoc[number_saturation];
      
  dif = 8 - v_a;
  str_normal = str_b.substring(0, dif);
  str_bold   = str_b.substring(dif, 8);
    
  tag = "<h4 id='funcion_animacion'>F("+clv+") = "+str_normal+"<b>"+str_bold+"</b></h4>";
  str = str + "<div id='panel-funcion'>";
  str = str + tag;
  str = str + "</div>";
  $("#panel-funcion").replaceWith(str);
}

// view table extensible dispersion
function view_table_extensible_dispersion(tabla, fila, va, inicio){
  var id_tabla = "#tabla_ext";
  var str = "<div id = 'tabla_ext'>";
  str = str + "<table style='float: left;'><tr><td id = 'filaFlecha'>v.a.:</td><td id = 'valor_asociado'>"+va+"</td></tr>";
  for(i=0; i<fila; i++){
    str = str + "<tr id = 'fila_tab_ext"+i+"'>";
	str = str + "<td id = 'filaFlecha'><div id = 'filaIndice_tab_ext"+i+"' style = 'display:none;'><img src = 'js/css/arrowright.png' border = '0'/></div></td>";
    for(j=0; j<2; j++){
	  str = str + "<td>"+tabla[i][j]+"</td>";
    }
	str = str + "</tr>";	
  }
  str = str + "</table>"; 
  str = str + "</div>";
  if (inicio) {
    $(str).appendTo("#contenedor");
  } else {$(id_tabla).replaceWith(str);}
  return false;  
}

// view memory extensible dispersion
function view_memory_extensible_dispersion(memoria, fila, col, desp, dim_table, inicio){
  var id_tabla = "#mem_ext";
  var str = "<div id = 'mem_ext'>";
  str = str + "<table><tr><td id = 'filaFlecha'></td><td id = 'filaFlecha'>Archivo</td></tr>";
  for(i=0; i<fila; i++){
    str = str + "<tr id = 'fila_mem_ext"+i+"'>";
	str = str + "<td id = 'filaFlecha'><div id = 'filaIndice_mem_ext"+i+"' style = 'display:none;'><img src = 'js/css/arrowright.png' border = '0'/></div></td>";
	for(j=0; j<(col+desp); j++){
      str = str + "<td id = 'cell"+i+j+"'>"+memoria[i][j]+"</td>";
	}
	str = str + "</tr>";	
  }
  dif_end = dim_table - fila;
  for(i=0; i<dif_end; i++){
    str = str + "<tr>";
    str = str + "<td id = 'filaFlecha'></td>"; 
    for(j=0; j<(col+desp); j++){
      str = str + "<td id = 'filaFlecha'></td>";	
    }
    str = str + "</tr>";
  }
  str = str + "</table>"; 
  str = str + "</div>";
  if (inicio) {
    $(str).appendTo("#contenedor");
  } else {$(id_tabla).replaceWith(str);} 
  return false;	
}


// METODOS QUE NO SON UTILIZADOS //

/*
function eliminar_tabla(instancia){
	var str='#tabla'+instancia;
    $(str).remove();
}

function imprimir_prueba (nn, nd){
  var str;
  str = '<div class="left">';
  str = str + "<table>";  
  str = str + "<tr>";
  for(j=0; j<(4); j++){
    str = str + "<td>"+cop_nod[num_sat]['new_node_'][j]+"</td>";
  }
  str = str + "</tr>";
  str = str + "<tr>";
  for(j=0; j<(4); j++){
    str = str + "<td>"+cop_nod[num_sat]['copy_node_'+nd][j]+"</td>";
  }
  str = str + "</tr>";
  str = str + "</table>"; 
  str = str + "</div>";
  $(str).appendTo("#contenedor");
  return false;	
}
*/