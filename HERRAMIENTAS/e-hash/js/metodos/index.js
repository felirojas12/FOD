$(function(){
      var operating  = false;
      var simulating = false;
      var disp_type  = false;
      var sel_val;
      var sel_val_name;
      var gen_inf;      
      var memoria;
       
      $("#sidebar_parameters").draggable();
      $("#sidebar_function").draggable();
      $("#sidebar_virtual_keyboard").draggable();
      $("#sidebar_menu_operation").draggable();
      
      $('#tab1').hide();  
      $('#tab2').hide();
      $('#tab3').hide();
      $('#tab4').hide();
      $('#sidebar_function').hide();
      $('#tab6').hide();
      $('#sidebar_menu_operation').hide();
      $('#sidebar_historial').hide();
      $('#sidebar_parameters').hide();
      $('#sidebar_virtual_keyboard').hide();
      $('#sidebar_virtual_keyboard').load('virtual-keyboard.html');
      
      $('#funcion').val("-1");
      $('#base').val("-1");
      $('#capacidadmemoria').val("-1");
      $('#densidad').val("-1");
      $('#capacidadcubeta').val("-1");
      $('#cantidadclaves').val("-1");
      $('#tecnica').val("-1");
      $('#primo').val("-1");
      $('#tipodispersionest').attr('checked',false);
      $('#tipodispersiondin').attr('checked',false);

      $('#item0').attr('class', 'tab_selected');      
      $('#menu1').attr('style', 'color: gray; cursor: help; text-decoration: line-through');    
  	  $('#menu2').attr('style', 'color: gray; cursor: help; text-decoration: line-through');
  	  $('#menu3').attr('style', 'color: gray; cursor: help; text-decoration: line-through');    
	  $('#menu4').attr('style', 'color: gray; cursor: help; text-decoration: line-through');
	  $('#menu5').attr('style', 'color: gray; cursor: help; text-decoration: line-through');

	  panel_reset();

	  $('#begin_operation').click(function(){
		var ro = reset_operation();
		operating = true;
		if (ro){
		  $("#operation_restart_dialog").dialog( "open" );	 
		} else {		
    	    $('#menu1').attr('style', '');
    	    $('#item1').attr('class', 'tab_selected');    	
            $('#menu1').click();
		  }
		return false;  	 	  
      });     

      $('#menu0').click(function() {
        if (!simulating) {            
    	  $('#item1').attr('class', '');
      	  $('#item2').attr('class', '');
          $('#item3').attr('class', '');
          $('#item4').attr('class', '');
          $('#item5').attr('class', '');        
          $('#item0').attr('class', 'tab_selected');
      	   
          $('#tab1').hide('slow');
          $('#tab2').hide('slow');
          $('#tab3').hide('slow');
          $('#tab4').hide('slow');
          $('#sidebar_function').hide('slow');
          $('#tab6').hide('slow');        
          $('#sidebar_menu_operation').hide('slow');
          $('#sidebar_parameters').hide('slow');
          $('#sidebar_historial').hide('slow'); 
          $('#tab0').show('slow');
        }   
      });

      $('#menu1').click(function() {
        if ((operating) && (!simulating)){  
      	  $('#item0').attr('class', '');
          $('#item2').attr('class', '');
          $('#item3').attr('class', '');
          $('#item4').attr('class', '');
          $('#item5').attr('class', '');        
          $('#item1').attr('class', 'tab_selected');
        	   
          $('#tab0').hide('slow');
          $('#tab2').hide('slow');
          $('#tab3').hide('slow');
          $('#tab4').hide('slow');
          $('#sidebar_function').hide('slow');
          $('#tab6').hide('slow');        
          $('#sidebar_menu_operation').hide('slow');
          $('#sidebar_parameters').hide('slow');
          $('#sidebar_historial').hide('slow'); 
          $('#tab1').show('slow');
        } 
      });
      
      $('#menu2').click(function() {
    	if ((operating) && (!simulating) && (disp_type)){    
    	  var tipo_disp = $('input:radio[name=tipodispersion]:checked').val();
    	  if (tipo_disp != 2){    
    	    $('#item0').attr('class', '');          
    	    $('#item1').attr('class', '');
      	    $('#item3').attr('class', '');
      	    $('#item4').attr('class', '');
      	    $('#item5').attr('class', '');
      	    $('#item2').attr('class', 'tab_selected');
    	   
      	    $('#tab0').hide('slow');
      	    $('#tab1').hide('slow');
            $('#tab3').hide('slow');
            $('#tab4').hide('slow'); 
            $('#sidebar_function').hide('slow');
            $('#tab6').hide('slow');
            $('#sidebar_menu_operation').hide('slow');
            $('#sidebar_historial').hide('slow');
            $('#sidebar_parameters').hide('slow');
            $('#tab2').show('slow');
    	  }
    	}   
      });

      $('#menu3').click(function() {
    	if ((operating) && (!simulating) && (disp_type)){  
    	  $('#item0').attr('class', '');  
    	  $('#item1').attr('class', '');
          $('#item2').attr('class', '');
          $('#item4').attr('class', '');        	
          $('#item5').attr('class', '');
      	  $('#item3').attr('class', 'tab_selected');
      	  
      	  $('#tab0').hide('slow');
    	  $('#tab1').hide('slow');
          $('#tab2').hide('slow');
          $('#tab4').hide('slow');
          $('#sidebar_function').hide('slow');
          $('#tab6').hide('slow');
          $('#sidebar_menu_operation').hide('slow');
          $('#sidebar_historial').hide('slow');
          $('#sidebar_parameters').hide('slow');
          $('#tab3').show('slow');
    	}       
      });

      $('#menu4').click(function() {
    	if ((operating) && (!simulating) && (disp_type)){    
    	  var tipo_disp = $('input:radio[name=tipodispersion]:checked').val();
      	  if (tipo_disp != 2){  
    	    $('#item0').attr('class', '');  
    	    $('#item1').attr('class', '');
            $('#item2').attr('class', '');
            $('#item3').attr('class', '');        	
            $('#item5').attr('class', '');
            $('#item4').attr('class', 'tab_selected');
          
            $('#tab0').hide('slow');
      	    $('#tab1').hide('slow');
            $('#tab2').hide('slow');
            $('#tab3').hide('slow');
            $('#sidebar_function').hide('slow');
            $('#tab6').hide('slow');
            $('#sidebar_menu_operation').hide('slow');
            $('#sidebar_historial').hide('slow');
            $('#sidebar_parameters').hide('slow');
            $('#tab4').show('slow');
      	  }
    	}         
      });

      $('#menu5').click(function() {
        if (!simulating){  
          var valid;  
    	  valid = initial_validation();
    	  if (valid) {
    	    simulating = true;    	    
                                   	  
            //$('#item0').attr('class', '');
      	    //$('#item1').attr('class', '');
            //$('#item2').attr('class', '');
            //$('#item3').attr('class', '');
            //$('#item4').attr('class', '');        	
            //$('#item5').attr('class', 'tab_selected');
          
            $('#header').hide('slow');
            $('#tab0').hide('slow');
            $('#tab1').hide('slow');
            $('#tab2').hide('slow');
            $('#tab3').hide('slow');
            $('#tab4').hide('slow');

            $('#container_progress').hide();
            $('#sidebar_function').show('slow');
            $('#tab6').show('slow');
            $('#sidebar_menu_operation').show('slow');
            $('#sidebar_historial').show('slow');
            $('#sidebar_parameters').show('slow');
            $('#clavenueva').val("");
            $('#clavenueva').focus();

            //$('#menu0').attr('style', 'color: gray; cursor: help; text-decoration: line-through');
            //$('#menu1').attr('style', 'color: gray; cursor: help; text-decoration: line-through');    
      	    //$('#menu2').attr('style', 'color: gray; cursor: help; text-decoration: line-through');
      	    //$('#menu3').attr('style', 'color: gray; cursor: help; text-decoration: line-through');    
    	    //$('#menu4').attr('style', 'color: gray; cursor: help; text-decoration: line-through');    	  
       
            // page loads
            
            var page_tech;            
            page_tech = '';          
            switch ($('#tecnica').val()){
		      case "1": page_tech = 'saturacionprogresiva.html'; break;
		      case "2": page_tech = 'saturacionprogresivaencadenada.html'; break;
		      case "3": page_tech = 'saturacionprogresivaencadenadaseparada.html'; break;
		      case "4": page_tech = 'dispersiondoble.html'; break;
		      case "-1": 
		        $('#sidebar_read_write').hide('slow');
		    	page_tech = 'dispersionextensible.html';	      
		      break;	
 		    }; 		
 		    $('#escenario').load(page_tech);
          }
        }  
		return false;     
      });

      $('#funcion').change(function() {
        var funcion;  
        funcion = $('#funcion').val();
        if (funcion == 3){
          $('#base').attr('disabled',false);          
        } 
        else {
          $('#base').attr('disabled',true);
          $('#base').val("-1");
        }
        enable_simulation();    
        return false; 
	  });

      $('#base').change(function() {
        enable_simulation();          
      });

      $('#capacidadmemoria').change(function() {
        var mc = $('#capacidadmemoria').val();        
        if (mc != -1) {
          var vms = validate_memory_space();
          if (vms) {
            $('#densidad').val("-1");
          } else 
            { 
        	   $("#invalid_configuration_memory_space").dialog( "open" );
               $('#capacidadmemoria').val("-1");
            }             
        }        
        enable_simulation();                        
      });
      
      $('#densidad').change(function() {
        var d = $('#densidad').val();
        if (d != -1){
          $('#capacidadmemoria').val("-1");
        }    
        enable_simulation();          
      });

      $('#capacidadcubeta').change(function() {
        var cml = $('#capacidadcubeta').val();
        if (cml != -1) {
          var vms = validate_memory_space();
          if (!vms) {
        	$("#invalid_configuration_memory_space").dialog( "open" );
            $('#capacidadcubeta').val("-1");        
          } else 
            {
        	  var technique = $('#tecnica').val();
        	  if ((cml > 1)&&(technique == 2)){
        	    $("#invalid_configuration_memory_space").dialog( "open" );
        	    $('#capacidadcubeta').val("-1");
              }
            }    
        }       
        enable_simulation();          
      });
      
      $('#cantidadclaves').change(function() {
    	var nkd = $('#cantidadclaves').val();
    	if (nkd != -1){
          var vms = validate_memory_space();
          if (!vms) {
        	$("#invalid_configuration_memory_space").dialog( "open" );
            $('#cantidadclaves').val("-1");        
          }  	
    	}
        enable_simulation();          
      });
      
      $( '#tecnica' ).change(function() {
    	var technique = $('#tecnica').val();
        if (technique == 4){
          $('#primo').attr('disabled',false);          
        } else 
          {
            $('#primo').attr('disabled',true);
            $('#primo').val("-1");
            if (technique == 2){
              var cml = $('#capacidadcubeta').val();            
              if (cml > 1) {    
          	    $("#invalid_configuration_memory_space").dialog( "open" );
          	    $('#tecnica').val("-1");
          	  } else 
                {
          		  var vms = validate_memory_space();
          		  if (!vms){
          		    $("#invalid_configuration_memory_space").dialog( "open" );
                    $('#tecnica').val("-1");
              	  }    
                }      
            }         
          }     
        enable_simulation();    
        return false;  
      });

      $('#primo').change(function() {
        enable_simulation();          
      });
      
      $( '#tipodispersionest' ).click(function() {
    	$('#menu2').attr('style', ''); 
    	$('#menu3').attr('style', '');   
      	$('#menu4').attr('style', '');

      	$('#capacidadmemoria').val("-1");
    	$('#capacidadmemoria').attr('disabled',false);
    	$('#densidad').val("-1");
    	$('#densidad').attr('disabled',false);
    	$('#twenty_five').show();
    	$('#thirty').show();
    	
    	$('#funcion').change();
    	$('#tecnica').change();
    	
      	disp_type = true;                          
      });

      $( '#tipodispersiondin' ).click(function() {
    	$('#menu2').attr('style', 'color: gray; cursor: help; text-decoration: line-through');    
    	$('#menu4').attr('style', 'color: gray; cursor: help; text-decoration: line-through');
    	$('#menu3').attr('style', '');

    	$('#capacidadmemoria').val("-1");
    	$('#capacidadmemoria').attr('disabled',true);
    	$('#densidad').val("-1");
    	$('#densidad').attr('disabled',true);
    	$('#twenty_five').hide();
    	$('#thirty').hide();
    	
    	disp_type = true;    	   	
      });          

      $( '#close-simulation' ).click(function() {
    	$("#close_dialog_simulation").dialog( "open" );
    	return false;           
      });

      $( "#close_dialog_simulation" ).dialog({
	    resizable: false,
		modal: true,
		autoOpen: false,
		buttons: {
		  "Aceptar": function() {
		    $( this ).dialog( "close" );
		    operating = false;
		    location.reload('index.html');
		  },
		  "Cancelar": function() {
		    $( this ).dialog( "close" );
		  }
	    }
	  });

      $( "#operation_restart_dialog" ).dialog({
  	    resizable: false,
  		modal: true,
  		autoOpen: false,
  		buttons: {
  		  "Aceptar": function() {
  		    $( this ).dialog( "close" );  		      		    
  		    location.reload('index.html');    
  		  },
  		  "Cancelar": function() {
  		    $( this ).dialog( "close" );
  		  }
  	    }
  	  });
  	  
      $( "#invalid_configuration_memory_space" ).dialog({
        resizable: false,
   		modal: true,
   		autoOpen: false,
   		buttons: {
    	  "Aceptar": function() {
             $( this ).dialog( "close" );  		      		        
    	  }
        }
      });

      $( "#virtual-keyboard" ).click(function() {    	
    	$('#sidebar_virtual_keyboard').show('slow');
      	return false;           
      });
})