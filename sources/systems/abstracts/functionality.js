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

const { readdirSync, existsSync, statSync } = require("fs");
const { isEnable } = require("../../libraries/informations/is_enable");

class AFunctionalities
{
	/**
	 * @typedef {new (...args: any[]) => AFunctionality} AFunctionalityConstructor
	 */

	/** Liste de commandes
	 *  @type {AFunctionalityConstructor[]}
	 */
	_list
	/** Liste de commandes
	 *  @type {AFunctionalityConstructor}
	 */
	_type;
	
	/**
	 *  @type {{"title": string, "descriptior": string | undefined,
	 * 	direct_names: string[] | undefined, shared_folder: boolean | undefined,
	* 	"extension": string, "folder": string, "addons": string }} config
	 */
	_config;

	/** Constructor
	 *  @param {AFunctionalityConstructor} type
	 *  @param {{"title": string, "descriptior": string | undefined,
	 * 	direct_names: string[] | undefined, shared_folder: boolean | undefined,
	 * 	"extension": string, "folder": string, "addons": string }} config
	 */
	constructor(type, config)
	{
		this._type = type;
		this._list = [];
		this._config = config;
	}

	/**
	 * 
	 * @param {*} handler commande à ajouter
	 * @param {string} file_path
	 */
	add(handler, file_path)
	{
		if (handler.parse)
			this._list.push(new this._type(handler, file_path))
		else
			console.warn(file_path, "method parse is missing")
	}

	/**
	 * Supprime toutes les commandes
	 */
	destroy()
	{
		this._list = [];
	}

	#getExtension()
	{
		if (this._config.shared_folder)
			return (this._config.extension);
		return (".js");
	}

	/**
	 * 
	 * @param {string} path
	 */
	async load_dir(path)
	{
		const extention = this.#getExtension();
		readdirSync(path)
		.forEach(file => 
		{
			if (file.endsWith(extention))
			{
				const file_path = `../../.${path}/${file}`;
				const handler = require(file_path.slice(0, file_path.length - 3));
				this.add(handler, file_path);	
			}
		});
	}

	/**
	 * 
	 * @param {string} file_name 
	 * @returns {boolean}
	 */
	isDirectFile(file_name)
	{
		if (!this._config.direct_names)
			return (false);
		for (let i = 0; i < this._config.direct_names.length; i++)
		{
			if (file_name == `${this._config.direct_names[i]}.js`)
				return (true);
		}
		return (false);
	}

	load_addon()
	{
		const addons_path = "./add-on";

		if (existsSync(addons_path) && existsSync(`${addons_path}/${this._config.addons}`))
		{
			readdirSync(`${addons_path}/${this._config.addons}`)
			.forEach(module => 
			{
				if (module.endsWith(".js"))
				{
					const file_path = `../../../${addons_path}/${this._config.addons}/${module}`;
					const handler = require(file_path.slice(0, file_path.length - 3));
					this.add(handler, file_path);
				}
				else if (statSync(`${addons_path}${this._config.addons}/${module}`).isDirectory())
				{
					readdirSync(`../../${addons_path}/${this._config.addons}/${module}`)
					.forEach(file =>
					{
						if (file.endsWith(".js"))
						{
							const file_path =`../../../${addons_path}/${this._config.addons}/${module}/${file}`;
							const handler = require(file_path.slice(0, file_path.length - 3));
							this.add(handler, file_path);
						}
					});
				}
			});
		}
	}

	async load()
	{
		readdirSync("./sources/modules")
		.forEach(module => 
		{
			if (statSync(`./sources/modules/${module}`).isDirectory()
				&& isEnable(module))
			{
				readdirSync(`./sources/modules/${module}`)
				.forEach(file =>
				{
					if (file == this._config.folder)
					{
						this.load_dir(`./sources/modules/${module}/${file}`)
					}
					else if (this.isDirectFile(file))
					{
						const file_path = `../../../sources/modules/${module}/${file}`;
						const handler  = require(file_path.slice(0, file_path.length - 3));
						this.add(handler, file_path);
					}
				});
			}
		});
		this.load_addon();
		console.log(`${this._list.length} "${this._config.title}" ont bien été chargées`)
	}

	async reload()
	{
		this.destroy();
		await this.load();
	}
}

class AFunctionality
{
	/**
	 * @param {string} file_path
	*/
   constructor(file_path)
   {
		if (process.env.DEBUG != "true")
			return 
		while (file_path.startsWith("../"))
			file_path = file_path.substring(3)
		console.log("New functionality imported:", file_path);
   }
}

module.exports = { AFunctionality, AFunctionalities }