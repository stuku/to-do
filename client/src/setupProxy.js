const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `http://backend:${process.env.NODE_PORT || 8080}`,
      // target: `http://localhost:${process.env.NODE_PORT || 8080}`, // Use this if you're not using docker
      secure: false,
      changeOrigin: true,
      headers: {
        Connection: 'keep-alive',
      },
    })
  );
};
