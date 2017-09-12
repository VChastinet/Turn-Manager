 module.exports = function(app) {

	var api = app.api.party;

	app.route('/party/')
		.get(api.lista);

    app.route('/party/')
        .post(api.insere);
};
