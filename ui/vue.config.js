module.exports = {
  devServer: {
    port: 8081,
    allowedHosts: 'all',
  },
  transpileDependencies: [
    "vuetify"
  ],
  pwa: {
    name: 'NUVPN Dashboard',
  }
};
