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

const { clappybot } = require('../main');

const { Message, MessageType } = require('discord.js');
const { interactions } = require('../systems/interactions');

const name = "messageDelete";
/**
 * 
 * @param {Message} message 
 * @returns 
 */
async function listen(message)

{
	if (!clappybot.bot || !clappybot.bot.user || !message.author) return ;

    if (
		(message.author.bot
		&& message.type != MessageType.ChannelPinnedMessage) //TODO ceci bloque la suppression des pins en tickets
		|| message.type == MessageType.ThreadCreated
	)
		return;

	interactions.messageDelete.scan(message);
}
 
module.exports = { name, listen }