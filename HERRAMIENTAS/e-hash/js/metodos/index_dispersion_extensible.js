sel_val = selected_val_din();
sel_val_name = name_selected_values ();

var gen_inf           = new Array();
var cop_nod           = new Array();
var cop_new_nod       = new Array();
var dispersed_keys    = new Array();
var copy_table        = new Array();
var copy_memory       = new Array();
var length_copy       = new Array();
var copy_dir_conflict = new Array();
var copy_val_asoc     = new Array();
      
var num_sat;
var num_key;
var quantity_keys = 0;    
  
//Matriz que representa la tabla de memoria asociada al método
var tabla;
tabla = declarar_tabla(sel_val['tab_dim']);

//Valor asociado a la tabla de memoria
var valor_asoc   = 0;
copy_val_asoc[0] = valor_asoc; 
  
var memoria;
memoria = statement_memory();

// Se incializa la tabla de memoria
inicializar_tabla(tabla);
inicializar_memoria_dispersion_extensible(memoria, sel_val['node_cap']);
  
  $(function(){
	view_selected_parameters();  
	view_function_hash (0, 0, true);
	view_table_extensible_dispersion(tabla, sel_val['tab_dim'], valor_asoc, true);
	view_memory_extensible_dispersion(memoria, sel_val['mem_cap'], sel_val['node_cap'], 2, sel_val['tab_dim'], true);
	setTimeout ("initial_flash_memory('#tabla_ext')", 500); 
	setTimeout ("initial_flash_memory('#mem_ext')", 500);
	
    $('#insertar-clave').click(function() {  
      $('#clavenueva').focus();
      key = jQuery.trim($('#clavenueva').val());
      if ((key.length) > 0){
    	if (quantity_keys < sel_val['keys']) {    	  	
    	  	 
          str_bin = hash_function (key);
          
          exist = search (str_bin, key);
          if (!exist){  
        	quantity_keys++;  
            num_sat = 0;
            num_key = 0;          
            saturation = key_insert (str_bin, key, 0, 0);
            if (saturation) {                                              
              key_insert_saturation (str_bin, key);        
            }
            view_history_panel (key, 0, 5, saturation, 1);  
            animation_extensible_dispersion(key, str_bin, saturation);
          } else {existence_key(str_bin, key);}
    	} else {alert(constant_limit_keys());}                       
      } else {alert(constant_key_empty());}
            
      return false;    
    });

    $('#eliminar-clave').click(function() {
      $('#clavenueva').focus();
      key = jQuery.trim($('#clavenueva').val());
      if ((key.length) > 0){
        str_bin = hash_function (key);
        exist = search (str_bin, key);
        if (exist){
          quantity_keys--;  
          delete_key (str_bin, key);
        }
        view_history_panel (key, 0, 5, exist, 2);
        animation_elimination(str_bin, key, exist);
      } else {alert(constant_key_empty());}     
      
	  return false;
    });
    
    $('#buscar-clave').click(function() {
      $('#clavenueva').focus();
      key = jQuery.trim($('#clavenueva').val());
      if ((key.length) > 0){
        str_bin = hash_function (key);
        exist = search (str_bin, key);
        view_history_panel (key, 0, 5, exist, 3);
        animation_search_key(str_bin, key, exist);            
      } else {alert(constant_key_empty());}
       
      return false;
    });    
  });  