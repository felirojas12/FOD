function initial_validation (){
  var val = true;
  var tipo_disp = $('input:radio[name=tipodispersion]:checked').val(); 
  if (tipo_disp == 1) {
    if (($('#funcion').val() == -1) || (($('#funcion').val() == 3) && ($('#base').val() == -1))) {
      val = false;      
    } else {     	
        if ((($('#capacidadmemoria').val() == -1) && ($('#densidad').val() == -1)) || ((($('#capacidadcubeta').val() == -1) && ($('#tecnica').val() != 2)) || ($('#cantidadclaves').val() == -1))){
	      val = false;  	  
	    } else {
		    if (($('#tecnica').val() == -1) || (($('#tecnica').val() == 4) && ($('#primo').val() == -1))) {
		      val = false;
		    }   
	    }  
    }
  } else {	  
	  if (($('#capacidadcubeta').val() == -1) || ($('#cantidadclaves').val() == -1)){		  
	    val = false;
	  }
  }  
  return val;
}

function enable_simulation(){
  var valid = initial_validation();
  if (valid) {
    $('#menu5').attr('style', '');    
  } else {
	$('#menu5').attr('style', 'color: gray; cursor: help; text-decoration: line-through');
  }	
}

function reset_operation(){
  var disp_type = $('input:radio[name=tipodispersion]:checked').val();	
  var valid = (($('#funcion').val() != -1) || ($('#base').val() != -1) || ($('#capacidadmemoria').val() != -1) || ($('#densidad').val() != -1) || ($('#capacidadcubeta').val() != -1) || ($('#cantidadclaves').val() != -1) || ($('#tecnica').val() != -1) || ($('#primo').val() != -1) || (disp_type == 1) || (disp_type == 2));
  return valid;	
}

function validate_memory_space (){
  var valid = true;
  var num_mem_loc   = parseInt($('#capacidadmemoria').val());
  var cap_mem_loc   = parseInt($('#capacidadcubeta').val());
  var num_keys_disp = parseInt($('#cantidadclaves').val());
  var technique     = parseInt($('#tecnica').val());
  if ((num_mem_loc != -1) && (cap_mem_loc != -1) && (num_keys_disp != -1) /*&& (technique != 2)*/) {
    valid = ((num_mem_loc * cap_mem_loc) >= num_keys_disp);
  } /*else 
    {	  
	  if ((technique == 2) && (cap_mem_loc == -1)){
        valid = (num_mem_loc >= num_keys_disp);
        alert('entre2: '+ valid);
	  }	     
    }
    */   
  return valid;	
}
