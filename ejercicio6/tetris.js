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
		ctx.fillRect(this.px ,this.py,30, 30);
		ctx.strokeRect(this.px,this.py,this.width, this.height)
	}
}


Rectangle.prototype.setLineWidth = function(width) { this.lineWidth=width}
Rectangle.prototype.setFill = function(color) { this.color = color}

//** Método introducido en el EJERCICIO 4 */

Rectangle.prototype.move = function(x,y){
	this.px += x;
	this.py += y;
	this.draw();
}

//** Método introducido en el EJERCICIO 4 */

Rectangle.prototype.erase = function(){
	ctx.beginPath();
	ctx.lineWidth = this.lineWidth+2;
	ctx.strokeStyle = Tetris.BOARD_COLOR;
	ctx.rect(this.px - 1, this.py - 1, this.width + 2, this.height + 2);
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
	Rectangle.prototype.init.call(this,new Point(pos.x * 30, pos.y*30), new Point((pos.x +1)* 30,(pos.y + 1)*30));	
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
		if(dy > board.height * (Block.BLOCK_SIZE) - Block.BLOCK_SIZE){
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

/** Método introducido en el EJERCICIO 4 */

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
	this.grid = []; /* 6. Estructura de datos introducida en el EJERCICIO 6 */

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

	// TU CÓDIGO AQUÍ: meter todos los bloques de la pieza que hemos recibido por parámetro en la estructura de datos grid
	for (var i = 0; i < shape["myBlocks"].length; i++) {
		this.grid[shape["myBlocks"][i].px + "," +shape["myBlocks"][i].py] = 1;
	};
	//console.log(this.grid)
}


// ****************************
// *     EJERCICIO 5          *
// ****************************

Board.prototype.can_move = function(x,y){

	//mirar si alguna pieza esta en el grid
	var pos = this.grid["" + x + "," + y + ""];	
	return pos == null;
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

}

Tetris.prototype.key_pressed = function(e) { 

	var key = e.keyCode ? e.keyCode : e.which;

        // TU CÓDIGO AQUÍ:
	// en la variable key se guardará el código ASCII de la tecla que
	// ha pulsado el usuario. ¿Cuál es el código key que corresponde 
	// a mover la pieza hacia la izquierda, la derecha, abajo o a rotarla?
	if(key == 37) this.do_move(Tetris.DIRECTION["Left"]);
	if(key == 39) this.do_move(Tetris.DIRECTION["Right"]);
	if(key == 40) this.do_move(Tetris.DIRECTION["Down"]);
	if(key == 32) this.do_space();



}

Tetris.prototype.do_space = function(){
	while(this.current_shape.can_move(this.board,0,1)){
		this.current_shape.move(0,1);
	}
	this.board.add_shape(this.current_shape);
	this.current_shape = this.create_new_shape();
	this.current_shape.draw();
}

Tetris.prototype.do_move = function(direction) {

	// TU CÓDIGO AQUÍ: el usuario ha pulsado la tecla Left, Right o Down (izquierda,
	// derecha o abajo). Tenemos que mover la pieza en la dirección correspondiente
	// a esa tecla. Recuerda que el array Tetris.DIRECTION guarda los desplazamientos 
	// en cada dirección, por tanto, si accedes a Tetris.DIRECTION[direction], 
	// obtendrás el desplazamiento (dx, dy). A continuación analiza si la pieza actual 
	// se puede mover con ese desplazamiento. En caso afirmativo, mueve la pieza. 

	
	var block = new Block(new Point(direction[0],direction[1]))
	if(direction[1]== 0){
		if(this.current_shape.can_move(this.board,block.px,block.py)){
			this.current_shape.move(direction[0],direction[1]);
			this.current_shape.draw();
		}
	}else{
		if(this.current_shape.can_move(this.board,block.px,block.py)){
			this.current_shape.move(direction[0],direction[1]);
			this.current_shape.draw();
		}else{
			this.board.add_shape(this.current_shape)
			this.current_shape = this.create_new_shape();
			this.current_shape.draw();
		}
	}
	
	/* Código que se pide en el EJERCICIO 6 */
	// else if(direction=='Down')
	// TU CÓDIGO AQUÍ: añade la pieza actual al grid. Crea una nueva pieza y dibújala en el tablero.
}
