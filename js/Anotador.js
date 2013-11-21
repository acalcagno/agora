/***
Es la metafora de la persona que toma nota de lo que dice el usuario.
Será implementado tecnicamente como un popup.
***/

var Anotador = function() {
};
	
Anotador.prototype.usuarioAdhiere = function(event) {
	this.pedirComentario('new AccionDeAdherir(\''+ event.currentTarget.parentElement.innerText +'\')');
};

Anotador.prototype.usuarioDisiente = function(event) {
	this.pedirComentario('new AccionDeDisentir(\''+ event.currentTarget.parentElement.innerText +'\')');
};

Anotador.prototype.iniciar = function() {
	this.pedirComentario('new AccionDeIniciarConversacion()');
};

Anotador.prototype.pedirComentario = function popup(accion) {
	w2popup.open({
		title		: 'Ingrese Comentario',
		body		: '<div style="padding: 10px; line-height: 150%"><textarea id="textarea_comentario" rows="15" cols="67"></textarea>',
		buttons		: '<input type="button" value="Cancelar" onclick="w2popup.close();"> '+
					  '<input type="button" value="Comentar" onclick="w2popup.lock(\'Guardando\', true); '+
					  '		setTimeout(' + accion + '.realizadaCon(textarea_comentario.value), 500);">',
		width		: 600,
		height		: 368,
		overflow	: 'hidden',
		color		: '#333',
		speed		: '0.3',
		opacity		: '0.8',
		modal		: true,
		showClose	: true,
		showMax		: true,
		onOpen		: function (event) { console.log('open'); },
		onClose		: function (event) { console.log('close'); },
		onMax		: function (event) { console.log('max'); },
		onMin		: function (event) { console.log('min'); },
		onKeydown	: function (event) { console.log('keydown'); }
	});
};


