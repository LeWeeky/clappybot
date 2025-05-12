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

const { AActions, AAction } = require("./abstracts/actions");

const config = {
	"title": "presenceUpdate",
	"descriptior": undefined,
	"direct_names": [
		"presenceUpdate", "presencesUpdate",
		"presence_update", "presences_update"
	],
	shared_folder: false,
	"extension": "presence.js",
	"folder": "presences",
	"addons": "presences"
}

class PresencesUpdate extends AActions
{
	constructor()
	{
		super(PresenceUpdate, config)
	}

	/**
	 * @param {[old_presence, new_presence]} data
	 * @param {Function[] | undefined} conditions
	 */
	async has_conditions([old_presence, new_presence], conditions)
	{
		let i = 0;
		let result = false;

		if (!conditions)
			return (false);
		while (conditions[i])
		{
			result = await conditions[i](old_presence, new_presence);
			if (result)
				return (true);
			i++;
		}
		return (false);
	}

	async scan(old_presence, new_presence)
	{
		for (let i in this._list)
		{
			{
				if (!this._list[i].conditions || await this.has_conditions([old_presence, new_presence], this._list[i].conditions))
				{
					try {
						this._list[i].parse(old_presence, new_presence);
					}
					catch (error) {
						console.error(this._list[i], error);
					}
				}
			}
		}
	}
}

class PresenceUpdate extends AAction
{
	/**
	 * 
	 * @param {{
	* 	dm: boolean | undefined , any_guild: boolean | undefined , parse: Function, conditions: Function[] | undefined
	* }} interaction Informations e la nouvelle interaction
	* @param { string } file_path
	*/
   constructor(interaction, file_path)
   {
		super(interaction, file_path)
   }
}

module.exports = { PresencesUpdate, PresenceUpdate }