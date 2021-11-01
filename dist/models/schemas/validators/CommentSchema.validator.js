"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCommentSchema = exports.CreateCommentSchema = void 0;
var yup_1 = require("yup");
exports.CreateCommentSchema = (0, yup_1.object)().shape({
    content: (0, yup_1.string)().required(),
    docId: (0, yup_1.number)().required(),
});
exports.UpdateCommentSchema = (0, yup_1.object)().shape({
    content: (0, yup_1.string)().required(),
    id: (0, yup_1.number)().required(),
});
//# sourceMappingURL=CommentSchema.validator.js.map