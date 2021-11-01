"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pagination = /** @class */ (function () {
    function Pagination(page, pageSize) {
        this.page = page;
        this.pageSize = pageSize;
    }
    Pagination.prototype.getPager = function (totalItems) {
        return {
            start: this.pageSize * (this.page - 1),
            end: this.pageSize * this.page,
            pages: Math.ceil(totalItems / this.pageSize),
        };
    };
    return Pagination;
}());
exports.default = Pagination;
//# sourceMappingURL=Pagination.js.map