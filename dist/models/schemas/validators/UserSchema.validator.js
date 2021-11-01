"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserPasswordSchema = exports.UpdateUserSchema = exports.CreateUserSchema = void 0;
var yup_1 = require("yup");
exports.CreateUserSchema = (0, yup_1.object)().shape({
    firstname: (0, yup_1.string)().required().max(40),
    lastname: (0, yup_1.string)().required().max(40),
    email: (0, yup_1.string)().email().required().max(60),
    password: (0, yup_1.string)().required().min(4).max(16),
});
exports.UpdateUserSchema = (0, yup_1.object)().shape({
    firstname: (0, yup_1.string)().optional().max(40).min(2),
    lastname: (0, yup_1.string)().optional().max(40).min(2),
    email: (0, yup_1.string)().email().optional().max(60),
    id: (0, yup_1.number)().required(),
});
exports.UpdateUserPasswordSchema = (0, yup_1.object)().shape({
    password: (0, yup_1.string)().required().min(4).max(16),
    confirmPassword: (0, yup_1.string)().test("password-match", "Password must match", function (value) {
        return this.parent.password === value;
    }),
    id: (0, yup_1.number)().required(),
});
//# sourceMappingURL=UserSchema.validator.js.map