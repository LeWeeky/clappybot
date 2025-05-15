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

const { REST, Routes } = require("discord.js");
const { clappybot } = require("../../main");
const { interactions } = require("../interactions");

/**
 * 
 * @param {REST | null} rest 
 */
async function buildGlobalCommands(rest = null)
{
	if (!rest)
		rest = new REST().setToken(process.env.TOKEN);

	try {
		console.log(`Rechargement des ${interactions.commands.commands_builder.global_cmds.length} (/) commandes globales.`);

		const data = await rest.put(
			Routes.applicationCommands(clappybot.bot.user.id),
			{ body: interactions.commands.commands_builder.global_cmds },
		);

		console.log(`${data.length} (/) commandes globales ont bien été rechargée.`);
	} catch (error) {
		console.error(error);
	}
}

/**
 * 
 * @param {REST | null} rest 
 */
async function buildGuildCommands(rest = null)
{
	if (!rest)
		rest = new REST().setToken(process.env.TOKEN);

	try {
		console.log(`Rechargement des ${interactions.commands.commands_builder.guild_cmds.length} (/) commandes privées.`);

		const data = await rest.put(
			Routes.applicationGuildCommands(clappybot.bot.user.id, globalThis.guild_id),
			{ body: interactions.commands.commands_builder.guild_cmds },
		);

		console.log(`${data.length} (/) commandes privées ont bien été rechargée.`);
	} catch (error) {
		console.error(error);
	}
}

async function build_commands()

{
	const rest = new REST().setToken(process.env.TOKEN);

	buildGlobalCommands(rest);

	if (!globalThis.guild_id)
		return ;
	buildGuildCommands(rest);
}

module.exports = { build_commands }