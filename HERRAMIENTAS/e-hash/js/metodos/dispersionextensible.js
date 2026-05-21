// key insert
function key_insert(str_b, c, num_node, new_node){
  var sat = false;
  var pos_tabla = 0;
  var dir = 0;
  if (valor_asoc == 0) {  
    pos = free_memory_location (0);      
  } else {
	  cad_bits = str_b.substring((str_b.length-valor_asoc) ,str_b.length);
	  pos_tabla = search_position_string_bits (cad_bits);
	  dir = tabla[pos_tabla][1];
	  pos = free_memory_location (dir);
  }
  if (pos != -1) {
    memoria[dir][pos] = c;
  } else { sat = true; }
  
  // general store information
  
  num_key++;
  index = 'copy_node_'+num_sat+'_'+num_node+'_'+num_key;
  
  cop_nod[index] = memory_location_copy (num_node);
  index = 'copy_node_'+num_sat+'_'+new_node+'_'+num_key;
  
  cop_nod[index] = memory_location_copy (new_node);	  
  
  index = 'table_pos_'+num_sat+'_'+num_key;
  
  gen_inf[index] = pos_tabla;
  index = 'mem_loc_'+num_sat+'_'+num_key;
  
  gen_inf[index] = dir;
  
  index = 'dispersed_keys_'+num_sat+'_'+num_key;
  dispersed_keys[index] = c;
  
  index = 'cell_keys_'+num_sat+'_'+num_key;
  dispersed_keys[index] = pos;
  // end to store general information 
  //if (num_sat > 0){ imprimir_prueba (num_node, new_node);}
  return sat;
}

// free space in memory location
function free_memory_location (d){
  var i = 2;
  while ((i<=sel_val['node_cap']) && (memoria[d][i]!= '----')) {
    i++;  
  } 
  if (memoria[d][i] == '----') {
    return i;	  
  } else {return -1}	
}

// generates a new node
function generate_node (d){
  dir_nueva = sel_val['mem_cap'];
  memoria[dir_nueva] = new Array();
  memoria[dir_nueva][0] = dir_nueva; 
  memoria[dir_nueva][1] = memoria[d][1];
  for(i=2; i<(sel_val['node_cap']+2); i++){
    memoria[dir_nueva][i] = '----'; 			
  }
  sel_val['mem_cap']++;
  return dir_nueva;
}

// key insert saturation
function key_insert_saturation (strb, c){
  var pos_tabla = 0;
  var dir = 0;
  
  // variables for general information
  num_sat++;
  num_key = 0;  
  // end variables for general information
  
  if (valor_asoc != 0) { 
 	cad_bits = strb.substring((strb.length-valor_asoc) ,strb.length);
	pos_tabla = search_position_string_bits (cad_bits);
	dir = tabla[pos_tabla][1];  
  } 
  copy_dir_conflict[num_sat] = dir;
  memoria[dir][1]++;
  dir_nd = generate_node (dir);
  
  // general store information
  index = 'new_node_'+num_sat;
  cop_new_nod[index] = memory_location_copy (dir_nd);
  // end general store information 
  
  if (valor_asoc < memoria[dir][1]){
    valor_asoc++;
    dist = pos_tabla+sel_val['tab_dim'];
    duplicate_table();
    bits_assigned_table();    
    tabla[dist][1] = dir_nd;         
  } else {
	  tabla[pos_tabla][1] = dir_nd; 	  
	}
  
  /* copia la tabla antes de redispersar y guarda las longitudes de los arreglos */
  copy_val_asoc[num_sat] = valor_asoc;
  
  copy_table[num_sat] = new Array();
  copy_table[num_sat] = copy_of_the_table();
  length_copy[num_sat] = new Array;
  
  length_copy[num_sat][0] = sel_val['tab_dim'];
  length_copy[num_sat][1] = sel_val['mem_cap'];
  
  key_redispersed (c, strb, dir, dir_nd);
}

// search for a string of bits 
function search_position_string_bits (cb){
  ind = 0;
  while (tabla[ind][0] != cb) {
    ind++;	  
  }
  return ind;
}

// duplicate table
function duplicate_table(){
  var new_dim_table = sel_val['tab_dim']*2;
  if (new_dim_table == 2){
    tabla[sel_val['tab_dim']] = new Array();
	tabla[sel_val['tab_dim']][1] = 1;
  } else {
      for(i=sel_val['tab_dim']; i<(new_dim_table); i++){
        tabla[i] = new Array();
        tabla[i][1] = tabla[i-sel_val['tab_dim']][1];
      }
    }
  sel_val['tab_dim'] = new_dim_table;	
}

// reassign the access bits
function bits_assigned_table (){
  mitad = sel_val['tab_dim'] / 2;
  for(i=0; i<(sel_val['tab_dim']); i++){
	str = ''; 
    if ((i<mitad)&&(mitad >= 2)){
      str = str + '0';
      str = str + tabla[i][0];
    } else{    
        str = str + (i).toString(2);
      }
    tabla[i][0] = str;
  }  
}

// key redispersed
function key_redispersed (clc, strb, dc, nnd){
  upp_limit = sel_val['node_cap']+2; 
  for (j=2; j<upp_limit; j++){	  
	cl = memoria[dc][j];

	if (isNaN(cl)){
	  add_cl = add_ascii_values (cl);
	} else {add_cl = parseInt(cl);}
	
	b = (add_cl).toString(2);
	memoria[dc][j] = '----';
	
	sat = key_insert (b, cl, dc, nnd);
	/*
	if (sat){
	  alert('nunca va a entrar??');	
	  key_insert_saturation (b, cl);	  
	}*/
  }
  sat = key_insert (strb, clc, dc, nnd);
  
  /* copia de la memoria después de redispersar */  
  copy_memory[num_sat] = new Array();
  copy_memory[num_sat] = copy_of_the_memory();
  if (sat){
    key_insert_saturation (strb, clc);    
  }
}

// search of a key
function search (sb, clv){
  cad_bits = sb.substring((sb.length-valor_asoc) ,sb.length);
  pos_tabla = search_position_string_bits (cad_bits);
  dir = tabla[pos_tabla][1];
  gen_inf['table_pos'] = pos_tabla;    
  gen_inf['mem_loc']   = dir;
  exist = search_memory_location_key (dir, clv);
  return exist;	
}

// search for a key in a memory location
function search_memory_location_key (d, cl){
  var i = 2;
  while ((i < (sel_val['node_cap']+2)) && (memoria[d][i] != cl)) {
    i++;	  
  }
  return (memoria[d][i] == cl);
}

// delete key
function delete_key (sb, clv){
  cad_bits = sb.substring((sb.length-valor_asoc) ,sb.length);
  pos_tabla = search_position_string_bits (cad_bits);
  dir = tabla[pos_tabla][1];
  gen_inf['table_pos'] = pos_tabla;    
  gen_inf['mem_loc']   = dir;
  eliminating (dir, clv);  
}

// removes a key from a memory location
function eliminating (dr, cl){
  var i = 2;
  while ((i < (sel_val['node_cap']+2)) && (memoria[dr][i] != cl)) {
    i++;	  
  }
  memoria[dr][i] = '----';
}

