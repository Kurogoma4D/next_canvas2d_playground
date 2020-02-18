const nextConfig = {
  webpack: (config, {}) => {
    config.externals = config.externals || [];
    config.externals.push({
      createjs: "createjs"
    });
    return config;
  },

  exportTrailingSlash: true,
  exportPathMap: function() {
    return {
      "/": { page: "/" }
    };
  }
};

module.exports = nextConfig;
