const nextConfig = {
  webpack: (config, {}) => {
    config.externals = config.externals || [];
    config.externals.push({
      createjs: "createjs"
    });
    return config;
  }
};

module.exports = nextConfig;
