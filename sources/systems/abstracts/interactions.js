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

const { MessageFlags } = require("discord.js");
const { isEnable } = require("../../libraries/informations/is_enable");
const { AActions, AAction } = require("./actions");

class AInteractions extends AActions
{
	/** Constructor
	 *  @param {typeof AInteraction} type
	 *  @param {{"title": string, "descriptior": string | undefined,
	 * 	direct_names: string[] | undefined,
	 * 	"extension": string, "folder": string, "addons": string }} config
	 */
	constructor(type, config)
	{
		super(type, config)
	}

	/**
	 * @param {*} interaction
	 * @param {Function[] | undefined} permissions
	*/
	async has_permissions(interaction, permissions)
	{
		let i = 0;
		let result = false;

		if (!permissions || permissions.length == 0)
			return (true);
		while (permissions[i])
		{
			result = await permissions[i](interaction.member);
			if (result) return (true);
			i++;
		}
		return (false);
	}

	/**
	 * @param {*} interaction
	 * @param {Function[] | undefined} conditions
	 */
	async has_conditions(interaction, conditions)
	{
		let i = 0;
		let result = false;

		if (!conditions)
			return (false);
		while (conditions[i])
		{
			result = await conditions[i](interaction);
			if (result) return (true);
			i++;
		}
		return (false);
	}

	/**
	 * 
	 * @param {AInteraction} source 
	 * @param {*} interaction 
	 */
	isEqual(source, interaction)
	{
		return (source.customId && source.customId == interaction.customId);
	}

	/**
	 * 
	 * @param {*} interaction 
	 */
	async scan(interaction)
	{
		if (interaction.customId == "test")
		{
			interaction.reply({content: "Waow, ça marche !", flags: [MessageFlags.Ephemeral]})
			return;
		}
		for (let i in this._list)
		{
			if (this.validChannel(interaction, this._list[i]))
			{
				if (this.isEqual(this._list[i], interaction)
					|| await this.has_conditions(interaction, this._list[i].conditions))
				{
					if (await this.has_permissions(interaction, this._list[i].permissions))
					{
						try {
							this._list[i].parse(interaction)
						} catch (error) {
							console.log(interaction.customId, error);
						}
					}
					else
					{
						interaction.reply({content: "Désolé mais, vous n'avez pas la permission d'utiliser "+ this._config.descriptior +" !", flags: [MessageFlags.Ephemeral]})
					}
					return;
				}
			}
		}
		if (isEnable(interaction.customId.split("-")[0]))
		{
			console.error(`${this._config.title}:`, interaction.customId, "doesn't work or doesn't exist!")
			interaction.reply(
				{
					content:
						"Désolé mais, une erreur est survenue, contactez le développeur !",
					flags: [MessageFlags.Ephemeral]
				}
			)
		}
		else
		{
			interaction.reply({content: "Désolé mais, cette fonctionnalitée a été désactivée !", flags: [MessageFlags.Ephemeral]})
		}
	}
}

class AInteraction extends AAction
{
	/**
	 * @type {string | undefined}
	 */
	customId;

	/**
	 * @type {Function[] | undefined}
	 */
	conditions;

	/**
	 * @type {Function[] | undefined}
	 */
	permissions;

	/**
	 * @type {boolean | undefined}
	 */
	dm;

	/**
	 * 
	 * @param {{
	* 	customId: string | undefined, dm: boolean | undefined,
	*   any_guild: boolean | undefined , parse: Function, conditions: Function[] | undefined,
	*   permissions: Function[] | undefined
	* }} interaction Informations e la nouvelle interaction
	* @param {string} file_path
	*/
   constructor(interaction, file_path)
   {
		super(interaction, file_path)
		this.parse = interaction.parse;
		this.conditions = interaction.conditions;
		this.dm = interaction.dm;
		this.permissions = interaction.permissions;
		this.customId = interaction.customId
   }
}

module.exports = { AInteractions, AInteraction }