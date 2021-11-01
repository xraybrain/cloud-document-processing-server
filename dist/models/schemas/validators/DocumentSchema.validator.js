"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StarDocumentsSchema = exports.RenameDocumentsSchema = exports.UpdateDocumentsSchema = exports.CreateFolderSchema = void 0;
var yup_1 = require("yup");
exports.CreateFolderSchema = (0, yup_1.object)().shape({
    name: (0, yup_1.string)().required().max(150),
    folderId: (0, yup_1.number)().optional(),
});
exports.UpdateDocumentsSchema = (0, yup_1.object)().shape({
    docsId: (0, yup_1.array)().required().of((0, yup_1.string)().required()),
    folderId: (0, yup_1.number)().optional(),
});
exports.RenameDocumentsSchema = (0, yup_1.object)().shape({
    id: (0, yup_1.string)().required(),
    name: (0, yup_1.string)().required(),
});
exports.StarDocumentsSchema = (0, yup_1.object)().shape({
    docId: (0, yup_1.string)().required(),
    star: (0, yup_1.boolean)().required(),
});
//# sourceMappingURL=DocumentSchema.validator.js.map