import { APIEmbed, CommandInteraction,  Embed,  EmbedData, InteractionReplyOptions, InteractionResponse, Message, MessageOptions, MessagePayload, ReplyMessageOptions } from "discord.js";
import client from "../..";
import botConfig from "../../bot.config";


class ExtendedResponseBase {
    _ctx: Message

    constructor(ctx?: Message) {
        if (ctx) {
            this._ctx = ctx
        }
    }

    getEmbedFormat(options?: APIEmbed) {
        return {
            title: options && options.title ? options.title : null,
            description: options && options.description ? options.description : this._ctx && this._ctx.content ? this._ctx.content : options && options.title ? null : "Errr, appears an discription is required",
            color: options && options.color ? options.color : botConfig.colours.primary || null,
            author: options && options.author ? options.author : null,
            fields: options && options.fields ? options.fields : null,
            footer: options && options.footer ? options.footer : { iconURL: client.user.displayAvatarURL({ extension: "png" }) },
            image: options && options.image ? options.image : null,
            provider: options && options.provider ? options.provider : null,
            thumbnail: options && options.thumbnail ? options.thumbnail : null,
            timestamp: options && options.timestamp ? options.timestamp : null,
            type: options && options.type ? options.type : null,
            url: options && options.url ? options.url : null,
            video: options && options.video ? options.video : null
        } as APIEmbed
    }
} 

export class ExtendedInteraction extends ExtendedResponseBase {
    ctx: CommandInteraction
    constructor(ctx: CommandInteraction) {
        super()
        this.ctx = ctx
    }

    public async reply(options: string | MessagePayload | InteractionReplyOptions & { fetchReply?: boolean } ): Promise<InteractionResponse<boolean> | Message<boolean>> {
        return await this.ctx.reply(options).catch(() => {
            return this.ctx.channel.send(options as MessagePayload)
        })
    }
}

export class ExtendedMessage extends ExtendedResponseBase {
    ctx: Message
    constructor(ctx: Message) {
        super(ctx)
        this.ctx = ctx;
    }

    public async reply(options: string | MessagePayload | ReplyMessageOptions): Promise<Message> {
        return await this.ctx.reply(options).catch(() => {
            return this.ctx.channel.send(options)
        })
    }
}