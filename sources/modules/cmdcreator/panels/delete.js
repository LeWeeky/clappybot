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

const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
const { colors } = require("../../../libraries/colors")
const { EmbedBuilder } = require("../../../libraries/discord")

function getDeletePanel()
{
	const embed = new EmbedBuilder()
	.setColor(colors.orange)
	.setDescription(
		"# 🧱 Créateur de commandes\n"+
		"``` Créez une commande commande facilement ```"+
		"``` Elle sera automatiquement /command ```"
	)

	const row = new ActionRowBuilder()
	.setComponents(
		new ButtonBuilder()
		.setCustomId("cmdcreator-create")
		.setStyle(ButtonStyle.Primary)
		.setLabel("🏗️ Créer"),
		new ButtonBuilder()
		.setCustomId("cmdcreator-edit")
		.setStyle(ButtonStyle.Secondary)
		.setLabel("📝 Modifier"),
		new ButtonBuilder()
		.setCustomId("cmdcreator-delete")
		.setStyle(ButtonStyle.Danger)
		.setLabel("🗑️ Supprimer")
	)

	return ({embeds: [embed], components: [row]})
}

module.exports = {
	getDeletePanel
}