var mem_inst;
var key_number;
   
gen_inf      = new Array();
sel_val      = selected_val();
sel_val_name = name_selected_values (); 
memoria      = statement_memory (); 
mem_inst     = statement_memory ();  
key_number   = 0;
initializes_memory ();

$(function(){
  view_selected_parameters();
  view_table_memory (1, true);
  view_function_hash (0, 0, true);
  setTimeout ("initial_flash_memory('#tabla')", 500);
        
  $('#insertar-clave').click(function() {
	key = jQuery.trim($('#clavenueva').val());
    $('#clavenueva').focus();
    if ((key.length) > 0){
      if (key_number < sel_val['keys']) {      
		dir    = hash_function (key);
		offset = second_hash_function (key);
		exist  = search_key_double_dispersion (dir, key, offset, false);
        if (!exist){              
          saturation = key_insert (dir, key);
          //instance_memory_copy (1);
		  if (saturation){    			            
		    insert_key_saturation_double_dispersion (dir, offset, key);
	 	  }	
		  key_number++;
		  view_history_panel (key, dir, 4, saturation, 1);

          // animation	    
		  animation_insertion (key, dir, saturation);
		    	   
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
    if ((key.length) > 0){
      //if (key_number > 0) {      
		dir    = hash_function (key);
		offset = second_hash_function (key);
		exist  = search_key_double_dispersion (dir, key, offset, true);
		if (exist){  			          
		  delete_key_double_dispersion ();
		  key_number--;
		}
		view_history_panel (key, dir, 4, exist, 2);

		// animation
        animation_elimination (key, dir, exist); 
      //} else {alert(str_tabla_vacia);}		
	} else {alert(constant_key_empty());}
	return false;
  });
    
  $('#buscar-clave').click(function() {
    $('#clavenueva').focus();  
    key = jQuery.trim($('#clavenueva').val());
    if ((key.length) > 0){
      dir    = hash_function (key);
	  offset = second_hash_function (key);
      exist  = search_key_double_dispersion (dir, key, offset, true);
      view_history_panel (key, dir, 4, exist, 3);

      // animation	
      animation_search (key, dir, exist);
    } else {alert(constant_key_empty());}
    return false;
  });    
});