const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(function(req, res, next) {
	res.setHeader( 'Access-Control-Allow-Origin', 'http://localhost:3000' );
	res.setHeader( 'Access-Control-Allow-Methods', 'POST' );
	res.setHeader( 'Access-Control-Allow-Headers', 'Content-Type' );
	next();
});
app.use((req, res, next) => {
	if (!req.is( 'json')) {
		res.sendStatus(415);
	} else {
		next();
	}
});
app.use(bodyParser.json())
app.post('/test', (req, res, next) => {
	if (!req.body.hasOwnProperty('string_to_cut')) {
		next({
			expose: true,
			statusCode: 400,
			status: 400,
			body: req.body,
			type: 'missing.property.string_to_cut'
		});
	} else {
		let return_string = '';
		for (let i = 2; i < req.body.string_to_cut.length; i += 3) {
			return_string += req.body.string_to_cut.charAt(i)
		}
		res.status(200);
		res.send({return_string});
	}
});
app.use(async (err, req, res, next) => {
	res.status(400).send({ error: err });
});

module.exports = app