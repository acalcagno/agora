describe("un creador de paneles", function() {

	var unComentario;
	var creador_paneles;
	var anotador;

	beforeEach(function() {
		unComentario = 'El aborto deberia ser legal';
		anotador = new Anotador();
		creador_paneles = new CreadorDePaneles(anotador);
	});

	describe("crea un panel", function() {

		it("con el texto del comentario", function() {
			var panel_obtenido = creador_paneles.conTexto(unComentario).build();

			expect(panel_obtenido.text()).toEqual(unComentario);
		});

		it("del color de un comentario positivo", function() {

			var panel_obtenido = creador_paneles.positivo().build();

			expect(panel_obtenido.css("background")).toEqual('rgb(204, 255, 204)');
		});

		it("del color de un comentario negativo", function() {

			var panel_obtenido = creador_paneles.negativo().build();

			expect(panel_obtenido.css("background")).toEqual('rgb(255, 204, 204)');
		});

		describe("con la botonera", function() {

			it("de dos botones", function() {

				var panel_obtenido = creador_paneles.positivo().build();	

				expect(panel_obtenido.children().length).toEqual(2);

			});		

			it("y el boton pide al usuario un comentario cuando este adhiere", function() {
				spyOn(anotador, 'usuarioAdhiere');

				var panel_obtenido = creador_paneles.positivo().build();
				var click = jQuery.Event('click');

				panel_obtenido.children()[1].click();

				expect(anotador.usuarioAdhiere).toHaveBeenCalled();
			});
		});
	});
});

describe("cuando se esta conversando", function() {
	var conversacion;
	var unComentario;

	beforeEach(function() {
		conversacion = new Conversacion();	
		unComentario = 'El aborto deberia ser legal';
	});	

	describe("la conversacion", function() {

		it("se puede iniciar con un comentario", function() {
			conversacion.iniciarCon(unComentario);
	
			expect(conversacion.primerComentario).toEqual(unComentario);
		});

		it("se puede continuar con un segundo comentario que disienta del primero", function() {
			conversacion.iniciarCon(unComentario);
			var otroComentario = "No deberia ser legal, del mismo modo que asesinar no lo es.";
		
			conversacion.disentirCon(unComentario).comentando(otroComentario);

			expect(conversacion.disintieronCon(unComentario).length).toEqual(1);
			expect(conversacion.disintieronCon(unComentario)[0]).toEqual(otroComentario);
		});

		it("se puede continuar con un segundo comentario que adhiera al primero", function() {
			conversacion.iniciarCon(unComentario);
			var otroComentario = "Hasta cierto punto, el bebe no siente nada.";
		
			conversacion.adherirA(unComentario).comentando(otroComentario);

			expect(conversacion.adhirieronA(unComentario).length).toEqual(1);
			expect(conversacion.adhirieronA(unComentario)[0]).toEqual(otroComentario);
		});

		describe("informa a quienes esten atentos", function() {
			var observador = {};
			beforeEach(function() {
			
				observador.seInicioConversacion = function(unComentario) { };
				observador.adhiereA = function(unComentario) { };
				observador.adhiereA = function(unComentario) { };
				conversacion.avisarCambiosA(observador);
			});	

			it("el inicio con un primer comentario", function() {
				spyOn(observador, 'seInicioConversacion');
	
				conversacion.iniciarCon(unComentario);

				expect(observador.seInicioConversacion).toHaveBeenCalledWith(unComentario);
			});

			it("el agregado de un segundo comentario", function() {
				spyOn(observador, 'adhiereA');

				var otroComentario = "Hasta cierto punto, el bebe no siente nada.";
				conversacion.iniciarCon(unComentario);
				conversacion.adherirA(unComentario).comentando(otroComentario);

				expect(observador.adhiereA).toHaveBeenCalledWith(unComentario, otroComentario);
			});
		});
	});

	describe("en el layout", function() {

		var layout;
		var anotador;

		beforeEach(function() {
		
			anotador = new Anotador();
			creador_paneles = new CreadorDePaneles(anotador);
			layout = new Layout(creador_paneles);
			$("body .comentario").remove();
		});

		describe("al agregar mas comentarios", function() {

			it("puede agregar un primer comentario", function() {
				var comentario = 'El aborto deberia ser legal.';
				layout.seInicioConversacion(comentario);

				expect($("body .comentario").size()).toEqual(1);
				expect($("body .comentario")[0].innerText).toEqual(comentario);
			});

			it("puede agregar un segundo comentario", function() {

				var primerComentario = 'El aborto deberia ser legal.';
				var segundoComentario = 'Hasta cierto punto, el bebe no siente nada.';
				layout.seInicioConversacion(primerComentario);
				layout.adhiereA(primerComentario, segundoComentario);

				var paneles = $("body .comentario");
				expect(paneles.size()).toEqual(2);

				expectPanelCorrecto(0, 'auto', primerComentario, paneles);
				expectPanelCorrecto(1, '104px', segundoComentario, paneles);
			});

			it("puede agregar un tercer comentario", function() {

				var primerComentario = 'El aborto deberia ser legal.';
				var segundoComentario = 'No deberia ser legal, del mismo modo que asesinar no lo es.';
				var tercerComentario = 'Un aborto temprano, no es un asesinato.';
				layout.seInicioConversacion(primerComentario);
				layout.adhiereA(primerComentario, segundoComentario);
				layout.adhiereA(segundoComentario, tercerComentario);

				var paneles = $("body .comentario");
				expect(paneles.size()).toEqual(3);
			
				expectPanelCorrecto(0, 'auto', primerComentario, paneles);
				expectPanelCorrecto(1, '104px', segundoComentario, paneles);
				expectPanelCorrecto(2, '200px', tercerComentario, paneles);
			});

			function expectPanelCorrecto(nroPanel, top, comentario, paneles) {
				var panel = $(paneles[nroPanel]); 
				expect(paneles[nroPanel].innerText).toEqual(comentario);
				expect(panel.css("top")).toEqual(top);
			};
		});
	});
});

