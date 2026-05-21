// animation of the insertion
function animation_insertion (k, direction, sat){
  str = "view_function_hash ('"+k+"', "+direction+", false)";
  setTimeout(str, 0);
  setTimeout('animation_function ();', 0);
  str = "animation_insertion_key ("+direction+", "+sat+")";
  setTimeout(str, 2000);		
}
 
// animation of the insertion of the key
function animation_insertion_key (direction, sat){
  if (sat) {
    animation_insertion_with_saturation (direction);
  } else {
	  animation_insertion_without_saturation ();
  }	
}

// animation insertion without saturation
function animation_insertion_without_saturation () {
  var index = '#filaIndice'+gen_inf['mem_loc'];
  $(index).html("<img src='js/css/arrowright.png' border='0'/>");
  $(index).effect("pulsate",{times:3},500);
  str = "hide_animation ("+gen_inf['mem_loc']+")";
  setTimeout (str, 3000);
  str = "view_table_memory (2, false)";
  setTimeout (str, 3100);
  str = "animation_flag_without_saturation ("+gen_inf['mem_loc']+")";
  setTimeout (str, 3200);  
  str = "view_sidebar_read_write ()";
  setTimeout (str, 5200);  
  str = "animation_sidebar_read_write ()";
  setTimeout (str, 5200);
}

// animation insertion with saturation
function animation_insertion_with_saturation (direction) {
  var time = 0;
  var initial = direction;
  var end     = gen_inf['mem_loc'];
  
  for (j=0; j<(sel_val['mem_cap']); j++){
    hide_animation (j);
  }  
  str = "show_arrow ("+direction+")";
  setTimeout(str, time);
  time = time + 3000;
  str = "animation_flag_with_saturation ("+direction+")";  
  setTimeout(str, time);
  time = time + 3000;
  
  // animation of the search of the previous memory direction
  if (gen_inf['intr_key']){	  
	initial_intr_key = gen_inf['mem_loc_initial'];
	end_intr_key     = gen_inf['mem_loc_end'];
	delta_intr_key   = initial_intr_key;
	while (initial_intr_key != end_intr_key){
      setTimeout ("animation_memory_location (delta_intr_key)", time);
	  setTimeout ("hide_animation (delta_intr_key)", time+2000); 
	  setTimeout ("delta_intr_key = memoria[delta_intr_key][2]", time+2000);
	  time             = time + 2000;
	  initial_intr_key = memoria[initial_intr_key][2];      	
	}
	setTimeout ("animation_memory_location (end_intr_key)", time);
	time = time + 3000;			
	str = "animation_flag_without_saturation (end_intr_key)";
	setTimeout(str, time);	
	time = time + 3000;
	setTimeout ("hide_animation (end_intr_key)", time);
  }  
  // end of search
  
  initial = initial + 1;
  delta   = initial - 1;

  if ((initial-1) < end){	
    for(i=initial; i< end; i++){
	  setTimeout("delta++", time);
	  setTimeout ("animation_memory_location (delta)", time);
	  setTimeout ("hide_animation (delta)", time+2000); 
	  time = time + 2000;
	}
  } else {
      for(i=initial; i<(sel_val['mem_cap']); i++){
	    setTimeout("delta++", time);
	    setTimeout ("animation_memory_location (delta)", time);
	    setTimeout ("hide_animation (delta)", time+2000); 
	    time = time + 2000;
	  }
	  setTimeout("delta = -1", time);
	  for(i=0; i<end ;i++){
        setTimeout("delta++", time);
		setTimeout ("animation_memory_location (delta)", time);
		setTimeout ("hide_animation (delta)", time+2000); 
		time = time + 2000;
      }
    }
	str = "animation_insertion_without_saturation ()";
	setTimeout (str, time);
	if (gen_inf['intr_key']){
	  str = "animation_flag_without_saturation ("+direction+")";
	  setTimeout(str, time+3200);
	  str = "animation_flag_without_saturation ("+gen_inf['mem_loc_end']+")";
	  setTimeout(str, time+3200);
	}
}

// show arrow
function show_arrow (delta){
  var index = '#filaIndice'+delta;
  $(index).html("<img src='js/css/arrowright.png' border='0' />");
  $(index).effect("pulsate",{times:3},500);	
}

// animation of a memory location
function animation_memory_location (position){
  show_arrow (position);
}

// animation of the flag with saturation
function animation_flag_with_saturation (direction){
  var index = '#filaIndice'+direction;
  if (gen_inf['intr_key']){
    str = "<img src='js/css/cross_yellow.png' border='0' />";
  } else 
    {
	  str = "<img src='js/css/cross.png' border='0' />";   
    }
  $(index).html(str);
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
function animation_elimination (k, direction, erase) {
  str = "view_function_hash ('"+k+"', "+direction+", false)";
  setTimeout(str, 0);
  setTimeout('animation_function ();', 0);
  str = "animation_elimination_key ("+direction+", "+erase+")";
  setTimeout(str, 2000);
}

// animation of the elimination key
function animation_elimination_key (direction, erase){
  var time;
  var initial = direction;
  var end     = gen_inf['mem_loc'];
	  
  for (j=0; j<(sel_val['mem_cap']); j++){
    hide_animation (j);
  }
  
  time        = 2000;
  delta       = initial;
	 
  while (initial!=end) {	  
    setTimeout ("animation_memory_location (delta)", time);
    setTimeout ("hide_animation (delta)", time+2000); 
    setTimeout ("delta = mem_inst[delta][2]", time+2000);
    time    = time + 2000;
    initial = mem_inst[initial][2];
  }
  str = "animation_last_step ("+erase+")";
  setTimeout (str, time);	
}

// animation of the last step
function animation_last_step (state){
  var time = 0;	
  str = "show_arrow ("+gen_inf['mem_loc']+")";
  setTimeout(str, time);
  time = time + 3000;
  setTimeout ("view_table_memory (2, false)", time);
  if (state){
	str = "animation_flag_without_saturation ("+gen_inf['mem_loc']+")";	 
  } else 
    {
      str = "animation_flag_with_saturation ("+gen_inf['mem_loc']+")";	 
    }
  time = time + 100;
  setTimeout (str, time);
  time = time + 3000;
  str = "view_sidebar_read_write ()";
  setTimeout (str, time);  
  str = "animation_sidebar_read_write ()";
  setTimeout (str, time);  
}

// animation of the search
function animation_search (k, direction, exist) {
  str = "view_function_hash ('"+k+"', "+direction+", false)";
  setTimeout(str, 0);
  setTimeout('animation_function ();', 0);
  str = "animation_search_key ("+direction+", "+exist+")";
  setTimeout(str, 2000);
}

// animation search key 
function animation_search_key (direccion, exist){
  var initial = direccion;
  var end     = gen_inf['mem_loc'];
  var time    = 2000;
  delta = initial;
  
  for (j=0; j<(sel_val['mem_cap']); j++){
    hide_animation (j);
  }  
  while (initial!=end){	    
    setTimeout ("animation_memory_location (delta)", time);
    setTimeout ("hide_animation (delta)", time+2000); 
    setTimeout ("delta = memoria[delta][2]",time+2000);
    time    = time + 2000;
    initial = memoria[initial][2];
  }
  str = "animation_last_step ("+exist+")";
  setTimeout (str, time);
}