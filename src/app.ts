import express from "express";
import bodyParser from "body-parser";
import path from "path";

import IBMCloudEnv = require("ibm-cloud-env");
(global as NodeJS.Global).cloudEnv = IBMCloudEnv;
(global as NodeJS.Global).cloudEnv.init("/credentials/mapping.json");

import healthRoutes from "./routes/health-route";
import swaggerRoutes from "./routes/swagger-route";
import smsRoutes from "./routes/sms-route";
import watsonRoutes from "./routes/watson-route";

const app = express();
app.set("host",  process.env.HOST || "127.0.0.1");
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);
app.use("/health", healthRoutes);
app.use("/swagger", swaggerRoutes);
app.use("/sms", smsRoutes);
app.use("/watson", watsonRoutes);

app.all("", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../public", "index.html"));
});

export default app;