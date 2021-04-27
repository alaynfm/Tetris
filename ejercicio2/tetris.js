// ************************************
// *     EJERCICIO 1                   *
// ************************************

// ============== Point =======================

function Point (x, y) {
	
	this.x = x;
	this.y = y;    
}


// ============== Rectangle ====================
function Rectangle() {
}


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

// ============== Block ===============================

function Block (pos, color) {
        
	this.BLOCK_SIZE = 30;
	this.OUTLINE_WIDTH = 2;
	tamano = this.BLOCK_SIZE + this.OUTLINE_WIDTH;
	Rectangle.prototype.init.call(this,new Point(pos.x * 30, pos.y*30), new Point((pos.x +1)* 30,(pos.y + 1)*30));	
	this.color = color;

}


Block.BLOCK_SIZE = 30;
Block.OUTLINE_WIDTH = 2;

// TU CÓDIGO: emplea el patrón de herencia (Block es un Rectangle)
Block.prototype = Object.create(Rectangle.prototype);

// ************************************
// *      EJERCICIO 2                  *
// ************************************

// ============== Shape ===================================

function Shape() {}


Shape.prototype.init = function(coords, color) {

	// TU CÓDIGO AQUÍ: método de inicialización de una Pieza del tablero
	// Toma como parámetros: coords, un array de posiciones de los bloques
	// que forman la Pieza y color, un string que indica el color de los bloques
	// Post-condición: para cada coordenada, crea un bloque de ese color y lo guarda en un bloque-array.

	
	//crear un array de bloques
	this.myBlocks = [];
	for (var i = 0; i < coords.length; i++) {
		this.myBlocks.push(new Block(coords[i],color));
	 }
	 
};

Shape.prototype.draw = function() {

	// TU CÓDIGO AQUÍ: método que debe pintar en pantalla todos los bloques
	// que forman la Pieza

	//llama al array de bloques y lo pinta uno a uno
	for (var i = 0; i < this.myBlocks.length; i++) {
		this.myBlocks[i].draw();
		
	 }
};


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