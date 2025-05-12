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

const { Message } = require("discord.js");
const { AMessages, AMessage } = require("../abstracts/messages");

const config = {
	"title": "messageUpdate",
	"descriptior": undefined,
	"direct_names": ["messageUpdate", "messagesUpdate"],
	"extension": "update.js",
	"shared_folder": true,
	"folder": "messages",
	"addons": "messages/update"
}

class MessagesUpdate extends AMessages
{
	constructor()
	{
		super(MessageUpdate, config)
	}

	/**
	 * 
	 * @param {Message} old_message
	 * @param {Message} new_message
	 */
	async scan(old_message, new_message)

	{
		for (let i in this._list)

		{
			if (this._list[i] && (!new_message.author.bot
				|| this._list[i].allow_bots) && this.validChannel(old_message, this._list[i]))
			{
				if (await this.has_conditions(new_message, this._list[i].conditions))
				{
					this._list[i].parse(old_message, new_message);
				}
			}
		}
	}
}

class MessageUpdate extends AMessage
{
	/**
	 * 
	 * @param {{
	 * 	conditions: Function[] | undefined, dm: boolean
	 * | undefined , any_guild: boolean | undefined, allow_bots: true | undefined, parse: Function
	 * }} message Informations du nouveau message
	 * @param {string} file_path
	 */
	constructor(message, file_path)
	{
		super(message, file_path)
	}
}

module.exports = { MessageUpdate, MessagesUpdate }