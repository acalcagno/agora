/***
representa la pantalla sobre la cual
se despliegan las notas que los usuarios
van agregando a la conversacion.
****/
var Layout = function(un_creador_de_paneles) {
	this.anotador = un_creador_de_paneles.anotador;
	this.comentarios = new Array();
	this.creador_paneles = un_creador_de_paneles;
};

Layout.prototype.disintio = function() {
	this.anotador.tomaNotaAlUsuario();
};

Layout.prototype.adhirio = function() {
	this.anotador.tomaNotaAlUsuario();
};

Layout.prototype.seInicioConversacion = function(comentario) {
	var panel = this.creador_paneles.positivo().conTexto(comentario).build();
	$("body").append(panel);
};

Layout.prototype.adhiereA = function(unComentario, otroComentario) {
	var panel = this.creador_paneles.positivo().conTexto(otroComentario).debajoDe(unComentario).build();
	$("body").append(panel);
};

Layout.prototype.disienteCon = function(unComentario, otroComentario) {
	var panel = this.creador_paneles.negativo().conTexto(otroComentario).debajoDe(unComentario).build();
	$("body").append(panel);
};

