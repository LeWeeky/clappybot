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

const { AReactions, AReaction } = require("../abstracts/reactions");

const config = {
	"title": "reactionRemove",
	"descriptior": undefined,
	"extension": "remove.js",
	"folder": "reactions",
	"addons": "reactions"
}

class ReactionsRemove extends AReactions
{
	constructor()
	{
		super(ReactionRemove, config)
	}
}

class ReactionRemove extends AReaction
{
	/**
	 * 
	 * @param {{
	 * 	name: string | undefined, id: string | undefined, dm: boolean | undefined,
	 *   any_guild: boolean | undefined , parse: Function, conditions: Function[] | undefined
	 * }} interaction Informations e la nouvelle interaction
	 * @param {string} file_path
	*/
   constructor(interaction, file_path)
   {
	   super(interaction, file_path)
   }
}

module.exports = { ReactionRemove, ReactionsRemove }