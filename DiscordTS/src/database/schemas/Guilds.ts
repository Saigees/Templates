import { model, Schema } from "mongoose";

export interface GuildProps {

}

export default model("Guild", new Schema<GuildProps>({}))