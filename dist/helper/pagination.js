"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objectPagination = (objectPagination, query, countProducts) => {
    if (query.page) {
        objectPagination.currentPage = parseInt(query.page);
    }
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitPage;
    const totalPage = (countProducts / objectPagination.limitPage);
    objectPagination.totalPage = Math.ceil(totalPage);
    return objectPagination;
};
exports.default = objectPagination;
