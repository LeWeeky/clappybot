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

const { Message } = require("discord.js");
const { AActions, AAction } = require("./actions");

class AMessages extends AActions
{
	/** Constructor
 	 * @param {typeof AMessage} type
	 * @param {{"title": string, "descriptior": string | undefined,
	 * direct_names: string[] | undefined, shared_folder: boolean | undefined
	 * "extension": string, "folder": string, "addons": string }} config
	*/
	constructor(type, config)
	{
		super(type, config)
	}

	/**
	 * @param {Message} message
	 * @param {Function[] | false | undefined} conditions
	 */
	async has_conditions(message, conditions)
	{
		let i = 0;
		let result = false;

		if (!conditions)
			return (true);
		while (conditions[i])
		{
			result = await conditions[i](message);
			if (result) return (true);
			i++;
		}
		return (false);
	}

	/**
	 * 
	 * @param {*} message
	 * @param {AAction} action 
	 * @returns {boolean}
	 */
	validChannel(message, action)
	{
		if (this.isDM(message.channel) && action.dm)
			return (true);
		if (message.guild &&
			(message.guild.id == globalThis.guild_id
			|| action.any_guild))
			return (true);
		return (false);
	}

	/**
	 * 
	 * @param {Message} message
	 */
	async scan(message)

	{
		for (let i in this._list)
		{
			if (this._list[i] && (!message.author.bot || this._list[i].allow_bots) && this.validChannel(message, this._list[i]))
			{
				if (await this.has_conditions(message, this._list[i].conditions))
				{
					this._list[i].parse(message);
				}
			}
		}
	}
}

class AMessage extends AAction
{
	/**
	 * 
	 * @param {{
	 * 	conditions: Function[] | undefined, permissions: Function[] | undefined, dm: boolean
	 * | undefined , any_guild: boolean | undefined, allow_bots: true | undefined, parse: Function
	 * }} interaction Informations du nouveau message
	 * @param {string} file_path
	 */
	constructor(interaction, file_path)
	{
		super(interaction, file_path)
	}
}

module.exports = { AMessage, AMessages}