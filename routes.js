const { saveBuku, getAll, getById, deleteBuku } = require('./service');

const routes = [
  {
    method: 'GET',
    path: '/books',
    handler : getAll
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler : getById
  },
  {
    method: 'POST',
    path: '/books',
    handler : saveBuku
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler : saveBuku
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler : deleteBuku
  },
];

module.exports = routes;