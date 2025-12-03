module.exports = {
  apps: [
    {
      name: "bienestar-app",
      script: "npm",
      args: "start",
      port: 3001,
      env: {
        NODE_ENV: "production",
        PORT: 3001
      }
    }
  ]
};
