// statement of memory
function statement_memory (){  
  mem = new Array(sel_val['mem_cap']);
  for(i=0; i<sel_val['mem_cap']; i++){
    mem[i] = new Array();			
  }
  return mem;		
}

// declaration of separate memory area
function declaration_separate_memory_area (){
  memoriadesborde = new Array(gen_inf['sep_mem_cap']);
  for(i=0; i<(gen_inf['sep_mem_cap']); i++){
    memoriadesborde[i] = new Array();			
  }
  return memoriadesborde;	
}

//Función que declara la tabla de memoria para dispersión extensible
function declarar_tabla(filas){  
  tabla    = new Array(filas);
  tabla[0] = new Array();			
  return tabla;		
}

// statement of memory for instances
/*function statement_memory_instances (inst){
  mem_inst = new Array(inst);
  for(i=1; i<(inst); i++){
    mem_inst[i] = new Array();
  }
  for(i=1; i<inst; i++){
    for(j=0; j<(sel_val['mem_cap']); j++){	  
      mem_inst[i][j] = new Array();    	
    }
  }      			
  return mem_inst;
}
*/

// statement memory for saturation
function statement_memory_saturation (){
  mid = new Array(gen_inf['sep_mem_cap']);
  for(i=0; i<(gen_inf['sep_mem_cap']); i++){	  
    mid[i] = new Array();    	
  }      			
  return mid;
}


// initializes the memory area
function initializes_memory (){ 
  for(i=0; i<(sel_val['mem_cap']); i++){
    memoria[i][0] = i; 
    for(j=1; j<(sel_val['node_cap']+1); j++){
      memoria[i][j] = '----';
	}	
  } 
}

// initialize memory in the progressive saturation technique chained
function initialize_memory_progressive_saturation_chained (){ 
  for(i=0; i<(sel_val['mem_cap']); i++){
    memoria[i][0] = i;   
    for(j=1; j<(sel_val['node_cap']+1); j++){
      memoria[i][j] = '----';
	}
    memoria[i][sel_val['node_cap']+1] = -1;
  } 
}

// initialize separate overflow area
function initialize_separate_overflow_area (){ 
  for(i=0; i<gen_inf['sep_mem_cap']; i++){
	memoriadesborde[i][0] = i;   
	for(j=1; j<(2); j++){
	  memoriadesborde[i][j] = '----';
	}
	memoriadesborde[i][2] = -1;
  } 
}

/* extensible dispersion */

//Función que inicializa la tabla de memoria para dispersión extensible
function inicializar_tabla(tabla){
  tabla[0][0] = '';	
  tabla[0][1] = 0;
  
}

//Función que inicializa la memoria para dispersión extensible
function inicializar_memoria_dispersion_extensible(memoria, capcub){
  memoria[0][0] = 0;
  memoria[0][1] = 0;
  for(i=2; i<capcub+2; i++){
    memoria[0][i] = '----';
  }
}

/* copy of the table of memory */
function copy_of_the_table(){
  var end = sel_val['tab_dim'];
  var new_array = new Array();
  for(i=0; i<end; i++){	  
    new_array[i]    = new Array();
    new_array[i][0] = tabla[i][0];
    new_array[i][1] = tabla[i][1];
  }
  return (new_array);
}

/* copy of the memory */
function copy_of_the_memory(){
  var end_fil = sel_val['mem_cap'];
  var end_col = sel_val['node_cap']+2;  
  var new_array = new Array();
  for(i=0; i<end_fil; i++){
	new_array[i] = new Array();  
    for(j=0; j<end_col; j++){
	  new_array[i][j] = memoria[i][j];
    }  
  }
  return (new_array);	
}


//Funci�n que imprime la matriz para dispersi�n lineal y para dispersi�n lineal encadenada
/*function imprimir_memoria(memoria, fila, col, desp){
  str =  "<div id='contenedor' align='center' class='instancias'>";
  str = str + "<table border='0'>";
  for(i=0; i<fila; i++){
    str = str + "<tr>";
    for(j=0; j<(col+desp); j++){
      str = str + "<td>"+memoria[i][j]+"</td>";
	}
	str = str + "</tr>";	
  }
  str = str + "</table>";
  str = str + "</div>";
 
  $("#contenedor").replaceWith(str);
}
*/

//Funci�n que imprime la matriz que representa el area de memoria separada
/*function imprimir_memoria_separada(memoriadesborde, filas){
  str =  "<div id = 'contenedorseparada' align = 'center' class='instancias'>Memoria Separada";
  str = str + "<table>";
  for(i=0; i<(filas); i++){
    str = str + "<tr>";
    for(j=0; j<3; j++){
      str = str + "<td>"+memoriadesborde[i][j]+"</td>";
	}
	str = str + "</tr>";	
  }
  str = str + "</table>";
  str = str + "</div>";
 
  $(str).appendTo("#contenedor");		
}
*/

// instance memory area copy
function instance_memory_copy (desp){
  for (i=0; i<(sel_val['mem_cap']); i++){
    for (j=0; j<(sel_val['node_cap']+desp); j++){
      mem_inst[i][j] = memoria[i][j];  
    }  
  }
}

// copy the overflow area separate instance
function copy_overflow_area_separate_instance (){
  for (i=0; i<(gen_inf['sep_mem_cap']); i++){
    for (j=0; j<3; j++){
      mem_inst_desb[i][j] = memoriadesborde[i][j];  
    }  
  }
}

//Función que verifica si "memoria" y "mem_inst" en la posición "instancia" coinciden
/*function verificar_instancia (memoria, mem_inst, instancia, capmem, capcub, desp) {
  coinciden = true;
  i = 0;
  while ((i < capmem) && (coinciden)){
	j = desp;  
    while ((j < (capcub+desp+1)) && (coinciden)){
      if (memoria[i][j] != mem_inst[instancia][i][j]){
        coinciden = false;	   
      } else { j++;}	
    }
    if (coinciden){
      i++;
    }
  }
  return coinciden;
}
*/

// copy a memory location
function memory_location_copy (num_loc) {
  var m_c = new Array();  
  columns = sel_val['node_cap']+2;
  for (i=0; i<(columns); i++){
    m_c[i] = memoria[num_loc][i];   
  }
  return m_c
}
