// animation of the insertion
function animation_insertion (k, direccion, sat){
  str = "view_function_hash ('"+k+"', "+direccion+", false)";
  setTimeout(str, 0);
  setTimeout('animation_function ();', 0);
  str = "animation_insertion_key ("+direccion+", "+sat+")";
  setTimeout(str, 2000);  		
}
 
// animation of the insertion of the key
function animation_insertion_key (direccion, sat){
  if (sat) {
    animation_insertion_with_saturation (direccion);
  } else 
    {
	  animation_insertion_without_saturation ();
    }	
}

// animation insertion without saturation
function animation_insertion_without_saturation (){
  var index = '#filaIndice'+gen_inf['mem_loc'];  
  $(index).html("<img src='js/css/arrowright.png' border='0' />");
  $(index).effect("pulsate",{times:3},500);
  str = "hide_animation ("+gen_inf['mem_loc']+")";
  setTimeout (str, 3000);
  str = "view_table_separate_memory_area (2, false)";
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
  str = "show_arrow ("+direction+")";
  setTimeout(str, 0);
  str = "animation_flag_with_saturation ("+direction+")";
  setTimeout(str, 3000);
  str = "animation_direction_overflow_area ("+(gen_inf['free_mem_loc']-1)+")";
  setTimeout (str, 5000);
  str = "hide_animation_overflow_area ("+(gen_inf['free_mem_loc']-1)+")";
  setTimeout (str, 8000); 
  str = "animation_last_step_overflow_area ()";
  setTimeout (str, 8100);  
}

// animation last step in the overflow area
function animation_last_step_overflow_area (){ 
  str = "view_table_separate_memory_area (2, false)";  
  setTimeout (str, 0);
  str = "animate_flag_without_saturation_overflow_area ("+(gen_inf['free_mem_loc']-1)+")"; 
  setTimeout (str, 0);  
  str = "view_sidebar_read_write ()";
  setTimeout (str, 3000);  
  str = "animation_sidebar_read_write ()";
  setTimeout (str, 3000);
}

// arrow show the overflow area
function arrow_show_overflow_area (delta){
  var index = '#filaIndiceDesb'+delta;
  $(index).html("<img src='js/css/arrowright.png' border='0' />");
  $(index).effect("pulsate",{times:3},500);	
}

// show arrow
function show_arrow (position){
  var index = '#filaIndice'+position;
  $(index).html("<img src='js/css/arrowright.png' border='0' />");
  $(index).effect("pulsate",{times:3},500);	
}

// animation of a direction in the overflow area
function animation_direction_overflow_area (direction){ 
  arrow_show_overflow_area (direction);
}

// animation of the flag with saturation
function animation_flag_with_saturation (direction){
  var index = '#filaIndice'+direction;
  $(index).html("<img src='js/css/cross.png' border='0' />");
  $(index).effect("pulsate",{times:3},500);	
}

// animation of the flag without saturation
function animation_flag_without_saturation (direction){
  var index = '#filaIndice'+direction;  
  $(index).html("<img src='js/css/tilde.gif' border='0' />");
  $(index).effect("pulsate",{times:3},500);
}

// animate flag without saturation in overflow area
function animate_flag_without_saturation_overflow_area (direction){
  var index = '#filaIndiceDesb'+direction;	  
  $(index).html("<img src='js/css/tilde.gif' border='0' />");
  $(index).effect("pulsate",{times:3},500);
}


//animate flag with saturation in overflow area
function animate_flag_with_saturation_overflow_area (direction){
  var index = '#filaIndiceDesb'+direction;
  $(index).html("<img src='js/css/cross.png' border='0' />");
  $(index).effect("pulsate",{times:3},500);	
}

// hide animation in the overflow area
function hide_animation_overflow_area (direction){
  var index = '#filaIndiceDesb'+direction;
  $(index).hide();	
}

// hide animation
function hide_animation (direction){
  var index = '#filaIndice'+direction;
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
  var area        = gen_inf['search_area_overflow'];
  var end         = gen_inf['mem_loc'];  
  var initial     = mem_inst[direction][sel_val['node_cap']+1];
  var time        = 0;
	  
  for (j=0; j<(sel_val['mem_cap']); j++){
	hide_animation (j);
	hide_animation_overflow_area (j);
  }		  
  delta            = initial;
  str = "animation_memory_location ("+direction+")";
  setTimeout (str, time);  
  time = time+3000;

  if ((initial!=-1)&&(area)){
	str = "hide_animation ("+direction+")";
	setTimeout (str, time);  
    while (initial!=end){	
	  setTimeout ("animate_direction_area_saturation (delta)", time);
	  str = "hide_animation_overflow_area (delta)";
	  setTimeout (str, time+2000); 
      setTimeout("delta = mem_inst_desb[delta][2]", time+2000);
      time  = time + 2000;
      initial = mem_inst_desb[initial][2];
    }
  }
  str = "last_step_animation_elimination ("+erase+")";
  setTimeout (str, time); 
}

// last step in the animation of the elimination
function last_step_animation_elimination (erase){
  var time = 0;	
  var area = gen_inf['search_area_overflow'];	
  if (area) {
	str = "arrow_show_overflow_area ("+gen_inf['mem_loc']+")";
	setTimeout(str, time);
	time = time + 3000;
	if (erase) {	  	
	  str = "view_table_separate_memory_area (2, false)";
	  setTimeout (str, time);
	  str = "animate_flag_without_saturation_overflow_area ("+gen_inf['mem_loc']+")";
	  time =  time + 500;
	  setTimeout(str, time);
	} else 
	  {
	    str = "animate_flag_with_saturation_overflow_area ("+gen_inf['mem_loc']+")";
	    setTimeout(str, time);
	  }
  } else {
	  if (erase){
		str = "view_table_separate_memory_area (2, false)";
		setTimeout (str, time);
		str = "animation_flag_without_saturation ("+gen_inf['mem_loc']+")";
		time = time + 500;
		setTimeout(str, time);
	  } else 
	    {
		  str = "animation_flag_with_saturation ("+gen_inf['mem_loc']+")";
		  setTimeout (str, time);
	    }
	  }
  time = time + 3000;
  str = "view_sidebar_read_write ()";
  setTimeout (str, time);  
  str = "animation_sidebar_read_write ()";
  setTimeout (str, time);
}

// animation of a memory location
function animation_memory_location (delta){	 
  show_arrow (delta);
}

// animate direction in area of saturation
function animate_direction_area_saturation (delta){
  arrow_show_overflow_area (delta);
}

// last step in the animation of the search
function last_step_animation_search (exist) {
  var time = 0;	
  var area = gen_inf['search_area_overflow'];	
  if (area) {
	str = "arrow_show_overflow_area ("+gen_inf['mem_loc']+")";
	setTimeout(str, time);
	time = time + 3000;
    if (exist) {
      str = "animate_flag_without_saturation_overflow_area ("+gen_inf['mem_loc']+")";
      setTimeout (str, time);	 
    } else 
      {
    	str = "animate_flag_with_saturation_overflow_area ("+gen_inf['mem_loc']+")";
    	setTimeout (str, time);	 
      }
  } else 
    {
      if (exist){
    	str = "animation_flag_without_saturation ("+gen_inf['mem_loc']+")";
    	setTimeout (str, time);	 
       } else 
         {
    	   str = "animation_flag_with_saturation ("+gen_inf['mem_loc']+")";
    	   setTimeout (str, time); 
         }
    }
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
function animation_search_key (direction, exist){
  var area    = gen_inf['search_area_overflow'];
  var initial = memoria[direction][sel_val['node_cap']+1];
  var end     = gen_inf['mem_loc'];  
  var time    = 0;  
	  
  for (j=0; j<(sel_val['mem_cap']); j++){
	hide_animation (j);
	hide_animation_overflow_area (j);
  }	  
  delta = initial;
  str = "animation_memory_location ("+direction+")";
  setTimeout (str, time);
  time = time+3000;  
  if ((initial!=-1)&&(area)){
	str = "hide_animation ("+direction+")";
	setTimeout (str, time);  
	while (initial!=end){	  
      setTimeout ("animate_direction_area_saturation (delta)",time);
      str = "hide_animation_overflow_area (delta)";
      setTimeout (str, time+2000); 
	  setTimeout("delta = memoriadesborde[delta][2]",time+2000);
	  time  = time + 2000;
      initial = memoriadesborde[initial][2];
    }
  }
  str = "last_step_animation_search ("+exist+")";
  setTimeout (str, time); 
}