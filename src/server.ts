import logger from  "./helpers/logger";
import app from "./app";

const server = app.listen(
    app.get("port"),
    app.get("host"),
    function () {
      const {address, port} = this.address();
      logger.getLogger().info(`App is running at http://${address}:${port} in ${app.get("env")} mode`);
    });

export default server;