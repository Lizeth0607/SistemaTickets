const {createProxyMiddleware} = require("http-proxy-middleware");
//74.208.31.248
//70.35.195.177
module.exports = app => {
app.use("/MxExoticCarsMx", createProxyMiddleware({target: "http://localhost/127.0.0.1", changeOrigin: true}));
// app.use("/expediente", createProxyMiddleware({target: "http://70.35.195.177:8080", changeOrigin: true}));
// app.use("/servicio", createProxyMiddleware({target: "http://70.35.195.177:8080", changeOrigin: true}));
// app.use("/envia", createProxyMiddleware({target: "http://74.208.31.248", changeOrigin: true}));
//app.use("/expediente", createProxyMiddleware({target: "http://70.35.195.177:8080", changeOrigin: true}));
};
