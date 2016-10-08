"use strict";
var DEFAULT_SIZE = 5;
var Pagination = (function () {
    function Pagination() {
        this.page = 0;
        this.size = DEFAULT_SIZE;
    }
    Pagination.prototype.next = function () { ++this.page; };
    ;
    Pagination.prototype.previous = function () { if (this.page != 0)
        --this.page; };
    ;
    Pagination.prototype.rewind = function () { this.page = 0; };
    ;
    return Pagination;
}());
exports.Pagination = Pagination;
//# sourceMappingURL=pagination.js.map