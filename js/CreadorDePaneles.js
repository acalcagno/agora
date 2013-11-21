/***
es el que crea los paneles (tarjetitas) con
los comentarios de los usuarios que se agregaran 
al layout para visualizar la conversacion
***/
var CreadorDePaneles = function(unAnotador) {
	this.anotador = unAnotador;
};

CreadorDePaneles.prototype.conTexto = function(nuevoTexto) {
	this.texto = nuevoTexto;
	return this;
};

CreadorDePaneles.prototype.positivo = function() {
	this.color = "#CFC";
	return this;
};

CreadorDePaneles.prototype.negativo = function() {
	this.color = "#FCC";
	return this;
};


CreadorDePaneles.prototype.boton = function(id, cssClass, clickHandler) {
	var boton = $('<img id="' + id + '" class="botones-comentario ' + cssClass + '">');
	boton.click(clickHandler); 
	return boton;
};

CreadorDePaneles.prototype.build = function() {
	var result = $('<div></div>', { text: this.texto });
	result.addClass("comentario");
	result.append(this.boton('1', 'boton-disentir', this.anotador.usuarioDisiente.bind(this.anotador)));
	result.append(this.boton('2', 'boton-adherir', this.anotador.usuarioAdhiere.bind(this.anotador)));
	result.css("background", this.color);
	result.css("top", this.top);

	return result;
};

CreadorDePaneles.prototype.debajoDe = function(comentarioPrevio) {
	var panelPrevio = $(".comentario:contains('" + comentarioPrevio + "')");
	var topPrevio = panelPrevio.css("top");
	topPrevio = parseInt(topPrevio, 10) ;	
	if (isNaN(topPrevio)) { topPrevio = 8 };
	this.top = topPrevio + 96;

	return this;
};
