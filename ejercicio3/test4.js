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
	  ctx.fillRect(this.px ,this.py,this.BLOCK_SIZE + this.OUTLINE_WIDTH, this.BLOCK_SIZE + this.OUTLINE_WIDTH);
	  ctx.strokeRect(this.px,this.py,this.width, this.height)
  	}	
}


Rectangle.prototype.setLineWidth = function(width) { this.lineWidth=width}
Rectangle.prototype.setFill = function(color) { this.color = color}

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
	Rectangle.prototype.init.call(this,new Point(pos.x * Block.BLOCK_SIZE, pos.y*Block.BLOCK_SIZE), new Point((pos.x +1)* Block.BLOCK_SIZE,(pos.y + 1)*tamano));	
  this.color = color;
}

// En esta parte de la práctica devolveremos siempre 'true'
// pero, más adelante, tendremos que implementar este método
// que toma como parámetro la posición (x,y) de una casilla
// (a la que queremos mover una pieza) e indica si es posible
// ese movimiento o no (porque ya está ocupada o porque se sale
// de los límites del tablero
Block.prototype.can_move = function(board, dx, dy) {
        return true;
}


Block.BLOCK_SIZE = 30;
Block.OUTLINE_WIDTH = 2;

// TU CÓDIGO: patrón de herencia (Block es un Rectangle)
Block.prototype = Object.create(Rectangle.prototype);


function Shape() {}


Shape.prototype.init = function(coords, color) {
	// TU CÓDIGO AQUÍ: método de inicialización de una Pieza del tablero
	// Toma como parámetros: coords, un array de posiciones de los bloques
	// que forman la Pieza y color, un string que indica el color de los bloques
	// Post-condición: para cada coordenada, crea un bloque de ese color y lo guarda en un bloque-array.
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

// En esta parte de la práctica devolveremos siempre 'true'
Shape.prototype.can_move = function(board,x,y) {
    return true;
};


// ============= I_Shape ================================
function I_Shape(center) {
     var coords = [new Point(center.x - 2, center.y),
               new Point(center.x - 1, center.y),
               new Point(center.x , center.y),
               new Point(center.x + 1, center.y)];
    
     Shape.prototype.init.call(this, coords, "blue");   

     this.shift_rotation_dir = true;
     this.center_block = this.blocks[2];
}

// TU CÓDIGO: I_Shape hereda de Shape


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
		new Point(center.x , center.y),
		new Point(center.x + 1 , center.y),
		new Point(center.x + 1, center.y + 1)];

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
		new Point(center.x , center.y +1),
		new Point(center.x, center.y )];

	Shape.prototype.init.call(this, coords, "red");

}
        
// TU CÓDIGO AQUÍ: La clase O_Shape hereda de la clase Shape
O_Shape.prototype = Object.create(Shape.prototype);

// ============ S Shape ===========================
function S_Shape(center) {

	// TU CÓDIGO AQUÍ: Para programar S_Shape toma como ejemplo el código de la clase I_Shape 
	var coords = [new Point(center.x, center.y + 1),
		new Point(center.x -1 , center.y +1),
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
		new Point(center.x , center.y),
		new Point(center.x + 1 , center.y),
		new Point(center.x, center.y + 1)];
	
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


// ====================== BOARD ================

function Board(width, height) {
    this.width = width;
    this.height = height;
}

// CÓDIGO DADO
// Si la pieza nueva puede entrar en el tablero, pintarla y devolver true.
// Si no, devoler false
Board.prototype.draw_shape = function(shape){
    if (shape.can_move(this,0,0)){
        shape.draw();
        return true;
    }
    return false;
}

// En esta parte de la práctica devolveremos siempre 'true'
Board.prototype.can_move = function(x,y){
    return true;
}

// ==================== Tetris ==========================

function Tetris() {
    this.board = new Board(Tetris.BOARD_WIDTH, Tetris.BOARD_HEIGHT);
}

Tetris.SHAPES = [I_Shape, J_Shape, L_Shape, O_Shape, S_Shape, T_Shape, Z_Shape];
Tetris.DIRECTION = {'Left':[-1, 0], 'Right':[1, 0], 'Down':[0, 1]};
Tetris.BOARD_WIDTH = 10;
Tetris.BOARD_HEIGHT = 20;
Tetris.BOARD_COLOR='ivory';

Tetris.prototype.create_new_shape = function(){
	// TU CÓDIGO AQUÍ: 
	// Elegir un nombre de pieza al azar del array Tetris.SHAPES
	// Crear una instancia de ese tipo de pieza (x = centro del tablero, y = 0)
	// Devolver la referencia de esa pieza nueva
  	return new Tetris.SHAPES[Math.floor(Math.random() * Tetris.SHAPES.length)](new Point(Tetris.BOARD_WIDTH/2,0));

}

Tetris.prototype.init = function(){
    // CÓDIGO DADO
    // obtener una nueva pieza al azar y asignarla como pieza actual
        this.current_shape = this.create_new_shape()

   // TU CÓDIGO AQUÍ: 
	 // Pintar la pieza actual en el tablero
	// Aclaración: (Board tiene un método para pintar)
  	this.board.draw_shape(this.current_shape);


}

// ===== main ====

// canvas related variables
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// clear the canvas
ctx.fillStyle = 'white';
ctx.fillRect(0,0,canvas.width,canvas.height); // 



var game = new Tetris();
game.init();

test( "Existencia de Clases", function( assert ) {
  ok( game instanceof Tetris, "Passed!" );
});

test( "Existencia de atributo current_shape", function( assert ) {
  ok( game.current_shape instanceof Shape, "Es una pieza" );
  for (t of Tetris.SHAPES) 
      if (t.name == game.current_shape.constructor.name)
         equal(t, game.current_shape.constructor,"Es una de las 7 posibles");
});

test('pixel equal test', function(assert) {
    // assert.pixelEqual(canvas, x, y, r, g, b, a, message);
    // ctx.fillStyle = 'black';
    // ctx.fillRect(15*5*2+10,15,4,4);
    assert.pixelEqual(canvas, 15, 45, 255, 255, 255, 255, "White");
    assert.pixelNotEqual(canvas, 15*5*2+10, 10, 255, 255, 255, 255, "! White");
    
});
