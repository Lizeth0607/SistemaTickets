const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = app => {
app.use("/MxExoticCarsMx", createProxyMiddleware({target: "http://localhost/127.0.0.1", changeOrigin: true}));

};
