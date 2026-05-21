// initial flash memory 
function initial_flash_memory (str){
  $(function(){ 
    //var str='#tabla';
	$(str).effect("pulsate",{times:3},400);
	$(str).delay(6000);
  });
}

//animation sidebar read write
function animation_sidebar_read_write (){
  $('#sidebar_read').effect("pulsate",{times:3},500);
  $('#sidebar_write').effect("pulsate",{times:3},500);
  $('#sidebar_read_partial').effect("pulsate",{times:3},500);
  $('#sidebar_write_partial').effect("pulsate",{times:3},500);
  
  // To conceal the bar of progress
  setTimeout("show_bar_progress(false)", 2600);
  
}

//animation function
function animation_function (){
  // To show the bar of progress  
  setTimeout("show_bar_progress(true)", 0);  
  $('#funcion_animacion').effect("pulsate",{times:3},500);
}

// animation existence of key
function animation_existence_key (){
  if (gen_inf['search_area_overflow']) {
    var index = '#filaDesb'+gen_inf['mem_loc'];
  } else 
    {
      var index = '#fila'+gen_inf['mem_loc'];
    }
  $(index).effect("pulsate",{times:3},500);
}