import jsonServer from 'json-server';
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Custom middleware to handle PATCH requests
server.use(jsonServer.rewriter({
  '/products': '/products/:id'
}));

server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running');
});