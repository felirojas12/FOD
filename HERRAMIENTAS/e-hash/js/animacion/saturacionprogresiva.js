// animation of the insertion
function animation_insertion (k, direction, sat) {	
  str = "view_function_hash ('"+k+"', "+direction+", false)";
  setTimeout(str, 0);
  setTimeout('animation_function ();', 0);
  str = "animation_insertion_key ("+direction+", "+sat+")";
  setTimeout(str, 2000); 		
}

// animation of the insertion of the key
function animation_insertion_key (direction, sat) {
  if (sat) { 
    animation_insertion_with_saturation (direction);
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
  str = "hide_animation ("+gen_inf['mem_loc']+")";
  setTimeout (str, 3000);
  str = "view_table_memory (1, false)";
  setTimeout (str, 3100);  
  str = "animation_flag_without_saturation ()";
  setTimeout (str, 3200);  
  str = "view_sidebar_read_write ()";
  setTimeout (str, 5200);  
  str = "animation_sidebar_read_write ()";
  setTimeout (str, 5200);  
}

// animation insertion with saturation
function animation_insertion_with_saturation (direction) {  
  var initial = direction;
  var end     = gen_inf['mem_loc'];
  
  for (i=0; i< (sel_val['mem_cap']); i++){
    hide_animation (i);
  }
  
  str = "show_arrow ("+direction+")";
  setTimeout(str, 0);
  str = "animation_flag_with_saturation ("+direction+")";
  setTimeout(str, 3000);
  
  var time = 5000;
  initial  = initial+1;
  delta    = initial-1;
  
  if ((initial-1) < end){	
	for(i=initial; i< end; i++){
	  setTimeout("delta++",time);
	  str = "animation_memory_location (delta)";
	  setTimeout(str, time);
	  str = "hide_animation (delta)";
	  setTimeout(str, time+2000);
	  time = time + 2000;
	}
  } else {
      for(i=initial; i<(sel_val['mem_cap']); i++){
        setTimeout("delta++",time);
        str = "animation_memory_location (delta)";
        setTimeout(str, time);
        str = "hide_animation (delta)"; 
        setTimeout(str, time+2000);
        time = time + 2000;
	  }
      setTimeout("delta = -1",time);
	  for(i=0; i<end ;i++){
	    setTimeout("delta++",time);
	    str = "animation_memory_location (delta)";
	    setTimeout (str, time);
	    str = "hide_animation (delta)";
	    setTimeout (str, time+2000); 
	    time = time + 2000;
	  }
    }
  str = "animation_insertion_without_saturation ()";
  setTimeout (str, time);
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
  $(index).html("<img src='js/css/cross.png' border='0' />");
  $(index).effect("pulsate",{times:3},500);	
}

// animation of the flag without saturation
function animation_flag_without_saturation (){
  var index = '#filaIndice'+gen_inf['mem_loc'];
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
  setTimeout("animation_function ();", 0);
  str = "animation_elimination_key ("+direction+", "+erase+")";
  setTimeout(str, 2000);
}

// animation of the elimination key
function animation_elimination_key (direction, erase){
  var initial = direction;
  var end     = gen_inf['mem_loc'];
	  
  for (j=0; j<(sel_val['mem_cap']); j++){
    hide_animation (j);
  }
  
  var time = 2000;
  delta = initial-1;

  if (initial <= end){	
    for(i=initial; i<=end; i++){
	  setTimeout("delta++",time);
      setTimeout ("animation_memory_location (delta)",time);
      setTimeout ("hide_animation (delta)", time+2000); 
      time = time + 2000;
    }
  }else{
	  for(i=initial; i<(sel_val['mem_cap']); i++){
	    setTimeout("delta++", time);
        setTimeout("animation_memory_location (delta)",time);
        str = "hide_animation (delta)";
        setTimeout(str, time+2000);
        time = time + 2000;
	  }
      setTimeout("delta = -1",time);
      for(i=0; i<=end ;i++){
        setTimeout("delta++",time);
        setTimeout ("animation_memory_location (delta)",time);
        str = "hide_animation (delta)";
        setTimeout(str, time+2000); 
        time = time + 2000;
      }  
  }
  
  str = "animation_last_step ("+erase+")";
  setTimeout(str, time);
}

// animation of the last step
function animation_last_step (state){
  var time = 0;
  str = "view_table_memory (1, false)";
  setTimeout (str, time);
  if (state){
	str = "animation_flag_without_saturation ()";	 
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
  str = "view_function_hash ('"+k+"', +"+direction+", false)"
  setTimeout(str, 0);
  setTimeout('animation_function ();', 0);
  str = "animation_search_key ("+direction+", "+exist+")";
  setTimeout(str, 2000);	
}

// animation search key 
function animation_search_key (direction, exist){	
  animation_elimination_key (direction, exist);
}