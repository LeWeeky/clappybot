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

const { MessageFlags } = require("discord.js");
const { str_is_alpha } = require("../../../libraries/informations/is_alpha");
const { command_exists } = require("../functions/command_exists");
const { create_command } = require("../functions/create_command");
const { build_commands } = require("../../../systems/interactions/slashBuilder");
const { interactions } = require("../../../systems/interactions");

async function parse(interaction) 
{
	const name = interaction.fields.getTextInputValue('name');

	if (!str_is_alpha(name))
	{
		interaction.reply("Désolé mais, la commande ne doit être composée que de lettres !")
		return
	}

	if (await command_exists(name))
	{
		interaction.reply({content: "Désolé mais, la commande existe déjà !", flags: [MessageFlags.Ephemeral]})
	}

	else

	{
		if (await create_command(name))
		{
			const reply = await interaction.reply({content: "Rechargement des commandes !", flags: [MessageFlags.Ephemeral]});
			await interactions.commands.reload();
			await build_commands();

			reply.deleteReply();
			interaction.message.edit()
		}
		else
		{
			interaction.reply("Désolé mais, une erreur est survenue ! Veuillez contacter le développeur ou réessayer plus tard.");
		}
	}
}