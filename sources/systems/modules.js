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

const { readdirSync, existsSync } = require("fs");
const { clappybot } = require("../main");
const { interactions } = require("./interactions");
const { isEnable } = require("../libraries/informations/is_enable");
const { isRent } = require("../libraries/informations/is_rent");
const { isAllow } = require("../libraries/informations/is_allow");

class Modules

{
	/**
	 * @type {{
	* 		name: string,
	*		title: string,
	*		display: string,
	*		description: string,
	*		price: {
	*				rental: number,
	*				purchase: number
	* 		}
	* }[]}
	*/
	list;

	#getList()
	{
		readdirSync("./sources/modules")
		.forEach(module => 
		{
			if (existsSync(`./sources/modules/${module}/data.json`))
			{
				const data = require(`../modules/${module}/data.json`);
				data.name = module;
				this._list.push(data)
			}
		});
		console.log(`${this._list.length} modules ont bien été montés`)
	}

	constructor()
	{
		this._list = [];
	}

	/**
	 * Charge les modules au démarrage
	 */
	init()
	{
		this.#getList();
	}

	/**
	 * 
	 * @param {string} module 
	 */
	async allow(module)
	{
		await clappybot.allow_modules(module);
		await clappybot.reload_modules();
		await interactions.reload();
	}

	/**
	 * 
	 * @param {string} module 
	 */
	async deny(module)
	{
		await clappybot.deny_modules(module);
		await clappybot.reload_modules();
		await interactions.reload();
	}

	/**
	 * 
	 * @param {string} module 
	 */
	async enable(module)
	{
		await clappybot.enable_modules(module);
		await clappybot.reload_modules();
		await interactions.reload();
	}

	/**
	 * 
	 * @param {string} module 
	 */
	async disable(module)
	{
		await clappybot.disable_modules(module);
		await clappybot.reload_modules();
		await interactions.reload();
	}

	/**
	 * 
	 * @param {string} module 
	 */
	has(module)
	{
		let i = 0;

		while (i < this._list.length)
		{
			if (this._list[i].name == module)
				return (true);
			i++;
		}
		return (false);
	}

	/**
	 *
	 * @param {string} module
	 * @returns {string}
	 */
	showAllowState(module)
	{
		if (isRent(module))
			return ("``` ⌛ loué ```")
		if (isAllow(module))
			return ("``` ✔️ acheté ```")
		return ("``` ❌ non-acheté ```")
	}

	/**
	 *
	 * @param {string} module
	 * @returns {string}
	 */
	showEnabledState(module)
	{
		if (isEnable(module))
			return ("``` ✔️ activé ```")
		return ("``` ❌ désactivé ```")
	}

	/**
	 * effiche la liste des modules achetés
	 * @param {boolean} inline affiche aligné ou non
	 * @returns
	 */
	showAllowedModules(inline = false)
	{
		const help_modules = [];
		for (let i = 0; i < this._list.length && i < 25; i++)
		{
			if (modules._list[i].name)
				help_modules.push({
					name: this.showModuleTitle(modules._list[i].name),
					value: this.showAllowState(modules._list[i].name),
					inline: inline
				})
		}
		return (help_modules);
	}


	/**
	 * affiche la liste des modules possédés et leur état
	 * @param {boolean} inline
	 * @returns
	 */
	showModulesToRent(inline= true)
	{
		const help_modules = [];
		let i = 0;
	
		while(i < this._list.length && i < 24)
		// TODO supporter l'affichage de +25 modules 
		{
			if (!isAllow(this._list[i].name))
				help_modules.push({
				name: this.showModuleTitle(modules._list[i].name),
				value: this.showModuleDailyPriceDark(this._list[i].name),
				inline: inline
			})
			i++;
		}
	
		return (help_modules);
	}

	/**
	 *
	 * @param {string} module
	 */
	async showModuleState(module)
	{
		if (isRent(module))
			return ("En location")
		if (isAllow(module))
		{
			if (isEnable(module))
				return ("Acheté");
			return ("Désactivé");
		}
		return ("Non acheté");
	}

	/**
	 * Retourne un format SelectMenu
	 * @returns
	 */
	async selectMenuModulesRent()
	{
		const menu_options = [];
		let i = 0;
	
		while(i < this._list.length && i < 25)
		// TODO supporter l'affichage de +25 modules 
		{
			if (this._list[i].price.purchase)
				menu_options.push({
					label: this.showModuleTitle(modules._list[i].name),
					description: await this.showModuleState(this._list[i].name),
					value: this._list[i].name
				})
			else
				menu_options.push({
					label: this.showModuleTitle(modules._list[i].name),
					description: "Offert",
					value: this._list[i].name
				})
			i++;
		}
		return (menu_options);
	}

	/**
	 * Retourne un format SelectMenu
	 * @returns
	 */
	selectMenuModulesManager()
	{
		const menu_options = [];
		let i = 0;

		while(i < this._list.length && i < 24)
		// TODO supporter l'affichage de +25 modules 
		{
			menu_options.push({
				label: this.showModuleTitle(modules._list[i].name),
				description: this.showEnabledState(this._list[i].name),
				value: this._list[i].name
			})
			i++;
		}
		return (menu_options);
	}

	/**
	 * affiche la liste des modules possédés et leur état
	 * @param {boolean} inline
	 * @returns
	 */
	showEnableModules(inline= true)
	{
		const help_modules = [];
		let i = 0;

		while(i < this._list.length && i < 24)
		// TODO supporter l'affichage de +25 modules 
		{
			if (isAllow(this._list[i].name))
				help_modules.push({
				name: this.showModuleTitle(modules._list[i].name),
				value: this.showEnabledState(this._list[i].name),
				inline: inline
			})
			i++;
		}
		return (help_modules);
	}

	/**
	 * Transforme le prix euro en coins
	 * @param {number} euro
	 * @returns {number}
	 */
	#euro_to_coins(euro)
	{
		if (euro == -1)
			return (-1);
		return ((euro / 0.50 * 10) * 30);
	}

	/**
	 * Donne le prix du module en euro ou coins
	 * @param {string} module nom du module
	 * @param {"euro" | "coins"} type type de monnaie
	 * @returns {number | -1} retourne -1 en cas d'erreur
	 */
	getModuleRentalPrice(module, type = "coins")
	{
		for (let i = 0; i < this._list.length; i++)
		{
			if (this._list[i].name == module)
			{
				if (type == "euro")
					return (this._list[i].price.rental);
				else
					return (this.#euro_to_coins(this._list[i].price.rental));
			}
		}
		return (-1);
	}

	/**
	 * 
	 * @param {string} module 
	 * @param {"title" | "description" | "icon"
	 * | "emoji" | "price" } meta 
	 * @returns 
	 */
	getModuleMeta(module, meta)
	{
		for (let i = 0; i < this._list.length; i++)
		{
			if (this._list[i].name == module)
				return (this._list[i][meta])
		}
		return (null);
	}

	getModuleTitle(module)
	{
		return (this.getModuleMeta(module, "title"));
	}

	showModuleTitle(module)
	{
		const module_name = `${this.getModuleMeta(module, "emoji")} ◦ ${this.getModuleTitle(module)}`;
		if (!module_name)
			return ("❔ ◦ Un module sans nom")
		return (module_name)
	}

	/**
	 * Affiche le prix du module en euro ou coins
	 * @param {string} module nom du module
	 * @param {"euro" | "coins"} type type de monnaie
	 * @returns {string | "???"} retourne ??? en cas d'erreur
	 */
	showModuleRentalPrice(module, type = "coins")
	{
		const price = this.getModuleRentalPrice(module, type);
		if (price == -1)
			return ("???");
		if (type == "euro")
			return (`${price} €`)
		return (`${price} coins`)
	}

	/**
	 * Affiche le prix du module en euro ou coins
	 * @param {string} module nom du module
	 * @param {"euro" | "coins"} type type de monnaie
	 * @returns {number | -1} retourne ??? en cas d'erreur
	 */
	getModuleDailyPrice(module, type = "coins")
	{
		let price = this.getModuleRentalPrice(module, type);
		if (price != -1)
			return (price  / 30);
		return (price);
	}

	/**
	 * Affiche le prix du module en euro ou coins
	 * @param {string} module nom du module
	 * @param {"euro" | "coins"} type type de monnaie
	 * @returns {string | "???"} retourne ??? en cas d'erreur
	 */
	showModuleDailyPrice(module, type = "coins")
	{
		let price = this.getModuleDailyPrice(module, type);
		if (price == -1)
			return ("???");
		if (type == "euro")
			return (`${price} €`)
		if (price > 1)
			return (`${price} coins`)
		return (`${price} coin`)
	}

	/**
	 * Affiche le prix du module en euro ou coins
	 * @param {string} module nom du module
	 * @param {"euro" | "coins"} type type de monnaie
	 * @returns {string | "???"} retourne ??? en cas d'erreur
	 */
	showModuleDailyPriceDark(module, type = "coins")
	{
		return ("``` "+this.showModuleDailyPrice(module, type)+" ```");
	}

	/**
	 * affiche la commande d'information
	 * pour les modules activés
	 * @returns
	 */
	showHelpModules()
	{
    	const help_modules = [];

		for (let i = 0; i < this._list.length; i++)
		{
			if (isEnable(this._list[i].name))
			{
				 help_modules.push(
					{
						name:
							this.showModuleTitle(modules._list[i].name),
      					value:
							"```▸ "+clappybot.prefix+"help "+this._list[i].name+" ↦ "+this._list[i].description+" ```"
					}
				 )
			}
		}
		return (help_modules);
	}

	getShopFields()
	{
		const fields = [];
	
		for (let i = 0; i < this._list.length && i < 24; i++)
		// TODO supporter l'affichage de +25 modules 
		{
			fields.push({
				name: this.showModuleTitle(modules._list[i].name),
				value: "```Acheter : " +  this._list[i].price.purchase + "€```"+
				"```Louer en € : " +  this.showModuleRentalPrice(modules.list[i].name, "euro") + " / Mois```"+
				"```Louer en cc* : " + this.showModuleDailyPrice(modules.list[i].name) + " / Jour```",
				inline: true
			})
		}
		return (fields);
	}
}

const modules = new Modules();

module.exports = { modules }