// progressive chained saturation
var mem_inst;
var key_number = 0;
  
sel_val      = selected_val();
sel_val_name = name_selected_values ();
memoria      = statement_memory();
gen_inf      = new Array();    
mem_inst     = statement_memory();    

initialize_memory_progressive_saturation_chained ();

$(function(){
  view_selected_parameters();		     
  view_table_memory(2, true);
  view_function_hash(0, 0, true);
  setTimeout("initial_flash_memory('#tabla')", 500);
  
  $('#insertar-clave').click(function(){
	key = jQuery.trim($('#clavenueva').val());
	$('#clavenueva').focus();
    if (key_number < sel_val['keys']) {
      if (key.length > 0) {  
		dir = hash_function (key);
		exist = search_key (dir, key, false);
		if (!exist){  
		  saturation = key_insert (dir, key);
	      if (saturation){   
		    intrusive = intrusive_key (dir);  
			if (intrusive){
			  insert_key_saturation_intrusive (dir, key); 	
			} else { insert_key_saturation (dir, key); }
		  }
	      key_number++;
	      
	      view_history_panel(key, dir, 2, saturation, 1);

	      // animation
	      animation_insertion (key, dir, saturation)
	         
		} else 
		      { 
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
		erase = delete_key (dir, key);
		if (erase){
		  key_number--;
		}		
		view_history_panel(key, dir, 2, erase, 2);

		// animation
		animation_elimination (key, dir, erase);
	} else {alert(constant_key_empty());}
	return false;
  });

  $('#buscar-clave').click(function() {
    key = jQuery.trim($('#clavenueva').val());
    $('#clavenueva').focus();  
    if (key.length > 0) { 
	  dir = hash_function (key);
	  exist = search_key (dir, key, true);
	  view_history_panel(key, dir, 2, exist, 3);
	    
	  // animation
      animation_search (key, dir, exist)
	   		            
    } else {alert(constant_key_empty());}
    return false;   
  });        	
});