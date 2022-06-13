import Event from "../../../lib/classes/Event";
import ExtendedClient from "../../../lib/extensions/ExtendedClient";

export default new Event("ready", (client: ExtendedClient) => {
    client.logger.info(`Connected to client, ${client.user.tag}`, { label: "INFO", src: "src/bot/events/common/ready.ts" })
})