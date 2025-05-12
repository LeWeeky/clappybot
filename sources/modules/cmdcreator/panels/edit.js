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

const { ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require("discord.js")
const { colors } = require("../../../libraries/colors")
const { EmbedBuilder } = require("../../../libraries/discord")

function getEditPanel(command_name)
{
	const embed = new EmbedBuilder()
	.setColor(colors.orange)
	.setDescription(
		"# 🧱 Créateur de commandes\n"+
		"## 🏗️ Contenu et intégration\n"+
		"``` Le contenu est un message classique tel que vous pouvez en envoyer. ```"+
		"``` L'intégration aussi appelée \"embed\" est un format d'affichage plus complexe comme ce panneau. ```"

	)

	const row1 = new ActionRowBuilder()
	.setComponents(
		new StringSelectMenuBuilder()
		.setCustomId(`cmdcreator-edit-${command_name}`)
		.setOptions(
			{
				"label":
					"Nom",
				"description":
					"Nom de la commande, par exemple \"test\" pour la commande \"/test\".",
				"value":
					"name"
			},
			{
				"label":
					"Description",
				"description":
					"Une courte description pour que vos utilisateurs sachent à quoi elle sert.",
				"value":
					"name"
			},
			{
				"label":
					"Titre de l'intégration",
				"description":
					"Un titre qui s'affichera en haut de l'intégration.",
				"value":
					"title"
			},
			{
				"label":
					"Description de l'intégration",
				"value":
					"description"
			},
			{
				"label":
					"Lien de l'intégration",
				"value":
					"link"
			},
			{
				"label":
					"Description du lien",
				"value":
					"link-description"
			},
			{
				"label":
					"Message",
				"value":
					"content"
			},
			{
				"label":
					"Message",
				"value":
					"content"
			}
		)
	)
	const row2 = new ActionRowBuilder()
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
	getEditPanel
}