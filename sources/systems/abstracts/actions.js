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

const { ChannelType } = require("discord.js");
const { AEvents, AEvent } = require("./events");

class AActions extends AEvents
{
	/** Constructor
	 *  @param {typeof AEvent} type
	 *   @param {{"title": string, "descriptior": string | undefined,
	 * 	direct_names: string[] | undefined, shared_folder: boolean | undefined,
	* 	"extension": string, "folder": string, "addons": string }} config
	 */
	constructor(type, config)
	{
		super(type, config)
	}

	isDM(channel)
	{
		return (channel.type == ChannelType.DM
			|| channel.type == ChannelType.GroupDM)
	}

	/**
	 * 
	 * @param {*} interaction
	 * @param {AAction} action 
	 * @returns {boolean}
	 */
	validChannel(interaction, action)
	{
		if (this.isDM(interaction.message.channel) && action.dm)
			return (true);
		if (interaction.message.guild &&
			(interaction.message.guild.id == globalThis.guild_id
			|| action.any_guild))
			return (true);
		return (false);
	}
}

class AAction extends AEvent
{
	/**
	 * @type {Function[] | undefined}
	 */
	conditions;

	/**
	 * @type {boolean | undefined}
	 */
	dm;

	/**
	 * 
	 * @param {{
	* 	dm: boolean | undefined , any_guild: boolean | undefined , parse: Function, conditions: Function[] | undefined
	* }} interaction Informations e la nouvelle interaction
	* @param {string} file_path
	*/
   constructor(interaction, file_path)
   {
		super(interaction, file_path)
		this.conditions = interaction.conditions;
		this.dm = interaction.dm;
   }
}

module.exports = { AAction, AActions }