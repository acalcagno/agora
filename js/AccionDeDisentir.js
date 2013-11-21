var AccionDeDisentir = function(comentarioSobreElCualDisiente) {
	this.comentarioAnterior = comentarioSobreElCualDisiente;
};

AccionDeDisentir.prototype.realizadaCon = function (unComentario) {
	w2popup.unlock(); 
	w2popup.close(); 
	window.conversacion.disentirCon(this.comentarioAnterior).comentando(unComentario);
};

AccionDeDisentir.prototype.avisarAgregadoComentario = function (observador, ultimoComentario, unComentario) {
	observador.disienteCon(ultimoComentario, unComentario);
};
