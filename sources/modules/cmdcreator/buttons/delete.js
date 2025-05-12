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

const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require("discord.js")
const { isAdmin } = require("../../../libraries/permissions/guild_admin")

async function parse(interaction)
{
	const modal = new ModalBuilder()
	.setCustomId("cmdcreator-delete")
	.setTitle("Supprimer une commande")

	const input = new TextInputBuilder()
		.setCustomId("name")
		.setStyle(TextInputStyle.Short)
		.setLabel("Nom")
		.setPlaceholder("Nom de la commande à supprimer")
		.setMinLength(1)
		.setMaxLength(32)
	const row = new ActionRowBuilder()
		.addComponents(
			input
		)
	modal.addComponents(row)
	interaction.showModal(modal)
}

module.exports = {
	parse,
	customId: "cmdcreator-delete",
	permissions: [
		isAdmin
	]
}