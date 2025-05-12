/**
 * ClappyBot - A powerful framework for bot developers
 * Copyright (C) 2019–2025 LeWeeky
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

const { Message, EmbedBuilder } = require("discord.js")
const { colors } = require("../../libraries/colors")

class Messages

{
    constructor (channel, length = 100)

    {
        this.channel = channel
        this.length = length
    }

	/**
	 * 
	 * @param {string} message_id 
	 * @returns {Message}
	 */
    async get(message_id)

    {
        const messages = await this.channel.messages.fetch({limit: this.length})
        let TARGET_MESSAGE = false
        messages.forEach(
            function(message)

            {
                if (message.id == message_id) return (TARGET_MESSAGE = message)
            }
        )

        return (TARGET_MESSAGE)
    }

    async all()

    {
        const messages = await this.channel.messages.fetch({limit: this.length})
        const return_format = {};

        messages.forEach(
            function(message)

            {
                return_format[message.id] = message;
            }
        )

        return (return_format)
    }

	async toList()
	{
		const messages = await this.channel.messages.fetch({limit: this.length})
        const return_format = [];

        messages.forEach(
            function(message)
            {
                return_format.push(message);
            }
        )

        return (return_format)
	}
}

/**
 * 
 * @param {*} target_message 
 * @returns {{
 *	text?: string,
 *	embed?: {
 *		title?: string,
 *		description?: string,
 *		comment?: {text: string, iconURL?: string},
 *		icon?: string,
 *      banner?: string,
 *      color?: number,
 *      fields?: {name: string, value: string, inline?: boolean}[]
 * 	}
 * }}
 */
function get_message_data(target_message)
    
{
    let data = {
        text: undefined,
        embed: {
			author: undefined,
            title: undefined,
            description: undefined,
            comment: undefined,
            icon: undefined,
            banner: undefined,
            color: colors.none,
            fields: undefined
        }
    }

    if (target_message.embeds && target_message.embeds[0])

    {
		if (target_message.embeds[0]["author"])
		{
			data["embed"]["author"] = target_message.embeds[0]["author"];
		}
        if (target_message.embeds[0]["title"])
            data["embed"]["title"] = target_message.embeds[0]["title"];
        if (target_message.embeds[0]["description"])
            data["embed"]["description"] = target_message.embeds[0]["description"];
        if (target_message.embeds[0]["footer"])
            data["embed"]["comment"] = target_message.embeds[0]["footer"];
        if (target_message.embeds[0]["thumbnail"])
            data["embed"]["icon"] = target_message.embeds[0]["thumbnail"]["url"];
        if (target_message.embeds[0]["image"])
            data["embed"]["banner"] = target_message.embeds[0]["image"]["url"];
        if (target_message.embeds[0]["color"])
            data["embed"]["color"] = target_message.embeds[0]["color"];//`#${target_message.embeds[0]["color"].toString(16)}`;

        if (target_message.embeds[0].fields)

        {
            data["embed"]["fields"] = [];
            target_message.embeds[0].fields.forEach(field => {
                data["embed"]["fields"].push(field);
            })
        }
    }

    else

    {
        data["embed"] = false;
    }

    if (target_message.content)

    {
        data["text"] = target_message.content;
    }

    return (data);
}

/**
 * 
 * @param {{
 *  text?: string,
 * 	content?: string
 *	embed?: {
 *		title?: string,
 *		description?: string,
 *		comment?: {text: string, iconURL?: string},
 *		icon?: string,
 *      banner?: string,
 *      color?: number,
 *      fields?: {name: string, value: string, inline?: boolean}[]
 * 	}}} data 
 * @returns 
 */
function new_message(data)

{
	const message_data = {};

	if (data["embed"])

	{
		let parameters = 0;
		let embed = new EmbedBuilder()

		if (data["embed"]["author"])
		{
			embed.setAuthor(data["embed"]["author"]);
			parameters++;
		}

		if (data["embed"]["title"])

		{
			embed.setTitle(data["embed"]["title"]);
			parameters++;
		}

		if (data["embed"]["description"])

		{
			embed.setDescription(data["embed"]["description"]);
			parameters++;
		}

		if (data["embed"]["comment"])

		{
			embed.setFooter(data["embed"]["comment"]);
			parameters++;
		}

		if (data["embed"]["icon"])

		{
			embed.setThumbnail(data["embed"]["icon"]);
			parameters++;
		}

		if (data["embed"]["banner"])

		{
			embed.setImage(data["embed"]["banner"]);
			parameters++;
		}

		if (data["embed"]["fields"])

		{
			embed.setFields(data["embed"]["fields"]);
			parameters++;
		}

		if (data["embed"]["color"])
			embed.setColor(data["embed"]["color"])

		if (parameters)
			message_data["embeds"] = [embed];
		else
			message_data["embeds"] = [];

		if (data["text"])
			message_data["content"] = data["text"];
	}

	if (data["content"])
		message_data["content"] = data["content"];
	if (data["text"])
		message_data["content"] = data["text"];

	return (message_data);
}

module.exports = { Messages, get_message_data, new_message }