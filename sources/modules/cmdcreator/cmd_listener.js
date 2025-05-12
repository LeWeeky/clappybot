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

const { clappybot } = require('../../main')
const { get_command_id } = require('./functions/get_command')
const { deleted_command } = require('./functions/reply_errors')
const { reply_command } = require('./functions/reply_command')
const { command_is_public } = require('./functions/command_boolean')

async function parse(interaction, cmd, args)

{
	if (interaction.options)
		await interaction.deferReply();

	const cmd_id = await get_command_id(cmd);

	if (cmd_id == -1)
		return interaction.editReply({content: "Désolé mais, une erreur est survenue !"});
	if (cmd == 0)
		return deleted_command(interaction);

	if (!interaction.guild)
		return interaction.editReply({content: "Désolé mais, cette commande n'est pas disponible en mp !"});
	if (globalThis.guild_id != interaction.guild.id && !(await command_is_public(cmd_id)))
		return interaction.editReply({content: "Désolé mais, cette commande ne peut pas être utilisée sur ce serveur !"});

	if (args.length == 0)

	{
		reply_command(interaction, cmd_id);
	}

	else

	if (["help", "aide"].includes(cmd))

	{
		return
	}

	else

	{
		interaction.channel.send("La commande ne possède pas d'arguments ! Faites ` "+clappybot.prefix+cmd+" ` !")
	}
}

module.exports = { parse }