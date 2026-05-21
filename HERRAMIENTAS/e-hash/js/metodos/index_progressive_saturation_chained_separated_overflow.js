var memoriadesborde;
var mem_inst;
var mem_inst_desb;
var key_number;
  
sel_val        = selected_val();
sel_val_name   = name_selected_values ();
gen_inf        = new Array();  

//area overflow capacity
total_capacity = sel_val['mem_cap']*sel_val['node_cap'];
probability    = 0;
for (i=sel_val['node_cap']; i<5; i++){
  probability  = probability + (i*p((i+1), total_capacity, sel_val['keys'])); 
}    
gen_inf['sep_mem_cap']  = Math.ceil(probability*total_capacity);          
memoria                 = statement_memory();  
memoriadesborde         = declaration_separate_memory_area ();  
mem_inst                = statement_memory();
mem_inst_desb           = statement_memory_saturation ();    
gen_inf['free_mem_loc'] = 0;  
key_number              = 0;
    
// both areas are initialized memory
initialize_memory_progressive_saturation_chained ();
initialize_separate_overflow_area ();

$(function(){
  view_selected_parameters();
  view_table_separate_memory_area (2, true);    
  view_function_hash (0, 0, true);
  setTimeout ("initial_flash_memory ('#tabla')", 1000);
  
  $('#insertar-clave').click(function() {
    valid_op = true;
    key = jQuery.trim($('#clavenueva').val());
    $('#clavenueva').focus();
    if (key.length > 0) {
      if (key_number < sel_val['keys']) { 	  
  	    dir   = hash_function (key);
  		exist = search_key (dir, key, false);  		  
  		if (!exist){
  	      saturation = key_insert (dir, key);
          if (saturation) {
            if (gen_inf['free_mem_loc'] < gen_inf['sep_mem_cap']){   
              insert_key_saturation (dir, key);
              gen_inf['free_mem_loc']++;
            } else 
              {
                valid_op = false;
                alert(area_saturation_completes());
              }              
  		  }
  		  if (valid_op){
  		    key_number++;
  		    view_history_panel(key, dir, 3, saturation, 1);
  		      
  		    // animation
  	  		animation_insertion (key, dir, saturation);
  		  } 
  		} else { 
  		        // animation
 	            animation_existence_key ();  	  		     
  		       }         
  	  } else {alert(constant_limit_keys());}  
  	} else {alert(constant_key_empty());}
    return false;
  });   

  $('#eliminar-clave').click(function() {
    key = jQuery.trim($('#clavenueva').val());
  	$('#clavenueva').focus();
  	if (key.length > 0) {      	  
        dir = hash_function (key);
  		instance_memory_copy (2);   
  		copy_overflow_area_separate_instance ();
  		erase = delete_key (dir, key); 
        if (erase){
          key_number--;
        }
        view_history_panel(key, dir, 3, erase, 2);

        // animation
        animation_elimination (key, dir, erase);
    } else {alert(constant_key_empty());}
    return false;
  });   

  $('#buscar-clave').click(function() {
    key = jQuery.trim($('#clavenueva').val());
    $('#clavenueva').focus();
    if (key.length > 0) {
      dir   = hash_function (key);        
      exist = search_key (dir, key, true);
      view_history_panel(key, dir, 3, exist, 3);
        
      // animation
      animation_search (key, dir, exist); 
        
    } else {alert(constant_key_empty());}
      
    return false;
  });    
});  