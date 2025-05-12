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

const { EmbedBuilder, MessageFlags } = require("discord.js");
const { get_command_values } = require("./get_command");
const { deleted_command } = require("./reply_errors");
const { replaceByVariables } = require("../../../libraries/formating/replace");
const { colors } = require("../../../libraries/colors");
const { msg_cmd_reply } = require("../../../libraries/messages/msg_cmd_reply");
const { command_is_ephemeral } = require("./command_boolean");

/**
 * 
 * @param {string} cmd_id 
 * @param {*} arg 
 * @param {*} target 
 * @param {*} type 
 * @returns 
 */
async function reply_command(interaction, cmd_id, arg = null, target = false, type = null)

{
	const command_values = await get_command_values(cmd_id);

	if (!command_values)
		return deleted_command(interaction);

	let set_up = 6;
	let embed = new EmbedBuilder()

	if (command_values["embed_title"])

	{
		let content = await replaceByVariables(interaction.member, command_values["embed_title"], target, type)
		embed.setTitle(content) 
	}

	else

	{
		set_up--;
	}

	if (command_values["embed_author"])

	{
		let content = await replaceByVariables(interaction.member, command_values["embed_author"], target, type)
		embed.setAuthor({name: content})  
	}

	else

	{
		set_up--;
	}

	if (command_values["embed_description"])

	{
		let content = await replaceByVariables(interaction.member, command_values["embed_description"], target, type)
		embed.setDescription(content) 
	}

	else

	{
		set_up--;
	}

	if (command_values["embed_color"])

	{
		embed.setColor(command_values["embed_color"]) 
	}

	else

	{
		embed.setColor(colors.none)
	}

	if (command_values["embed_footer"])

	{
		let content = await replaceByVariables(interaction.member, command_values["embed_footer"], target, type)
		embed.setFooter({text: content}) 
	}

	else

	{
		set_up--;
	}

	if (command_values["embed_logo"])

	{
		let content = await replaceByVariables(interaction.member, command_values["embed_logo"], target, type)
		if (!content.startsWith('https://')) content = "https://cdn.discordapp.com/attachments/828366187196710933/944654724311953408/unknown.png"
		embed.setThumbnail(content)
	}

	else

	{
		set_up--;
	}

	if (command_values["embed_banner"])

	{
		let content = await replaceByVariables(interaction.member, command_values["embed_banner"], target, type)
		if (!content.startsWith('https://')) content = "https://cdn.discordapp.com/attachments/828366187196710933/944654724311953408/unknown.png"
		embed.setImage(content) 
	}

	else

	{
		set_up--;
	}

	if (!set_up)
		msg_cmd_reply(interaction,
			{content: "Désolé mais, cette commande est vide (elle n'a pas été personnalisée) !", flags: [MessageFlags.Ephemeral]},
			{reply: false, edit: true}
		)
	else
	{
		const message_flags = [];

		if (await command_is_ephemeral(cmd_id))
			message_flags.push(MessageFlags.Ephemeral)
		msg_cmd_reply(interaction, {embeds:[embed], flags: message_flags}, {reply: false, edit: true})
	}
}

module.exports = {
	reply_command
}