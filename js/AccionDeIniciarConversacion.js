var AccionDeIniciarConversacion = function() {

};

AccionDeIniciarConversacion.prototype.realizadaCon = function (unComentario) {
	w2popup.unlock(); 
	w2popup.close(); 
	window.conversacion.iniciarCon(unComentario);
};

AccionDeIniciarConversacion.prototype.avisarAgregadoComentario = function (observador, ultimoComentario, unComentario) {
	//observador.disienteCon(ultimoComentario, unComentario);
};
