const server = require('../../server');

describe('check server response code', () => {
  test('/quiz/saveQueExx should respond with status code 200', (done) => {
    const request = {
      method: 'POST',
      url: '/quiz/saveQueExx',
    };
    server.inject(request, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  test('/quiz/getQueDb should respond with status code 200', (done) => {
    server.inject('/quiz/getQueDb', (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});
