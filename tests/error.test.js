
const cons = require('../constants');
const ifError = require('../middlewares/errorMiddleware');

describe("error middleware", () => {
    it("should send conflict status if error code is mongoerror", async () => {
        const err = {
            code: cons.mongoerror
        };
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        const next = jest.fn();
        ifError(err, req, res, next);
        expect(res.status).toHaveBeenCalledWith(cons.conflict);
        expect(res.send).toHaveBeenCalledWith(cons.userexists);
    });

    it("should send internal server error status if error code is not mongoerror", async () => {
        const err = {
            code: "someerror"
        };
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        const next = jest.fn();
        ifError(err, req, res, next);
        expect(res.status).toHaveBeenCalledWith(cons.internalServerError);
        expect(res.send).toHaveBeenCalledWith('Internal Server Error');
    });

    it("should call next if there is no error", async () => {
        const err = null;
        const req = {};
        const res = {};
        const next = jest.fn();
        ifError(err, req, res, next);
        expect(next).toHaveBeenCalled();
    });
});