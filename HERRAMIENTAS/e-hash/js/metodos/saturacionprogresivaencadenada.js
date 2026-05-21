// verify if the key is intrusive
function intrusive_key (dir){
  new_mem_loc = hash_function (memoria[dir][1]);
  gen_inf['intr_key'] = (dir != new_mem_loc);
  return (dir != new_mem_loc);	
}

// key insert
function key_insert (dir, clave){
  sel_val['number_read_partial'] = 1; 	
  sel_val['number_read']++;	
  if (memoria[dir][1] == '----'){
    memoria[dir][1] = clave;
    sel_val['number_write']++;
    sel_val['number_write_partial'] = 1;    
    return false;
  } else { return true;}
}

// search for a previous memory location
function search_previous_memory_location (dir, k){
  var mem_loc = hash_function (k);
  var cont    = true;  
  gen_inf['mem_loc_initial'] = mem_loc;
  while (cont){
	sel_val['number_read_partial']++; 	
	sel_val['number_read']++;
	if (memoria[mem_loc][2] == dir){
	  cont = false;
	} else 
	  {
	    mem_loc = memoria[mem_loc][2]; 	
	  }		 
  }	
  gen_inf['mem_loc_end'] = mem_loc;
  return mem_loc;	
} 

// find a free memory location
function free_memory_location_search (dir){
  var cont           = true;
  var mem_loc_search = dir;  
  while (cont){
	mem_loc_search++;
	sel_val['number_read_partial']++; 	
	sel_val['number_read']++;	
	if (mem_loc_search == sel_val['mem_cap']){
	  mem_loc_search = 0;
	}
	if (memoria[mem_loc_search][1] == '----'){
      cont =  false;
	}	 
  }	
  return mem_loc_search;  		
}

//insert a key in saturation
function insert_key_saturation (dir, clave){
  var new_dir         = free_memory_location_search (dir);
  memoria[new_dir][1] = clave;  
  var prev_dir        = memoria[dir][2];
  memoria[dir][2]     = new_dir;
  sel_val['number_write']++;
  memoria[new_dir][2] = prev_dir;
  sel_val['number_write']++;
  gen_inf['mem_loc']  = new_dir;
  sel_val['number_write_partial'] = 2;  
  return false;
}

// insert a key in key saturation in the presence of intrusive
function insert_key_saturation_intrusive (dir, clave){
  intr_key             = memoria[dir][1];
  intr_link            = memoria[dir][2];  
  var prev_dir         = search_previous_memory_location (dir, intr_key);
  var new_dir          = free_memory_location_search (dir);
  memoria[new_dir][1]  = intr_key;
  memoria[new_dir][2]  = intr_link;
  sel_val['number_write']++;
  memoria[prev_dir][2] = new_dir;
  sel_val['number_write']++;
  memoria[dir][1]      = clave;
  memoria[dir][2]      = -1;
  sel_val['number_write']++;
  sel_val['number_write_partial'] = 3;
  gen_inf['mem_loc']   = new_dir;
  return false;
}

// search for a key chain following synonyms
function search_key (dir, clave, search){
  sel_val['number_write_partial'] = 0;	
  if (search) {	
    sel_val['number_read_partial'] = 1; 	
    sel_val['number_read']++;
  }  
  while ((memoria[dir][1] != clave) && (memoria[dir][2] != -1)){
    dir = memoria[dir][2];
    if (search) {
      sel_val['number_read_partial']++; 	
      sel_val['number_read']++;
    }
  }	
  gen_inf['mem_loc']  = dir;
  gen_inf['intr_key'] = false;
  return (memoria[dir][1] == clave);
}

// delete a key
function delete_key (dir, k){
  gen_inf['intr_key']      = false;	
  gen_inf['exist_chained'] = false;
  exist                    = search_key (dir, k, true);
  if (exist){
	mem_loc_key = gen_inf['mem_loc'];    
    if (dir != mem_loc_key){
      prev_dir             = search_previous_memory_location (mem_loc_key, k);
      memoria[prev_dir][2] = memoria[mem_loc_key][2];
      sel_val['number_write']++;
      sel_val['number_write_partial']++;
    } else {  
	       if (memoria[dir][2] != -1){	    	   
	    	 mem_loc_key     = memoria[dir][2];  
		     memoria[dir][1] = memoria[mem_loc_key][1];
		     memoria[dir][2] = memoria[mem_loc_key][2];
		     sel_val['number_read_partial']++; 	
		     sel_val['number_read']++;
		     sel_val['number_write']++;
		     sel_val['number_write_partial']++;
		     gen_inf['exist_chained'] = true; 
	       }
	}    
    memoria[mem_loc_key][2] = -1;	
    memoria[mem_loc_key][1] = '----';
    sel_val['number_write']++;
    sel_val['number_write_partial']++;
    return true;	 
  } else {return false;}
}