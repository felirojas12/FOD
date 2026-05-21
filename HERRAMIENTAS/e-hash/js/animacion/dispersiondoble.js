// animation of the insertion
function animation_insertion (k, direction, sat){
  setTimeout("view_second_function (0, 0)", 0);	
  str = "view_function_hash ('"+k+"', "+direction+", false)";
  setTimeout(str, 0);
  setTimeout("animation_function ();", 0);
  str = "animation_insertion_key ('"+k+"', "+direction+", "+sat+")";
  setTimeout(str, 2000);  		
}

// animation of the insertion of the key
function animation_insertion_key (k, direction, sat){
  if (sat) {	 
	animation_insertion_with_saturation (k, direction);
  } else 
    {
	  animation_insertion_without_saturation ();
    }	
}

// animation insertion without saturation
function animation_insertion_without_saturation (){
  var index = '#filaIndice'+gen_inf['mem_loc'];
  $(index).html("<img src='js/css/arrowright.png' border='0'/>");
  $(index).effect("pulsate",{times:3},500);
  str = "hide_animation("+gen_inf['mem_loc']+")";
  setTimeout (str, 3000);
  str = "view_table_memory (1, false)";
  setTimeout (str, 3100);
  str = "animation_flag_without_saturation ("+gen_inf['mem_loc']+")";
  setTimeout (str, 3200);
  str = "view_sidebar_read_write ()";
  setTimeout (str, 5200);  
  str = "animation_sidebar_read_write ()";
  setTimeout (str, 5200);
}

// animation second function
function animation_second_function (){
  $('#funcion_segunda_animacion').effect("pulsate",{times:3},500);
}

// animation insertion with saturation
function animation_insertion_with_saturation (k, direction) {
  var end     = gen_inf['mem_loc'];
  var initial = direction;
  
  for (i=0; i<(sel_val['mem_cap']); i++){
    hide_animation (i);
  }
  
  str = "show_arrow ("+direction+")";
  setTimeout(str, 0);
  str = "animation_flag_with_saturation ("+direction+")";
  setTimeout(str, 3000);
  str = "view_second_function ('"+k+"', "+offset+")";
  setTimeout(str, 5000);
  setTimeout('animation_second_function ();', 5000);
  
  var time = 7000;
  delta    = calculate_next_memory_location (initial, offset);
  while (initial != end){  
	setTimeout ("animation_memory_location (delta)",time);
	setTimeout ("hide_animation (delta)", time+2000); 
	setTimeout ("delta = calculate_next_memory_location (delta, offset)",time+2000);
	time = time + 2000;
	initial = calculate_next_memory_location (initial, offset);
  }  
  
  str = "last_step_insertion("+initial+")";
  setTimeout (str, time);
}

//last step of the insertion
function last_step_insertion (direction){
  str = "view_table_memory (1, false)";
  setTimeout (str, 0);
  str = "animation_flag_without_saturation ("+direction+")";
  setTimeout (str, 100);
  str = "view_sidebar_read_write ()";
  setTimeout (str, 3100);  
  str = "animation_sidebar_read_write ()";
  setTimeout (str, 3100);
}

// calculate next memory location
function calculate_next_memory_location (ini, off){
  if (ini+off>=(sel_val['mem_cap'])){
    val=sel_val['mem_cap']-ini;
    ini=offset-val;	
  } else {
      ini=ini+offset;	
  }
  return ini;
}

// show arrow
function show_arrow (delta){
  var index = '#filaIndice'+delta;
  $(index).html("<img src='js/css/arrowright.png' border='0'/>");
  $(index).effect("pulsate",{times:3},500);	
}

// animation of a memory location
function animation_memory_location (position){
  show_arrow (position);
}

//animation of the flag with saturation
function animation_flag_with_saturation (direccion){
  var index = '#filaIndice'+direccion;
  $(index).html("<img src='js/css/cross.png' border='0'/>");
  $(index).effect("pulsate",{times:3},500);
}

// animation of the flag without saturation
function animation_flag_without_saturation (direction){
  var index = '#filaIndice'+direction;
  $(index).html("<img src='js/css/tilde.gif' border='0' />");
  $(index).effect("pulsate",{times:3},500);
}

// hide animation
function hide_animation (position){
  var index = '#filaIndice'+position;
  $(index).hide();	
}

// animation of the elimination
function animation_elimination (k, direccion, erase) {
  setTimeout("view_second_function (0, 0)", 0);	
  str = "view_function_hash ('"+k+"', "+direccion+", false)";
  setTimeout(str, 0);
  setTimeout('animation_function ();', 0);
  str = "animation_elimination_key ('"+k+"', "+direccion+", "+erase+")";
  setTimeout(str, 2000);
}

// animation elimination key
function animation_elimination_key (k, direction, erase){  
  var initial = direction;
  var end     = gen_inf['mem_loc'];
  var time    = 0;
  for (i=0; i<(sel_val['mem_cap']); i++){
    hide_animation (i);
  }  
 
  str = "show_arrow ("+direction+")";
  setTimeout(str, time);
  time = time + 3000;
  
  if (gen_inf['sat_key']) {  	  
  
    str = "animation_flag_with_saturation ("+direction+")";
    setTimeout(str, time);
    time = time + 3000;
    str = "view_second_function ('"+k+"', "+offset+")";
    setTimeout(str, time);
    setTimeout('animation_second_function ();', time);
    
    var time = time + 3000; 
    delta    = calculate_next_memory_location (initial, offset);
    while (initial != end){  
	  setTimeout ("animation_memory_location (delta)",time);
	  setTimeout ("hide_animation (delta)", time+2000); 
	  setTimeout ("delta = calculate_next_memory_location (delta, offset)",time+2000);
	  time    = time + 2000;
	  initial = calculate_next_memory_location (initial, offset);
    } 
  } else 
    {
	  setTimeout ("animation_memory_location ("+initial+", 1)", time); 
    } 
  str = "animation_last_step("+erase+")";
  setTimeout (str, time);    
}

// animation of the last step
function animation_last_step (state){
  str = "view_table_memory (1, false)";
  setTimeout (str, 0);	
  if (state){
    str = "animation_flag_without_saturation ("+gen_inf['mem_loc']+")";
  } else {
	  str = "animation_flag_with_saturation ("+gen_inf['mem_loc']+")";	 
    }
  setTimeout (str, 100);
  str = "view_sidebar_read_write ()";
  setTimeout (str, 3100);  
  str = "animation_sidebar_read_write ()";
  setTimeout (str, 3100);
}

// animation of the search
function animation_search (k, direction, exist) {
  setTimeout("view_second_function (0, 0)", 0);	
  str = "view_function_hash ('"+k+"', "+direction+", false)";
  setTimeout(str, 0);
  setTimeout('animation_function ();', 0);
  str = "animation_search_key ('"+k+"', "+direction+", "+exist+")";
  setTimeout(str, 2000);    		
}

// animation search key 
function animation_search_key (k, direction, exist){
  animation_elimination_key (k, direction, exist)  
}