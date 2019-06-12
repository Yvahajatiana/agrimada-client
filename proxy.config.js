const PROXY_CONFIG = [
  {
      context: [
          "/api",
          "/oauth"
      ],
      target: "http://127.0.0.1:8000",
      secure: true,
      changeOrigin: true
  }
];

module.exports = PROXY_CONFIG;
