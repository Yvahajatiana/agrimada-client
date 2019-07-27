const PROXY_CONFIG = [
  {
      context: [
          "/api",
          "/oauth",
          "/config"
      ],
      target: "https://agrimada-laravel.test",
      secure: false,
      changeOrigin: true
  }
];

module.exports = PROXY_CONFIG;
