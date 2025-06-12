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

const { split } = require('../libraries/formating/split');
const { clappybot } = require('../main');

const { isStaff } = require('../libraries/permissions/guild_staff');
const { Message } = require('discord.js');
const { interactions } = require('../systems/interactions');

const name = "messageCreate";
/**
 * 
 * @param {Message} message 
 * @returns 
 */
async function listen(message)

{
    const prefix = clappybot.prefix;

    let cmd;
    let args = split(message.content.toLocaleLowerCase());

    if (message.content.startsWith(prefix) && message.content.length > 1)

    {
        cmd = args[0].substr(prefix.length);
        args = args.slice(1, args.length);
    }

	if (cmd)
		interactions.commands.scan(message, cmd, args);
	interactions.messageCreate.scan(message);

    if (message.member && message.guild && message.guild.id == globalThis.guild_id)
    {
        if (await isStaff(message.member))
        {
            if (message.content == prefix+'join')

            {
                clappybot.bot.emit('guildMemberAdd', message.member);
                message.delete()
            }

            if (message.content == prefix+'leave')

            {
                clappybot.bot.emit('guildMemberRemove', message.member)
                message.delete()
            }
        }
    }
}
 
module.exports = { name, listen }