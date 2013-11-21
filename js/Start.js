$(function() {
	var anotador = new Anotador();
	var layout = new Layout(new CreadorDePaneles(anotador));
	var conversacion = new Conversacion();
	conversacion.avisarCambiosA(layout);

	window.conversacion = conversacion;
	anotador.iniciar();
});

