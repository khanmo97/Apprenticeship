const request = require('supertest')
const app = require('../src/server')

const testRequest = (description, reqObject, resObject, statusCode) => {
	it(description, async () => {
		const res = await request(app)
			.post('/test')
			.set({'Content-Type': 'application/json'})
			.send(reqObject)
		expect(res.statusCode).toEqual(statusCode)
		expect(res.body).toMatchObject(resObject)
	})
}
describe('API response test', () => {
	testRequest('should return every 3rd character', {string_to_cut: '123456789'}, {return_string: '369'}, 200);
	testRequest('should allow empty string', {string_to_cut: ''}, {return_string: ''}, 200);
	testRequest('should allow trailing characters', {string_to_cut: '12345678901'}, {return_string: '369'}, 200);
	testRequest('should error for invalid object', 'notjson', {
		error: {
			expose: true,
			statusCode: 400,
			status: 400,
			body: 'notjson',
			type: 'entity.parse.failed'
		}
	}, 400);
	testRequest('should error for missing string_to_cut property', {}, {
		error: {
			expose: true,
			statusCode: 400,
			status: 400,
			body: {},
			type: 'missing.property.string_to_cut'
		}
	}, 400);
});
describe('Headers test', () => {
	it('should have content type json', async () => {
		const res = await request(app)
			.post('/test')
			.send('');
		expect(res.statusCode).toEqual(415);
		expect(res.body).toEqual({});
	})
});

