export default class Pagination {
  constructor(public page: number, public pageSize: number) {}

  getPager(totalItems: number) {
    return {
      start: this.pageSize * (this.page - 1),
      end: this.pageSize * this.page,
      pages: Math.ceil(totalItems / this.pageSize),
    };
  }
}
