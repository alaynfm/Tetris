// ************************************
// *     EJERCICIO 1                   *
// ************************************

// ============== Point =======================

function Point (x, y) {
	this.x = x;
	this.y = y;    
}

// ============== Rectangle ====================
function Rectangle() {}

Rectangle.prototype.init = function(p1,p2) {
	this.px = p1.x;
	this.py = p1.y;
	this.width = p2.x - p1.x;
	this.height = p2.y - p1.y;
	this.lineWidth= 1;
	this.color = 'black';
}

Rectangle.prototype.draw = function() {

	// TU CÓDIGO AQUÍ:
	// pinta un rectángulo del color actual en pantalla en la posición px,py, con
	// la anchura y altura actual y una línea de anchura=lineWidth. Ten en cuenta que 
	// en este ejemplo la variable ctx es global y que guarda el contexto (context) 
	// para pintar en el canvas.	
	var canvas = document.getElementById('canvas');
  	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');
		ctx.fillStyle = this.color;
		ctx.strokeStyle = 'black';
		ctx.lineWidth = this.lineWidth+2
		ctx.fillRect(this.px ,this.py,Block.BLOCK_SIZE, Block.BLOCK_SIZE);
		ctx.strokeRect(this.px,this.py,this.width, this.height)
	}
}


Rectangle.prototype.setLineWidth = function(width) { this.lineWidth=width}
Rectangle.prototype.setFill = function(color) { this.color = color}

/** Método introducido en el EJERCICIO 4 */

Rectangle.prototype.move = function(x,y){
	this.px += x;
	this.py += y;
	this.draw();
}

/** Método introducido en el EJERCICIO 4 */

Rectangle.prototype.erase = function(){
	ctx.beginPath();
	ctx.lineWidth = this.lineWidth+2;
	ctx.strokeStyle = Tetris.BOARD_COLOR;
	ctx.rect(this.px-1, this.py-1, this.width+1.5, this.height+1.5);
	ctx.stroke();
	ctx.fillStyle = Tetris.BOARD_COLOR;
	ctx.fill()

}


// ============== Block ===============================

function Block (pos, color) {

	// TU CÓDIGO AQUÍ: este es el constructor de la clase Block. Recibe dos parámetros, pos y color. Pos = posición de la casilla, por ejemplo, (9,19).
	// color = color que hay que emplear para pintar el bloque.
	// Internamente este método crea dos puntos (empleando las coordenadas del pixel)
	// y llama al método init de la clase Rectangle, pasándole como parámetro,
	// estos dos puntos.
	// Sería interesante que emplearas las constantes Block.BLOCK_SIZE y Block.OUTLINE_WIDTH,
	// para establecer la anchura del bloque y la anchura de la línea, respectivamente.

	this.BLOCK_SIZE = 30;
	this.OUTLINE_WIDTH = 2;
	tamano = this.BLOCK_SIZE + this.OUTLINE_WIDTH;
	Rectangle.prototype.init.call(this,new Point(pos.x * Block.BLOCK_SIZE, pos.y* Block.BLOCK_SIZE,), new Point((pos.x +1)*  Block.BLOCK_SIZE,(pos.y + 1)* Block.BLOCK_SIZE));	
	this.color = color;
}

Block.BLOCK_SIZE = 30;
Block.OUTLINE_WIDTH = 2;

// TU CÓDIGO AQUÍ: emplea el patrón de herencia (Block es un Rectangle)
Block.prototype = Object.create(Rectangle.prototype);

/** Método introducido en el EJERCICIO 4 */

Block.prototype.move = function(dx, dy) {
	this.x += dx;
	this.y += dy;

	Rectangle.prototype.move.call(this, dx * Block.BLOCK_SIZE, dy * Block.BLOCK_SIZE);
}

 /**************************************************
 *	 Código que se da dado para el EJERCICIO 5 *
 ***************************************************/

Block.prototype.can_move = function(board, dx, dy) {
   // TU CÓDIGO AQUÍ: toma como parámetro un increment (dx,dy)
  // e indica si es posible mover el bloque actual si 
 // incrementáramos su posición en ese valor
	pintar = true;
	if(board.can_move(dx,dy)){
		if(dy > board.height * (Block.BLOCK_SIZE) - Block.BLOCK_SIZE || dy<0){
			pintar = false;
		}
		if(dx <0 || dx > board.width * (Block.BLOCK_SIZE) - Block.BLOCK_SIZE){
			pintar = false;
		} 
	}else{
		pintar = false;
	}
	return pintar;
}

// ************************************
// *      EJERCICIO 2                  *
// ************************************

function Shape() {}


Shape.prototype.init = function(coords, color) {

	// TU CÓDIGO AQUÍ: método de inicialización de una Pieza del tablero
	// Toma como parámetros: coords, un array de posiciones de los bloques
	// que forman la Pieza y color, un string que indica el color de los bloques
	// Post-condición: para cada coordenada, crea un bloque de ese color y lo guarda en un bloque-array

	this.myBlocks = [];
	for (var i = 0; i < coords.length; i++) {
		this.myBlocks.push(new Block(coords[i],color));
	 }
	/*8 Atributo introducido en el EJERCICIO 8*/
	this.rotation_dir = 1;

};

Shape.prototype.draw = function() {

	// TU CÓDIGO AQUÍ: método que debe pintar en pantalla todos los bloques
	// que forman la Pieza
	for (var i = 0; i < this.myBlocks.length; i++) {
		this.myBlocks[i].draw();
		
	 }
};

 /**************************************************
 *	 Código que se da dado para el EJERCICIO 5 *
 ***************************************************/

Shape.prototype.can_move = function(board, dx, dy) {
// TU CÓDIGO AQUÍ: comprobar límites para cada bloque de la pieza
	mover = true;
	for (var i = 0; i < this.myBlocks.length; i++) {
		if (!this.myBlocks[i].can_move(board,this.myBlocks[i].px + dx, this.myBlocks[i].py + dy)) mover = false;	
	};
	return mover;	
};

/* Método introducido en el EJERCICIO 8 */

Shape.prototype.can_rotate = function(board) {

//  TU CÓDIGO AQUÍ: calcula la fórmula de rotación para cada uno de los bloques de
// la pieza. Si alguno de los bloques no se pudiera mover a la nueva posición,
// devolver false. En caso contrario, true.

	var rotar = true;
	for(var i= 0; i<this.myBlocks.length;i++) {
		var centre = this.myBlocks[2];//Siempre esta en esta posición el centro
		var x = ((centre.px)- this.rotation_dir * centre.py + this.rotation_dir * this.myBlocks[i].py)/Block.BLOCK_SIZE
		var y = (centre.py + this.rotation_dir * centre.px - this.rotation_dir * this.myBlocks[i].px)/Block.BLOCK_SIZE;
		//console.log(x + " " + y);
		rotar = this.myBlocks[i].can_move(board, x, y);
	}

	//console.log(rotar);
	return rotar;
};


/* Método introducido en el EJERCICIO 8 */

Shape.prototype.rotate = function(board) {

// TU CÓDIGO AQUÍ: básicamente tienes que aplicar la fórmula de rotación
// (que se muestra en el enunciado de la práctica) a todos los bloques de la pieza 
	//console.log(this.myBlocks[0].px)
	if(this.can_rotate(board)){
		for(var i= 0; i<this.myBlocks.length;i++) {
			this.myBlocks[i].erase();
			var centre = this.myBlocks[2];//Siempre esta en esta posición el centro
			var x = ((centre.px)- this.rotation_dir * centre.py + this.rotation_dir * this.myBlocks[i].py)/Block.BLOCK_SIZE
			var y = (centre.py + this.rotation_dir * centre.px - this.rotation_dir * this.myBlocks[i].px)/Block.BLOCK_SIZE;
			//console.log(x + " " + y)
			this.myBlocks[i].move(x-(this.myBlocks[i].px/Block.BLOCK_SIZE),y - (this.myBlocks[i].py/Block.BLOCK_SIZE));	
	}
	this.draw();
	//console.log(this.myBlocks)
	
	}

  /* Deja este código al final. Por defecto las piezas deben oscilar en su
     movimiento, aunque no siempre es así (de ahí que haya que comprobarlo) */
    if (this.shift_rotation_dir)
            this.rotation_dir *= -1
};

/* Método introducido en el EJERCICIO 4 */

Shape.prototype.move = function(dx, dy) {
   
	for (block of this.myBlocks) {
		block.erase();
	}

	for (block of this.myBlocks) {
		block.move(dx,dy);
	}
};


//las piezas tienen la siguiente estructura
	//(this.current_shape["myBlocks"][0] --> Pieza mas a la izq
	//(this.current_shape["myBlocks"][1] --> Pieza mas abajo
	//(this.current_shape["myBlocks"][2] --> Pieza central
	//(this.current_shape["myBlocks"][3] --> Pieza mas a la derecha
// ============= I_Shape ================================
function I_Shape(center) {
	var coords = [new Point(center.x - 2, center.y),
			  new Point(center.x - 1, center.y),
			  new Point(center.x , center.y),
			  new Point(center.x + 1, center.y)];
   
	Shape.prototype.init.call(this, coords, "blue");   

}
// TU CÓDIGO AQUÍ: La clase I_Shape hereda de la clase Shape
I_Shape.prototype = Object.create(Shape.prototype);
// =============== J_Shape =============================
function J_Shape(center) {

   // TU CÓDIGO AQUÍ: Para programar J_Shape toma como ejemplo el código de la clase I_Shape
   var coords = [new Point(center.x - 1, center.y),
	   new Point(center.x + 1, center.y + 1),
	   new Point(center.x , center.y),
	   new Point(center.x + 1 , center.y)];

   Shape.prototype.init.call(this, coords, "orange");


}
// TU CÓDIGO AQUÍ: La clase J_Shape hereda de la clase Shape
J_Shape.prototype = Object.create(Shape.prototype);
// ============ L Shape ===========================
function L_Shape(center) {

   // TU CÓDIGO AQUÍ: Para programar L_Shape toma como ejemplo el código de la clase I_Shape
   var coords = [new Point(center.x - 1, center.y),
	   new Point(center.x -1 , center.y + 1),
	   new Point(center.x , center.y),
	   new Point(center.x + 1, center.y)];
   Shape.prototype.init.call(this, coords, "Cyan");
}
// TU CÓDIGO AQUÍ: La clase L_Shape hereda de la clase Shape
L_Shape.prototype = Object.create(Shape.prototype);
// ============ O Shape ===========================
function O_Shape(center) {

   // TU CÓDIGO AQUÍ: Para programar O_Shape toma como ejemplo el código de la clase I_Shape
   var coords = [new Point(center.x - 1, center.y),
	   new Point(center.x -1 , center.y +1),
	   new Point(center.x , center.y),
	   new Point(center.x, center.y +1)];

   Shape.prototype.init.call(this, coords, "red");

}

// TU CÓDIGO AQUÍ: La clase O_Shape hereda de la clase Shape
O_Shape.prototype = Object.create(Shape.prototype);

O_Shape.prototype.can_rotate = function(board){
	return false;
}
// ============ S Shape ===========================
function S_Shape(center) {

   // TU CÓDIGO AQUÍ: Para programar S_Shape toma como ejemplo el código de la clase I_Shape 
   var coords = [new Point(center.x -1 , center.y +1),
	   new Point(center.x, center.y +1),
	   new Point(center.x , center.y),
	   new Point(center.x + 1, center.y)];
   
   Shape.prototype.init.call(this, coords, "green");

}
// TU CÓDIGO AQUÍ: La clase S_Shape hereda de la clase Shape
S_Shape.prototype = Object.create(Shape.prototype);
// ============ T Shape ===========================
function T_Shape(center) {

   // TU CÓDIGO AQUÍ: : Para programar T_Shape toma como ejemplo el código de la clase I_Shape
   var coords = [new Point(center.x - 1, center.y),
	   new Point(center.x, center.y + 1),
	   new Point(center.x , center.y),
	   new Point(center.x + 1 , center.y)];
   
   Shape.prototype.init.call(this, coords, "yellow");

}
// TU CÓDIGO AQUÍ: La clase T_Shape hereda de la clase Shape
T_Shape.prototype = Object.create(Shape.prototype);
// ============ Z Shape ===========================
function Z_Shape(center) {

   // TU CÓDIGO AQUÍ: : Para programar Z_Shape toma como ejemplo el código de la clase I_Shape
   var coords = [new Point(center.x - 1, center.y),
	   new Point(center.x , center.y + 1),
	   new Point(center.x , center.y),
	   new Point(center.x + 1, center.y + 1)];
   
   Shape.prototype.init.call(this, coords, "Magenta");
}
// TU CÓDIGO AQUÍ: La clase Z_Shape hereda de la clase Shape
Z_Shape.prototype = Object.create(Shape.prototype);



// ************************************
// *     EJERCICIO 3               *
// ************************************

// ====================== BOARD ================

function Board(width, height) {
	this.width = width;
	this.height = height;
	this.grid = {}; /* 6. Estructura de datos introducida en el EJERCICIO 6 */
}


// Si la pieza nueva puede entrar en el tablero, pintarla y devolver true.
// Si no, devoler false

Board.prototype.draw_shape = function(shape){
	if (shape.can_move(this,0,0)){
		shape.draw();
		return true;
	}
	return false;
}

 /*****************************
 *	 EJERCICIO 6          *
 *****************************/

Board.prototype.add_shape = function(shape){

	for (var i = 0; i < shape["myBlocks"].length; i++) {
		this.grid[shape["myBlocks"][i].px + "," +shape["myBlocks"][i].py] = shape["myBlocks"][i];
	};
	// TU CÓDIGO AQUÍ: meter todos los bloques de la pieza que hemos recibido por parámetro en la estructura de datos grid
}

// ****************************
// *     EJERCICIO 5          *
// ****************************

Board.prototype.can_move = function(x,y){

 	// TU CÓDIGO AQUÍ: 
 	// hasta ahora, este método siempre devolvía el valor true. Ahora,
 	// comprueba si la posición que se le pasa como párametro está dentro de los  
	// límites del tablero y en función de ello, devuelve true o false.
	
	return this.grid["" + x + "," + y + ""] == null;

	/* EJERCICIO 7 */
	// TU CÓDIGO AQUÍ: código para detectar colisiones. Si la posición x,y está en el diccionario grid, devolver false y true en cualquier otro caso.

};

Board.prototype.move_down_rows = function(y_start){
/// TU CÓDIGO AQUÍ: 
//  empezando en la fila y_start y hasta la fila 0
//    para todas las casillas de esa fila
//       si la casilla está en el grid  (hay bloque en esa casilla)
//          borrar el bloque del grid
//          
//          mientras se pueda mover el bloque hacia abajo
//              mover el bloque hacia abajo
//          
//          meter el bloque en la nueva posición del grid

	newGrid={};
	for(var i=this.height-1;i>=0;i--){
		for(var j = 0; j < this.width; j++){
			shape = this.grid["" + j * Block.BLOCK_SIZE + "," + i*Block.BLOCK_SIZE+ ""];
			if(shape != null){
				if(i < y_start){
					shape.erase();	//borramos cuadrada
					shape.move(0,1); //Bajamos uno el cuadrado
					newGrid[(j) * Block.BLOCK_SIZE+ "," + (i+1)*Block.BLOCK_SIZE] = shape;
				}else if(i > y_start){
					newGrid[(j) * Block.BLOCK_SIZE+ "," + (i)*Block.BLOCK_SIZE] = shape;
				}else{	//delete row		
					shape.erase();		
				}
			}
		}
	}
	this.grid = newGrid;
};

Board.prototype.remove_complete_rows = function(){
// TU CÓDIGO AQUÍ:
// Para toda fila y del tablero
//   si la fila y está completa
//      borrar fila y
//      mover hacia abajo las filas superiores (es decir, move_down_rows(y-1) )

	//console.log(this.width)
	var i = 0;
	while( i<this.height){//Para cada fila
		var cont = 0;
		for(var j = 0; j< this.width; j++){//Para cada columna
			if(this.grid["" + j * Block.BLOCK_SIZE + "," + i*Block.BLOCK_SIZE+ ""] != null) cont++;
		}
		//console.log("fila" + i +  " " + cont);
		if(cont >=this.width){
			this.move_down_rows(i);
			i=0;
		}else{
			i++;
		}
	}
};


// ==================== Tetris ==========================

function Tetris() {
	this.board = new Board(Tetris.BOARD_WIDTH, Tetris.BOARD_HEIGHT);
}

Tetris.SHAPES = [I_Shape, J_Shape, L_Shape, O_Shape, S_Shape, T_Shape, Z_Shape];
Tetris.DIRECTION = {'Left':[-1, 0], 'Right':[1, 0], 'Down':[0, 1]};
Tetris.BOARD_WIDTH = 10;
Tetris.BOARD_HEIGHT = 20;
Tetris.BOARD_COLOR='white';

Tetris.prototype.create_new_shape = function(){

	// TU CÓDIGO AQUÍ: 
	// Elegir un nombre de pieza al azar del array Tetris.SHAPES
	// Crear una instancia de ese tipo de pieza (x = centro del tablero, y = 0)
	// Devolver la referencia de esa pieza nueva
	return new Tetris.SHAPES[Math.floor(Math.random() * Tetris.SHAPES.length)](new Point(Tetris.BOARD_WIDTH/2,0));

}

Tetris.prototype.init = function(){

	/**************
	  EJERCICIO 4
	***************/

	// gestor de teclado

	document.addEventListener('keydown', this.key_pressed.bind(this), false);

	// Obtener una nueva pieza al azar y asignarla como pieza actual 

	this.current_shape = this.create_new_shape()

	// TU CÓDIGO AQUÍ: 
	// Pintar la pieza actual en el tablero
	// Aclaración: (Board tiene un método para pintar)
	this.current_shape.draw();
	//Inicializar el contador
	//La pieza va a vanzar cada un segundo
	this.do_timer();
	this.gameover = false;
	
}

//metodo para avanzar el timer
Tetris.prototype.do_timer = function() { 
	var timer = setInterval(() =>{
		if(this.current_shape.can_move(this.board,0,Block.BLOCK_SIZE)){
			this.do_move("Down");
		}else{
			if(this.current_shape.px !=0){ 
				//Para que salga una pieza nueva si ha llegado al final
				this.board.add_shape(this.current_shape)
				this.current_shape = this.create_new_shape();
				this.current_shape.draw();
				if(!this.current_shape.can_move(this.board,0,Block.BLOCK_SIZE)){
					//Limpiar el interval y terminar el juego si no se pueden poner mas
					clearInterval(timer);
					if(!this.gameover)
						alert("Game over");
				}	
			}
		}
		//console.log(this.current_shape)
	},1000);
}

Tetris.prototype.key_pressed = function(e) { 

	var key = e.keyCode ? e.keyCode : e.which;

        // TU CÓDIGO AQUÍ:
	// en la variable key se guardará el código ASCII de la tecla que
	// ha pulsado el usuario. ¿Cuál es el código key que corresponde 
	// a mover la pieza hacia la izquierda, la derecha, abajo o a rotarla?
	if(key == 37) this.do_move("Left");
	if(key == 39) this.do_move("Right");
	if(key == 40) this.do_move("Down");
	if(key == 38) this.do_rotate(); //Flecha hacia arriba
	if(key == 32) this.do_space(); //espacio
}

Tetris.prototype.do_space = function(){
	var i = 0;
	while(this.current_shape.can_move(this.board,0,Block.BLOCK_SIZE)){
		this.do_move("Down");
		i++;
	}
	if(i == 0) {
		alert("Game over");
		this.gameover = true;
	}
	else{
		this.board.add_shape(this.current_shape)
		this.current_shape = this.create_new_shape();
		this.current_shape.draw();	
	}
	this.board.remove_complete_rows();		
}


Tetris.prototype.do_move = function(direction) {

	// TU CÓDIGO AQUÍ: el usuario ha pulsado la tecla Left, Right o Down (izquierda,
	// derecha o abajo). Tenemos que mover la pieza en la dirección correspondiente
	// a esa tecla. Recuerda que el array Tetris.DIRECTION guarda los desplazamientos 
	// en cada dirección, por tanto, si accedes a Tetris.DIRECTION[direction], 
	// obtendrás el desplazamiento (dx, dy). A continuación analiza si la pieza actual 
	// se puede mover con ese desplazamiento. En caso afirmativo, mueve la pieza. 

	/* Código que se pide en el EJERCICIO 6 */
	// else if(direction=='Down')
	// TU CÓDIGO AQUÍ: añade la pieza actual al grid. Crea una nueva pieza y dibújala en el tablero.

	if(this.current_shape.can_move(this.board,Tetris.DIRECTION[direction][0]* Block.BLOCK_SIZE,Tetris.DIRECTION[direction][1] * Block.BLOCK_SIZE)){
		this.current_shape.move(Tetris.DIRECTION[direction][0],Tetris.DIRECTION[direction][1]);
		this.current_shape.draw();
	}else{
		if(Tetris.DIRECTION[direction][1]== 1){
			this.board.add_shape(this.current_shape)
			this.current_shape = this.create_new_shape();
			if(this.current_shape.can_move(this.board,0,0)){
				this.current_shape.draw();
			}else{
				alert("Game Over");
				this.gameover = true;
			}
		}
	}
	//mirar a ver si se ha cmpletado la linea entera
	//si se ha completado eliminar y sumar a todas una posicion
	this.board.remove_complete_rows();	
}

/***** EJERCICIO 8 ******/
Tetris.prototype.do_rotate = function(){
	// TU CÓDIGO AQUÍ: si la pieza actual se puede rotar, rótala. Recueda que Shape.can_rotate y Shape.rotate ya están programadas.	
	if(this.current_shape.can_rotate(this.board)){
		this.current_shape.rotate(this.board);
	}
}