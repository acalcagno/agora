/***
representa una conversacion entre muchos usuarios
es la entidad mas importante de este dominio
y se encargara de avisar a otras capas de la aplicacion
como el layout, red, o base de datos, los cambios
que sucedan en la misma.
****/

var Conversacion = function() {
	this.observadores = new Array();
	this.relaciones = new Array();

	this.ADHESION = new AccionDeAdherir();
	this.DISENTIMIENTO = new AccionDeDisentir();
};

Conversacion.prototype.iniciarCon = function(unComentario) {
	this.primerComentario = unComentario;
	this.observadores.forEach(function(observador) { observador.seInicioConversacion(unComentario); });
	return unComentario;
};

Conversacion.prototype.avisarCambiosA = function(unObservador) {
	this.observadores.push(unObservador);
	return unObservador;
};

Conversacion.prototype.disentirCon = function(unComentario) {
	this.ultimoComentario = unComentario;
	this.tipoDeRelacion = this.DISENTIMIENTO;
	return this;
};

Conversacion.prototype.adherirA = function(unComentario) {
	this.ultimoComentario = unComentario;
	this.tipoDeRelacion = this.ADHESION;
	return this;
};

Conversacion.prototype.comentando = function(unComentario) {
	this.relaciones.push([this.ultimoComentario, unComentario, this.tipoDeRelacion]);
	this.observadores.forEach(function(observador) { this.tipoDeRelacion.avisarAgregadoComentario(observador, this.ultimoComentario, unComentario) }, this);	
	return unComentario;
};

Conversacion.prototype.disintieronCon = function(unComentario) {
	return this.seRelacionanCon(unComentario, this.DISENTIMIENTO);
};

Conversacion.prototype.adhirieronA = function(unComentario) {
	return this.seRelacionanCon(unComentario, this.ADHESION);
};

Conversacion.prototype.seRelacionanCon = function(unComentario, tipoRelacion) {
	var relacionados = new Array();	
	this.relaciones.forEach(function(relacion) {
		if (relacion[0] == unComentario && relacion[2] == tipoRelacion) {
			relacionados.push(relacion[1]);
		};
	});
	return relacionados;
};
