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

const { MessageFlags } = require('discord.js');
const { interactions } = require('../systems/interactions')

const name = "interactionCreate";
/**
 * 
 * @param {import('discord.js').Interaction} interaction 
 * @returns 
 */
async function listen(interaction)

{
    if (interaction.isCommand())
    {
        const { commandName } = interaction;
		if (!(await interactions.commands.scan(interaction, commandName, [])))
            interaction.reply({content: "Désolé mais, cette commande a été désactivée.", flags: [MessageFlags.Ephemeral]})
    }
    if (interaction.isButton())
		interactions.buttons.scan(interaction);
    if (interaction.isAnySelectMenu())
        interactions.menus.scan(interaction);
	else if (interaction.isModalSubmit())
		interactions.modals.scan(interaction);
}

module.exports = { name, listen }