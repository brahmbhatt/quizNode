const server = require('../../server');

describe('check server response code', () => {
  test('/quiz/getDbInfo should respond with status code 200', (done) => {
    server.inject('/quiz/getDbInfo', (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
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
  test('/quiz/getDbInfo should respond 1', (done) => {
    server.inject('/quiz/getDbInfo', (response) => {
      expect(response.result).toBe('1');
      done();
    });
  });
});
