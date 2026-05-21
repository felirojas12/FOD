// progressive saturation
var mem_inst;
var key_number = 0;
   
sel_val      = selected_val();
sel_val_name = name_selected_values();
gen_inf      = new Array(); 
memoria      = statement_memory();

initializes_memory();

$(function(){   
  view_selected_parameters();  		  
  view_table_memory (1, true);
  view_function_hash (0, 0, true);    
  setTimeout ("initial_flash_memory('#tabla')", 1000);
    
  $('#insertar-clave').click(function() {  
	key = jQuery.trim($('#clavenueva').val());
	$('#clavenueva').focus();
	if ((key.length) > 0){
	  if (key_number < sel_val['keys']) {   		                	
        dir        = hash_function(key);          
        uniqueness = check_unique_key(dir, key, false);
        if (uniqueness){                		     		    
		  saturation = key_insert(dir, key);  		                
		  if (saturation) {  		      
		    insert_key_saturation(dir, key);	     
		  }
		  key_number++;		    
		  view_history_panel (key, dir, 1, saturation, 1);
		  
		  // animation
		  animation_insertion(key, dir, saturation);
            
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
	if ((key.length) > 0) {	  	  
	  $('#clavenueva').focus();	   
	    dir   = hash_function(key);	     	   
		erase = delete_key(dir, key);		  
	    if (erase){
	      key_number--;
	    }	      
	    view_history_panel (key, dir, 1, erase, 2);
	    
		// animation
	    animation_elimination(key, dir, erase);
    } else {alert(constant_key_empty());}
	return false;        
  });

  $('#buscar-clave').click(function() {   
    key = jQuery.trim($('#clavenueva').val());
  	$('#clavenueva').focus();
  	if ((key.length) > 0){               
      dir   = hash_function(key);
      exist = !(check_unique_key(dir, key, true));
      view_history_panel (key, dir, 1, exist, 3);
    
      // animation
      animation_search(key, dir, exist);   
    } else {alert(constant_key_empty());}
  	return false;
  });        
});  