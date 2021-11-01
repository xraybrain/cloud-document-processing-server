"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShareDocumentSchema = void 0;
var yup_1 = require("yup");
exports.ShareDocumentSchema = (0, yup_1.object)().shape({
    docId: (0, yup_1.string)().required(),
    user: (0, yup_1.number)().required(),
});
//# sourceMappingURL=ShareDocumentShema.validator.js.map