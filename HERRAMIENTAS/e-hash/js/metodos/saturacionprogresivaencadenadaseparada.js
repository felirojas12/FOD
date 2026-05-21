// search of a key
function search_key (dir, k, search){
  gen_inf['search_area_overflow'] = false;	
  exist                           = search_key_memory_location (dir, k);
  sel_val['number_read_partial']  = 1;	
  sel_val['number_write_partial'] = 0;
  sel_val['number_read']++;
  if (!(exist)){
	if (memoria[dir][sel_val['node_cap']+1] != -1){  
      exist = search_key_overflow_area (memoria[dir][sel_val['node_cap']+1], k, search);
      gen_inf['search_area_overflow'] = true;
	}
  }  
  return (exist);
}

// memory location to place free 
function free_memory_location (dir){
  var free_place = false;	 
  col            = 1;  
  while ((col < (sel_val['node_cap']+1)) && (!free_place)){
    if (memoria[dir][col] == '----') {
      free_place = true;	
    } else { col++; }	  
  }
  return (free_place);
}

// search for a free position in a memory location
function search_position_free_memory_location (dir){
  pos = 1;
  while (memoria[dir][pos] != '----') {
    pos++;	
  }
  return pos;
}

// key insert
function key_insert (dir, k){
  if (free_memory_location (dir)){
    col = search_position_free_memory_location (dir);
    memoria[dir][col]               = k;
    sel_val['number_write_partial'] = 1;
    gen_inf['mem_loc']              = dir;
    sel_val['number_write']++;
    return(false);    
  } else { return(true); } 		
}

// insert a key in saturation
function insert_key_saturation (dir, k){
  memoriadesborde[gen_inf['free_mem_loc']][2] = memoria[dir][sel_val['node_cap']+1];  
  memoria[dir][sel_val['node_cap']+1]         = gen_inf['free_mem_loc'];  
  memoriadesborde[gen_inf['free_mem_loc']][1] = k;  
  sel_val['number_read_partial']++;	
  sel_val['number_read']++;	
  sel_val['number_write_partial'] = 2;
  sel_val['number_write']         = sel_val['number_write'] + 2;
  gen_inf['mem_loc']              = gen_inf['free_mem_loc'];
}

// search for a key in a memory location
function search_key_memory_location (dir, k){
  col = 1;
  while ((memoria[dir][col] != k) && (col < (sel_val['node_cap']+1))){
    col++;
  }
  gen_inf['mem_loc'] = dir;
  gen_inf['column']  = col;
  
  return (memoria[dir][col] == k);
}

// search for a key in the overflow area
function search_key_overflow_area (dir, k, search){
  while ((memoriadesborde[dir][1] != k) && (memoriadesborde[dir][2] != -1)) {
	if (search) {  
	  sel_val['number_read_partial']++;	
	  sel_val['number_read']++;
	}
    dir = memoriadesborde[dir][2];    
  }
  gen_inf['mem_loc'] = dir;
  
  return (memoriadesborde[dir][1] == k);
}

// delete the first key in the overflow area
function delete_first_key_overflow_area (dir){
  d                                   = gen_inf['mem_loc'];	
  memoriadesborde[d][1]               = '----';
  memoria[dir][sel_val['node_cap']+1] = memoriadesborde[d][2];
  memoriadesborde[d][2]               = -1;
}

// search for a previous memory location
function search_previous_memory_location (){
  mem_loc = gen_inf['mem_loc'];
  while (gen_inf['mem_loc'] != memoriadesborde[mem_loc][2]){
    mem_loc++;	
  }
  return mem_loc;  	
}

// delete a key from memory overflow
function delete_key_memory_overflow (){
  d                                = gen_inf['mem_loc'];	
  mem_loc_prev                     = search_previous_memory_location (); 
  memoriadesborde[mem_loc_prev][2] = memoriadesborde[d][2];
  memoriadesborde[d][1]            = '----';
  memoriadesborde[d][2]            = -1;
}

// delete a key
function delete_key (dir, k){
  var erase = false;
  gen_inf['search_area_overflow'] = false;
  var exist                       = search_key_memory_location (dir, k);
  sel_val['number_read_partial']  = 1;
  sel_val['number_write_partial'] = 0;
  sel_val['number_read']++;	
  if (exist){
	var col                         = gen_inf['column'];  
	memoria[dir][col]               = '----';
	erase                           = true;
	sel_val['number_write_partial'] = 1;
	sel_val['number_write']++;
	gen_inf['mem_loc']              = dir;	
  } else {
	  exist = false;
	  if (memoria[dir][sel_val['node_cap']+1] != -1){
		sel_val['number_read_partial']++;	
		sel_val['number_read']++;	  
	    exist = search_key_overflow_area (memoria[dir][sel_val['node_cap']+1], k, true);
	    gen_inf['search_area_overflow'] = true;
	  }	  
	  if (exist){
	    erase = true;
	    if (gen_inf['mem_loc'] == memoria[dir][sel_val['node_cap']+1]){
	      delete_first_key_overflow_area (dir);
		} else {
			delete_key_memory_overflow ();
		  }
	    sel_val['number_write_partial'] = 2;
		sel_val['number_write']         = sel_val['number_write'] + 2;
	  }   
    }
  return erase;  
}