const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cons = require('../constants');

const {
    register,
    login,
    logout,
    comparePassword
} = require('../controllers/userControllers/authentication');

jest.mock('bcrypt', () => ({
    hash: jest.fn().mockResolvedValue('hashed_password'),
    compare: jest.fn().mockResolvedValue(true),
}));
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn().mockResolvedValue('7websassignment'),
    verify: jest.fn(),
}));


describe('Authentication Controllers', () => {
    describe('register', () => {
        it('should register a new user', async () => {
            const req = {
                body: {
                    username: 'testuser',
                    email: 'JGwzA@example.com',
                    password: 'testpassword'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            User.prototype.save = jest.fn().mockResolvedValue();
            await register(req, res, next);
            expect(res.status).toHaveBeenCalledWith(cons.ok);
            expect(res.json).toHaveBeenCalledWith({ message: cons.success });

        })
    })
    describe('login', () => {
        
        it('should login an existing user', async () => {
            const req = {
                body: {
                    email: 'JGwzA@example.com',
                    password: 'testpassword'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
                cookie: jest.fn()
            };
            const next = jest.fn();
    
            const mockUser = {
                _id: 'user_id',
                email: 'JGwzA@example.com',
                password: 'hashed_password' 
            };
    
            const mockToken = '7websassignment';
    
            User.findOne = jest.fn().mockResolvedValue(mockUser);
            createToken = jest.fn().mockResolvedValue(mockToken);
    
            await login(req, res, next);
    
            expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
            expect(res.cookie).toHaveBeenCalledWith('jwt', mockToken, { maxAge: 1000 * 60 * 60 * 24 }); // Assuming expirydate is set to 24 hours in the login function
            expect(res.status).toHaveBeenCalledWith(cons.ok);
            expect(res.json).toHaveBeenCalledWith({ token: mockToken, message: cons.success });
        });
        
        it('should handle non-existing user', async () => {
            const req = {
                body: {
                    email: 'nonexistent@example.com',
                    password: 'testpassword'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();
    
            User.findOne = jest.fn().mockResolvedValue(null);
    
            await login(req, res, next);
    
            expect(res.status).toHaveBeenCalledWith(cons.badrequest);
            expect(res.json).toHaveBeenCalledWith(cons.nouser);
        });
    
        it('should handle errors', async () => {
            const req = {
                body: {
                    email: 'JGwzA@example.com',
                    password: 'testpassword'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();
    
            User.findOne = jest.fn().mockRejectedValue(new Error('Database error'));
    
            await login(req, res, next);
    
            expect(next).toHaveBeenCalledWith(new Error('Database error'));
        });
    });

    describe('logout', () => {
        it('should logout the user', async () => {
            const req = {
                body: {
                    token: '7websassignment'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
                cookie: jest.fn()
            };
            const next = jest.fn();
    
            await logout(req, res, next);
    
            expect(res.status).toHaveBeenCalledWith(cons.ok);
            expect(res.json).toHaveBeenCalledWith(cons.logout);
        });
    });
    

})