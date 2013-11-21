var AccionDeAdherir = function(comentarioAlCualAdhiere) {
	this.comentarioAnterior = comentarioAlCualAdhiere;	
};

AccionDeAdherir.prototype.realizadaCon = function (unComentario) {
	w2popup.unlock(); 
	w2popup.close(); 	
	window.conversacion.adherirA(this.comentarioAnterior).comentando(unComentario);
};

AccionDeAdherir.prototype.avisarAgregadoComentario = function (observador, ultimoComentario, unComentario) {
	observador.adhiereA(ultimoComentario, unComentario);
};

