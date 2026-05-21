// find a free position in a memory location
function free_position_memory_location (dir){
  var pos;	
  pos = 1;
  while ((memoria[dir][pos] != '----') && (memoria[dir][pos] != '####')) {
    pos++;	
  }
  return pos; 	
}

// memory location with some free place 
function free_memory_location (dir){
  var free_place
  var col;
  free_place = false;
  col        = 1;  
  while ((col <= sel_val['node_cap']) && (!free_place)){
    if ((memoria[dir][col] == '----') || (memoria[dir][col] == '####')) {
    	free_place = true;	
	} else { col++; }	  
  }
  return (free_place);
}

// memory location to place free unbranded elimination 
function free_memory_location_unbranded_elimination (dir){
  var free_place = false;
  var col;
  col   = 1;  
  while ((col <= sel_val['node_cap']) && (!free_place)){
    if (memoria[dir][col] == '----') {
      free_place = true;	
    } else { col++; }	  
  }
  return (free_place);	
}

// key insert
function key_insert (dir, k){
  sel_val['number_read_partial'] = 1;	
  sel_val['number_read']++;
  if (free_memory_location (dir)){
    var col                         = free_position_memory_location (dir);
    memoria[dir][col]               = k;
    gen_inf['mem_loc']              = dir;
    gen_inf['column']               = col;
    sel_val['number_write_partial'] = 1;
    sel_val['number_write']++;    
    return(false);    
  } else 
    { 
	  return(true);
	} 		
}

// insert a key in saturation
function insert_key_saturation (dir, k){
  var cont = true;
  var col;
  while (cont) {
    dir++;
    sel_val['number_read_partial']++;
    sel_val['number_read']++;
    if (dir == sel_val['mem_cap']){
	  dir = 0;	
	}
	if (free_memory_location (dir)){
	  col = free_position_memory_location (dir);
	  memoria[dir][col]               = k;
	  sel_val['number_write']++;
	  sel_val['number_write_partial'] = 1;
	  cont                            = false;
	}  
  }
  gen_inf['mem_loc'] = dir;
  gen_inf['column']  = col;
  return false;
}

// find a key in a memory location
function search_memory_location_key (dir, clave){
  var i;
  i=1;
  while ((memoria[dir][i] != clave) && (i <= sel_val['node_cap'])){
    i++;
  }
  if (memoria[dir][i] == clave){
    return i;	
  } else {
    return -1;
  }
}

// delete a key 
function delete_key (dir, clave){	
  var erase  = false;
  var cont   = true;
  var origin = dir;
  var column;
  var next_mem_loc;
  sel_val['number_read_partial']  = 0;
  sel_val['number_write_partial'] = 0;
  while(cont){  
	column = search_memory_location_key (dir, clave);
	sel_val['number_read_partial']++;
	sel_val['number_read']++;	
	if (column != -1){       
	  next_mem_loc = dir + 1;
	  if (next_mem_loc == sel_val['mem_cap']){
	    next_mem_loc = 0;  
	  }
	  if ((free_memory_location_unbranded_elimination (dir)) || (empty_memory_location (next_mem_loc))) {
	    memoria[dir][column] = '----';  	  
	  } else { 
		  memoria[dir][column] = '####';
		}	 
	  erase = true;
	  cont  = false;
	  sel_val['number_write_partial'] = 1;
	  sel_val['number_write']++;
	} else {
	    if ((empty_memory_location (dir)) || (free_memory_location_unbranded_elimination(dir))) {
	      cont = false;	
		} else {
		    dir++;
			if (dir == origin){
			  cont = false;
			} else {
			    if (dir == sel_val['mem_cap']){
			      dir = 0;
			    }
			  } 
		  }  
	}		
  }
  gen_inf['mem_loc'] = dir;
  gen_inf['column']  = column;
  return erase;  
}

// empty memory location
function empty_memory_location (dir){
  var empty = true;
  var col   = 1;
  while ((col <= sel_val['node_cap']) && (empty)){
    if (memoria[dir][col] != '----'){
      empty = false;	
    } else { col++; }	  
  }
  return (empty);
}

// verify the existence of a key
function check_unique_key (dir, clave, search){
  var cont   = true;
  var origin = dir;
  var col;
  sel_val['number_read_partial']  = 0;
  sel_val['number_write_partial'] = 0;
  while (cont){
	col = search_memory_location_key (dir, clave);
	if (search) {
	 sel_val['number_read_partial']++;	
	 sel_val['number_read']++;
	}
	if (col == -1){
	  if ((empty_memory_location (dir)) || (free_memory_location_unbranded_elimination (dir))) {
	    cont = false;  	    
	  } else {
		  dir++;
		  if (dir == sel_val['mem_cap']){
		    dir = 0;	  
		  }
		  if (dir == origin){ cont = false; }
	    }
	} else {cont = false;}  
  }
  gen_inf['mem_loc'] = dir;
  gen_inf['column']  = col;
  
  return (col == -1);	
}