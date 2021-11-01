import path from "path";
import { Application, NextFunction, Request, Response } from "express";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import Route from "./routes/Routes";
import { PrismaClient } from "@prisma/client";
import { deserializeUser } from "./middlewares/deserializeUser";
import { refreshExpiredToken } from "./middlewares/refreshExpiredToken";
import exphbs from "express-handlebars";

dotenv.config();

class App {
  private app: Application;
  private port: string;
  private prisma: PrismaClient;

  constructor() {
    this.app = express();
    this.port = `${process.env.PORT}`;
    this.prisma = new PrismaClient();
    this.settings();
    this.init();

    new Route(this.app);
    this.app.all("*", (req: Request, res: Response, next: NextFunction) => {
      console.log("app toute");
      res.sendFile(path.resolve(__dirname, "../client/index.html"));
    });
  }

  settings() {
    this.app.use(express.static(path.join(__dirname, "../public")));
    this.app.use(express.static(path.join(__dirname, "../client")));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(
      cors({
        allowedHeaders: "*",
        exposedHeaders: ["X-Access", "X-Refresh"],
      })
    );
    this.app.use(morgan("dev"));
    this.app.engine("hbs", exphbs({ defaultLayout: "main", extname: "hbs" }));
    this.app.set("view engine", "hbs");
    this.app.set("views", path.join(__dirname, "../views"));
    this.app.use(refreshExpiredToken);
    this.app.use(deserializeUser);
  }

  init() {
    this.app.listen(this.port, () => {
      console.log(`Server is listening on port::${this.port}`);
    });
    this.prisma
      .$connect()
      .then(() => console.log(`connected to db`))
      .catch((reason) => console.log(`failed to connect to db`));
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }
}

function main() {
  new App();
}

main();
