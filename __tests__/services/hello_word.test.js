const hello_service = require('../../src/services/hello_world');
describe('Hello service', () => {
    it('should return hello world', () => {
        const greeting = hello_service();
        expect(greeting).toEqual('hello_world');
    })
})