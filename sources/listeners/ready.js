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

const { clappybot } = require("../main");
const { init_version } = require("../libraries/init_version");
const { interactions } = require("../systems/interactions");
const { build_commands } = require("../systems/interactions/slashBuilder");
const { get_invites_data } = require("../libraries/fetching/invites");
const { CACHE_TABLE } = require("../libraries/data");

/**
 * 
 * @param {number} date 
 * @returns {string} renvoie une date au format
 * "mécanique" (toujours 2 éléments)
 */
function mecanicDate(date)
{
	const string_date = date.toString();
	if (string_date.length == 1)
		return (`0${string_date}`);
	return (string_date);
}

function printReadyMessage(bot)
{
	const date = new Date;
    console.log(
        "["+mecanicDate(date.getDate())+"/"+mecanicDate(date.getMonth())+"/"+date.getFullYear()+"-"+date.getHours()+
        ":"+date.getMinutes()+":"+date.getSeconds()+"] -> " +bot.user.tag+" a démarré"
    )
}

const name = "ready";
async function listen(bot)

{
    await clappybot.new(bot);
	await interactions.init();
	await build_commands();

    const guild = clappybot.getGuild();
    await init_version(guild)
    if (guild && guild.invites)
    {
        clappybot.swap["invites"] = await get_invites_data(guild)
    }

	printReadyMessage(bot);

	const reboot = await CACHE_TABLE.get('reboot');

	if (reboot)
	{
		const channel = await bot.channels.fetch(reboot["channel_id"]);
		if (channel)
		{
			channel.send("✅ Le bot a bien redémarré !");
			await CACHE_TABLE.delete('reboot');
		}
	}
}

module.exports = { name, listen }