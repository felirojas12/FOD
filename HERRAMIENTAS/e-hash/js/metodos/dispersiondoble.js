// search for a key double dispersion
function search_key_double_dispersion (dir, k, off, search){
  var find        = false;
  var cont        = true;
  var new_mem_loc = dir;
  if (search){
    sel_val['number_read_partial']  = 1;
    sel_val['number_write_partial'] = 0;
    sel_val['number_read']++;	  
  }
  while ((!find) && (cont)){
    col = search_memory_location_key (new_mem_loc, k);    
    if (col == -1){
      if (free_memory_location_unbranded_elimination (new_mem_loc)){
        cont = false;        
      } else 
        {
    	  new_mem_loc = (new_mem_loc + off) % sel_val['mem_cap'];
    	  if (search){
    	    sel_val['number_read_partial']++;
    		sel_val['number_read']++;	  
    	  }
    	}      
    } else { find = true; }  
  }
  gen_inf['sat_key'] = (dir != new_mem_loc);
  gen_inf['mem_loc'] = new_mem_loc;
  gen_inf['column']  = col;
  return find;
}

// insert key saturation in double dispersion
function insert_key_saturation_double_dispersion (dir, off, k){
  var cont        = true;
  var new_mem_loc = dir;
  var number_read_partial = 1;
  while (cont) {    
	new_mem_loc = (new_mem_loc + off) % sel_val['mem_cap'];
	number_read_partial++;
	cont = key_insert (new_mem_loc, k);	
  }
  sel_val['number_read_partial'] = number_read_partial;
  return false;
}

// delete key double dispersion
function delete_key_double_dispersion (){
  var mem_loc = gen_inf['mem_loc'];
  var col     = gen_inf['column'];
  if (free_memory_location_unbranded_elimination (mem_loc)) {
    str = '----';  	  
  } else { 
    str = '####';
  }	
  sel_val['number_write_partial'] = 1;
  sel_val['number_write']++;
  memoria[mem_loc][col] = str;
}