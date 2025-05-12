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

const { AMessages, AMessage } = require("../abstracts/messages");

const config = {
	"title": "messageCreate",
	"descriptior": undefined,
	"direct_names": ["messageCreate", "messagesCreate"],
	"shared_folder": true,
	"extension": "create.js",
	"folder": "messages",
	"addons": "messages/create"
}


class MessagesCreate extends AMessages
{
	constructor()
	{
		super(MessageCreate, config)
	}
}

class MessageCreate extends AMessage
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

module.exports = { MessageCreate, MessagesCreate }