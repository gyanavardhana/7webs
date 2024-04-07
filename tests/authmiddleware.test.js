const jwt = require('jsonwebtoken');
const cons = require('../constants');
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn().mockResolvedValue('sahfhasfhakshfkdhfa'),
    verify: jest.fn(),
}));
const {
    checkAuthenticated,
    checkNotAuthenticated
} = require('../middlewares/authenticationMiddleware');

describe('Authentication Middleware', () => {
    describe('checkAuthenticated', () => {
        it('should return unauthorized if token is not present', async () => {
            const req = {
                body: {}
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            const next = jest.fn();
            checkAuthenticated(req, res, next);
            expect(res.status).toHaveBeenCalledWith(cons.unauthorized);
            expect(res.send).toHaveBeenCalledWith(cons.invalidLogin);
        });

        it('should return unauthorized if token is not valid', async () => {
            const req = {
                body: {
                    jwt: 'sahfhasfhakshfkdhfa'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            const next = jest.fn();
            jwt.verify.mockImplementation(() => {
                throw new Error();
            });
            checkAuthenticated(req, res, next);
            expect(res.status).toHaveBeenCalledWith(cons.conflict);
            expect(res.send).toHaveBeenCalledWith(cons.expired);
        });

        it('should call next if token is valid', async () => {
            const req = {
                body: {
                    jwt: 'sahfhasfhakshfkdhfa'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            const next = jest.fn();
            jwt.verify.mockImplementation(() => {
                return {
                    userId: '123'
                };
            });
            checkAuthenticated(req, res, next);
            expect(next).toHaveBeenCalled();
        });
    });

    describe('checkNotAuthenticated', () => {
        it('should return conflict if token is present', async () => {
            const req = {
                body: {
                    jwt: 'sahfhasfhakshfkdhfa'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            const next = jest.fn();
            jwt.verify.mockImplementation(() => {
                return {
                    userId: '123'
                };
            });
            checkNotAuthenticated(req, res, next);
            expect(res.status).toHaveBeenCalledWith(cons.conflict);
            expect(res.send).toHaveBeenCalledWith(cons.success);
        });

        it('should call next if token is not present', async () => {
            const req = {
                body: {}
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            const next = jest.fn();
            checkNotAuthenticated(req, res, next);
            expect(next).toHaveBeenCalled();
        });
    });
});