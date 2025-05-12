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

const { ChannelType } = require("discord.js");
const { clappybot } = require("../main");
const { interactions } = require("../systems/interactions");

const name = "messageUpdate";
async function listen(oldMessage, newMessage)

{
    if(oldMessage.bot
		|| oldMessage.partial
		|| oldMessage.channel.type == ChannelType.DM
		|| oldMessage.channel.type == ChannelType.GroupDM
		|| (!oldMessage.guild || oldMessage.guild != globalThis.guild_id)
		|| newMessage.author.id === clappybot.bot.user.id)
		return;
	interactions.messageUpdate.scan(oldMessage, newMessage)
}

module.exports = { name, listen }