module.exports = {
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 8080}`,
      description: 'Local server',
    },
  ],
};
