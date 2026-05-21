function animation_extensible_dispersion(k, sb, sat){
  str = "hide_animation()";
  setTimeout(str, 0);
  str = "view_function_extensible_dispersion('"+k+"', '"+sb+"', 0)";
  setTimeout(str, 0);
  setTimeout('animation_function();', 0);
  str = "animation_insertion_key("+sat+")";
  setTimeout(str, 3000);
}

function animation_insertion_key(sat){
  if (sat) {	   
	animation_insertion_with_collision(0);
  } else 
    {
	  animation_insertion_without_collision();
    }	
}

function animation_insertion_without_collision(){
  var index     = 'table_pos_0_1';
  var index_pos_tabla = gen_inf[index];
	  
  var index     = 'mem_loc_0_1';
  var index_mem_loc = gen_inf[index];  
	  
  str = "show_arrow_table("+index_pos_tabla+")";
  setTimeout (str, 0);  
  str  = "hide_arrow_table("+index_pos_tabla+")";
  setTimeout (str, 3000);
  str = "show_arrow_memory("+index_mem_loc+")";
  setTimeout (str, 3000);  
  str  = "hide_arrow_memory("+index_mem_loc+")";
  setTimeout (str, 6000);
  str = "view_table_extensible_dispersion(tabla, sel_val['tab_dim'], valor_asoc, false)";
  setTimeout(str, 6000);
  str = "view_memory_extensible_dispersion(memoria, sel_val['mem_cap'], sel_val['node_cap'], 2, sel_val['tab_dim'], false)"; 
  setTimeout(str, 6000);
  str = "animation_flag_without_saturation("+index_mem_loc+")";
  setTimeout (str, 6000);
  setTimeout("show_bar_progress(false)", 9000);
  
  
}

function animation_insertion_with_collision (number_saturation) {
  var index           = "table_pos_"+number_saturation+"_1";
  var index_pos_tabla = gen_inf[index];
		  
  var index           = "mem_loc_"+number_saturation+"_1";
  var index_mem_loc   = gen_inf[index];  
		  
  str = "show_arrow_table("+index_pos_tabla+")"
  setTimeout (str, 0);
  str = "hide_arrow_table("+index_pos_tabla+")";
  setTimeout (str, 3000);
  str = "show_arrow_memory("+index_mem_loc+")";
  setTimeout (str, 3000);
  str = "hide_arrow_memory("+index_mem_loc+")";
  setTimeout (str, 6000);
  str = "animation_flag_with_saturation("+index_mem_loc+")";
  setTimeout (str, 6000);
  
  str = "animation_saturation()";  
  setTimeout (str, 8000);	  
}

function animation_saturation(){
  delta_number_saturation = 1;
  delta_time              = 0;
  for(i=1; i<=num_sat; i++){
	str = "solve_saturation(delta_number_saturation)";
	setTimeout(str, delta_time); 
	setTimeout("delta_number_saturation++", delta_time);       
	delta_time = delta_time + (((sel_val['node_cap'] + 1) * 14000) + 500);    
  }
  /*
  str = "view_table_extensible_dispersion(tabla, sel_val['tab_dim'], valor_asoc, false)";
  setTimeout(str, delta_time+1000);
  str = "view_memory_extensible_dispersion(memoria, sel_val['mem_cap'], sel_val['node_cap'], 2, sel_val['tab_dim'], false)"; 
  setTimeout(str, delta_time+1000);*/
  setTimeout("show_bar_progress(false)", delta_time+500);
  setTimeout("copy_val_asoc[0] = valor_asoc", delta_time+500);  
}


function solve_saturation(number_saturation){
  delta_time_solve_saturation = 3000;
  
  dir_node_conflict = copy_dir_conflict[number_saturation];
  
  value_asoc_memory = copy_memory[number_saturation][dir_node_conflict][1];
  value_asoc_memory = parseInt(value_asoc_memory);  
  
  initial_flash_memory('#valor_asociado');
  
  index_flash = '#cell'+dir_node_conflict+'1';
  $(index_flash).replaceWith("<td id = 'cell"+dir_node_conflict+"1'>"+value_asoc_memory+"</td>");
  
  initial_flash_memory(index_flash);  
  
  for(j=2; j<(sel_val['node_cap'])+2; j++){
	copy_memory[number_saturation][dir_node_conflict][j] = '----';
  }
  dir_mem_cap = ((length_copy[number_saturation][1]) - 1);
  for(j=2; j<(sel_val['node_cap'])+2; j++){
	copy_memory[number_saturation][dir_mem_cap][j] = '----';	  
  }
  
  str = "view_table_extensible_dispersion(copy_table["+number_saturation+"],length_copy["+number_saturation+"][0], copy_val_asoc["+number_saturation+"], false)"
  setTimeout (str, delta_time_solve_saturation);
  str = "view_memory_extensible_dispersion(copy_memory["+number_saturation+"], length_copy["+number_saturation+"][1], sel_val['node_cap'], 2, length_copy["+number_saturation+"][0], false)";
  setTimeout (str, delta_time_solve_saturation);  
  
  setTimeout ("initial_flash_memory('#tabla_ext')", delta_time_solve_saturation);
  setTimeout ("initial_flash_memory('#mem_ext')", delta_time_solve_saturation);  
  
  str = "solve_key_redispersed("+number_saturation+")";
  setTimeout (str, delta_time_solve_saturation);
  
  str = "view_history_panel_solve_key_redispersed("+number_saturation+")";
  setTimeout (str, delta_time_solve_saturation);
}

function solve_key_redispersed(number_saturation){
  delta_key_redispersed  = 1;
  delta_time_redispersed = 3000;
  end_it                 = sel_val['node_cap'] + 1;
  
  for (i=1; i <= end_it; i++){
	str = "animation_insertion_key_redispersed("+number_saturation+", delta_key_redispersed)";
	setTimeout(str, delta_time_redispersed);
	setTimeout('delta_key_redispersed++', delta_time_redispersed);
	delta_time_redispersed = delta_time_redispersed + 12000;
  }
}


function animation_insertion_key_redispersed (number_saturation, order_key){
  delta_time_insertion_key_redisperse = 0;	
	
  index_table_pos = 'table_pos_'+number_saturation+'_'+order_key;	
  table_pos       = gen_inf[index_table_pos];
		
  index_mem_pos   = 'mem_loc_'+number_saturation+'_'+order_key;
  dir_mem_loc     = gen_inf[index_mem_pos];

  index_disp_key  = 'dispersed_keys_'+number_saturation+'_'+order_key;
  value_key       = dispersed_keys[index_disp_key];
  
  index_cell_key  = 'cell_keys_'+number_saturation+'_'+order_key;
  cell            = dispersed_keys[index_cell_key];
  
  str_bin         = hash_function (value_key);
  
  str = "view_function_extensible_dispersion('"+value_key+"','"+str_bin+"',"+number_saturation+")";
  setTimeout (str, delta_time_insertion_key_redisperse);
  str = "animation_function()";
  setTimeout (str, delta_time_insertion_key_redisperse);
  
  delta_time_insertion_key_redisperse = delta_time_insertion_key_redisperse + 3000;
  
  str = "show_arrow_table("+table_pos+")";  
  setTimeout (str, delta_time_insertion_key_redisperse);
  
  delta_time_insertion_key_redisperse = delta_time_insertion_key_redisperse + 3000;
  
  str = "hide_arrow_table("+table_pos+")";
  setTimeout (str, delta_time_insertion_key_redisperse);
  
  str = "show_arrow_memory("+dir_mem_loc+")";
  setTimeout (str, delta_time_insertion_key_redisperse);
  
  delta_time_insertion_key_redisperse = delta_time_insertion_key_redisperse + 3000;
  
  str = "hide_arrow_memory("+dir_mem_loc+")";
  setTimeout (str, delta_time_insertion_key_redisperse);
  
  str = "insert_key("+number_saturation+", "+dir_mem_loc+", "+cell+", '"+value_key+"')";  
  setTimeout (str, delta_time_insertion_key_redisperse);
  
  str = "view_memory_extensible_dispersion(copy_memory["+number_saturation+"], length_copy["+number_saturation+"][1], sel_val['node_cap'], 2, length_copy["+number_saturation+"][0], false)";
  setTimeout (str, delta_time_insertion_key_redisperse);
 
  str = "finish_key_insertion("+number_saturation+", "+dir_mem_loc+", "+order_key+")";
  setTimeout (str, delta_time_insertion_key_redisperse);
  	
}

function insert_key(number_saturation, dir_mem_loc, cell, value_key){
  if (cell != -1){
    copy_memory[number_saturation][dir_mem_loc][cell] = value_key;
  }
}

function finish_key_insertion(number_saturation, dir_mem_loc, order_key ){
  
  if ((number_saturation<num_sat) && (order_key == sel_val['node_cap'] + 1)) {
	  str = "animation_flag_with_saturation("+dir_mem_loc+")";
	  setTimeout (str, 0);	  
	  str = "view_history_panel_finish_key_insertion_with_saturation("+dir_mem_loc+")";
	  setTimeout (str, 0);
  } else 
    {
	  str = "animation_flag_without_saturation("+dir_mem_loc+")";
	  setTimeout (str, 0);	 
    }	
}


/* METODOS PARA LA ELIMINACION y BUSQUEDA */


function animation_search_key(str_bin, key, exist){
  str = "hide_animation()";
  setTimeout(str, 0);	
  str = "view_function_extensible_dispersion('"+key+"', '"+str_bin+"', 0)";
  setTimeout(str, 0);
  setTimeout('animation_function();', 0);
  str = "animation_search("+exist+")";
  setTimeout(str, 3000);	
}

function animation_search(exist){  
  str = "show_arrow_table("+gen_inf['table_pos']+")";
  setTimeout (str, 0);
  str  = "hide_arrow_table("+gen_inf['table_pos']+")";
  setTimeout (str, 3000);
  str = "show_arrow_memory("+gen_inf['mem_loc']+")";
  setTimeout (str, 3000);  
  str  = "hide_arrow_memory("+gen_inf['mem_loc']+")";
  setTimeout (str, 6000);
  str = "animation_search_finish("+exist+")";
  setTimeout (str, 6000);
}

function animation_search_finish(exist){
  str = "view_memory_extensible_dispersion(memoria, sel_val['mem_cap'], sel_val['node_cap'], 2, sel_val['tab_dim'], false)";
  setTimeout (str, 0);
  if (exist){
    str = "animation_flag_without_saturation("+gen_inf['mem_loc']+")";  
  } else{
	  str = "animation_flag_with_saturation("+gen_inf['mem_loc']+")";
  }
  setTimeout (str, 0);
  setTimeout("show_bar_progress(false)", 3000);
}

function animation_elimination(str_bin, key, exist){
  animation_search_key(str_bin, key, exist);  
}

function existence_key(str_bin, key){
  dir_mem = gen_inf['mem_loc'];
  index   = "#fila_mem_ext"+dir_mem;
  $(index).effect("pulsate",{times:3},500);	
}


/* METODOS DE MOSTRAR Y OCULTAR */

function show_arrow_table(delta){
  var indice_tab='#filaIndice_tab_ext'+delta;
  $(indice_tab).html("<img src = 'js/css/arrowRightBlue.png' border = '0'/>");
  $(indice_tab).effect("pulsate",{times:3},500);
}

function show_arrow_memory(delta){
  var indice_mem = "#filaIndice_mem_ext"+delta;
  $(indice_mem).html("<img src = 'js/css/arrowright.png' border = '0'/>");
  $(indice_mem).effect("pulsate",{times:3},500);
}

function hide_arrow_table(a){
  var indice_tab='#filaIndice_tab_ext'+a;
  $(indice_tab).hide();	
}

function hide_arrow_memory(a){
  var indice_mem = "#filaIndice_mem_ext"+a;
  $(indice_mem).hide();	
}

// animation of the flag without saturation
function animation_flag_without_saturation(direccion){
  var indice_mem = "#filaIndice_mem_ext"+direccion;
  $(indice_mem).html("<img src = 'js/css/tilde.gif' border = '0' />");
  $(indice_mem).effect("pulsate",{times:3},500);	  
}

// animation of the flag with saturation
function animation_flag_with_saturation(direccion){
  var indice_mem="#filaIndice_mem_ext"+direccion;
  $(indice_mem).html("<img src = 'js/css/cross.png' border = '0' />");
  $(indice_mem).effect("pulsate",{times:3},500);
}

// hide animation
function hide_animation(){  	
  for (i=0; i< (sel_val['mem_cap']); i++){
    index_hide = "#filaIndice_mem_ext"+i;
    $(index_hide).hide();
  }	
}