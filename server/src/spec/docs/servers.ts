module.exports = {
  servers: [
    {
      url: `http://localhost:${process.env.NODE_PORT || 8080}`,
      description: 'Local server',
    },
  ],
};
