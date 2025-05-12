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

const { AAction, AActions } = require("./actions");

class AReactions extends AActions
{
	/** Constructor
	 *  @param {typeof AReaction} type
	 *  @param {{"title": string, "descriptior": undefined, "extension": string,
	 *  "folder": string, "addons": string }} config
	 */
	constructor(type, config)
	{
		super(type, config)
	}

	/**
	 * @param {[reaction, user]} data
	 * @param {Function[] | undefined} conditions
	 */
	async has_conditions([reaction, user], conditions)
	{
		let i = 0;
		let result = false;

		if (!conditions)
			return (false);
		while (conditions[i])
		{
			result = await conditions[i](reaction, user);
			if (result) return (true);
			i++;
		}
		return (false);
	}

	async scan(reaction, user)

	{
		for (let i in this._list)

		{
			if (this.validChannel(reaction, this._list[i]))
			{
				if (!this._list[i].conditions || await this.has_conditions([reaction, user], this._list[i].conditions))
				{
					try {
						this._list[i].parse(reaction, user);
					}
					catch (error) {
						console.error(this._list[i], error);
					}
				}
			}
		}
	}
}

class AReaction extends AAction
{
	/**
	 * @type {string | undefined}
	 */
	name;

	/**
	 * @type {string | undefined}
	 */
	id;

	/**
	 * 
	 * @param {{
	* 	name: string | undefined, id: string | undefined, dm: boolean | undefined , any_guild: boolean | undefined , parse: Function, conditions: Function[] | undefined
	* }} interaction Informations e la nouvelle interaction
	* @param {string} file_path
	*/
   constructor(interaction, file_path)
   {
		super(interaction, file_path)
		this.name = interaction.name;
		this.id = interaction.id;
   }
}

module.exports = { AReaction, AReactions }