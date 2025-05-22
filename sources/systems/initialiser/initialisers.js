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

const { readdirSync, statSync } = require("fs");
const { isEnable } = require("../../libraries/informations/is_enable");
const { clappybot } = require("../../main");

class Initialisers
{
	constructor()
	{
	}

	/**
	 * Supprime toutes les commandes
	 */
	destroy()
	{
	}

	async load()
	{
		const connection = clappybot.database.connect();
		const list = [];

		readdirSync("./sources/modules")
		.forEach(module => 
		{
			if (statSync(`./sources/modules/${module}`).isDirectory()
				&& isEnable(module))
			{
				readdirSync(`./sources/modules/${module}`)
				.forEach(file =>
				{
					if (file == "init.js")
					{
						const file_path = `../../../sources/modules/${module}/${file}`;
						const initialiser = require(file_path.slice(0, file_path.length - 3));
						if (initialiser.init_module)
							list.push(initialiser.init_module(connection));
						else
							console.warn(file_path, "method init_module is missing")
					}
				});
			}
		})

		for (let i = 0; i < list.length; i++)
			await list[i];
		clappybot.database.break();
		console.log(`${list.length} initialiseurs ont bien été chargés`)
	}

	async reload()
	{
		await this.load();
	}
}

module.exports = { Initialisers }