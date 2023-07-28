const consola = require("consola");
const { Nuxt, Builder } = require("nuxt");
const { app, server } = require("./app");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const router = require("./router/index");
const errorMiddleware = require ('./middlewares/error-middleware')

const config = require("../nuxt.config.js");
config.dev = process.env.NODE_ENV !== "production";

app.use(express.json());
app.use(cookieParser());
app.use(cors(
  {credentials: true,
  origin: process.env.CLIENT_URL}
));
app.use("/api", router);
app.use(errorMiddleware);


// ДЕКОМПОЗИРОВАТЬ НА РАЗНЫЕ ФАЙЛЫ, РАЗДЕЛИТЬ СЕРВЕРА  


async function start() {
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server;

  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  app.use(nuxt.render);

  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MDB connected");
    server.listen(port, () => {
      consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true,
      });
    });
  } catch (e) {
    console.log(e);
  }
}
start();
