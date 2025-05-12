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

const { AInteraction, AInteractions } = require("../abstracts/interactions");

const config = {
	"title": "modal",
	"descriptior": "ce formulaire",
	"extension": "modal.js",
	"folder": "modals",
	"addons": "interactions/modals"
}

class Modals extends AInteractions
{
	constructor()
	{
		super(Modal, config)
	}
}

class Modal extends AInteraction
{
	/**
	 * 
	 * @param {{
	* 	customId: string | undefined, conditions: Function[] | undefined, permissions: Function[]
	* | undefined, dm: boolean | undefined , any_guild: boolean 
	* | undefined , parse: Function
	* }} interaction Informations e la nouvelle interaction
	* @param {string} file_path
	*/
   constructor(interaction, file_path)
   {
	   super(interaction, file_path)
   }
}

module.exports = { Modal, Modals }