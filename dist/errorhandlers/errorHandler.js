"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const errorHandler = (err, _, res, next) => {
    console.log(err.stack);
    let customError = {
        statusCode: err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong try again later',
    };
    return res.status(customError.statusCode).json({ errorMsg: customError.msg });
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map