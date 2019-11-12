import express from "express";
import path from "path";
import bodyParser from "body-parser";
import fs from "fs";

const server = express();

const webpack = require("webpack");
const config = require("../config/webpack.dev.js");
const compiler = webpack(config);

const webpackDevMiddleware = require("webpack-dev-middleware")(
  compiler,
  {
    writeToDisk: (filePath) => {
      // instruct the dev server to the home.html file to disk 
      // so that the route handler will be able to read it 
      return /.+\.html$/.test(filePath);
    }
  }
  // config.devServer,

)
const webpackHotMiddleware = require("webpack-hot-middleware")(compiler);

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

server.use(webpackDevMiddleware);
server.use(webpackHotMiddleware);

server.use(urlencodedParser);
server.use('/images', express.static('/src/images'))
const staticMiddleware = express.static("/dist");
server.use(staticMiddleware);

server.post('/update-name', (req, res, next) => {

  const { name } = { ...req.body };

  const data = JSON.stringify({
    name: name,
    title: name
  });

  const routePath = '/'
  updateTemplate(res, data, routePath)
})
server.get('/', (req, res, next) => {
  debugger
  res.sendFile(path.resolve(__dirname, '../dist/home.html'))
})

server.listen(8080, () => {
  console.log("Server is listening")
})

function updateTemplate(res, data, routePath) {
  fs.writeFileSync(path.resolve(__dirname, '../params.json'), data);
  res.redirect(routePath)
}