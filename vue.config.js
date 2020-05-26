module.exports = {
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'static',
    devServer: {
        proxy: 'http://localhost:3001', //访问另外服务器的端口
    },
};
