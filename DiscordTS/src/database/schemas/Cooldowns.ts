import { model, Schema } from "mongoose";

export interface CooldownProps {
    user_id: string;
    timeRemaining: number;
    commandName: string;
}

export default model("Cooldowns", new Schema<CooldownProps>({
    user_id: { type: String, required: true },
    timeRemaining: { type: Number, required: true },
    commandName: { type: String, required: true }
}))