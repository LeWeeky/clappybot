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
const { Message, ChannelType, ChatInputCommandInteraction, SlashCommandBuilder, MessageFlags } = require("discord.js");
const { isEnable } = require("../libraries/informations/is_enable");
const { SlashCommands } = require("./interactions/slashCmd");
const cmdCreator = require("../modules/cmdcreator/cmd_listener");
const { get_commands } = require("../modules/cmdcreator/functions/get_commands");
const { str_is_alpha } = require("../libraries/informations/is_alpha");
const { AAction, AActions } = require("./abstracts/actions");

const config = {
	"title": "commands",
	"descriptior": undefined,
	"direct_names": ["command", "cmd"],
	"shared_folder": false,
	"extension": "cmd.js",
	"folder": "commands",
	"addons": "commands"
}

function get_cmd_description(data)

{
	if (data.informations)
		return (data.informations)
	return ("Une commande personnalisée créé via le CmdCreator !");
}

class Commands extends AActions
{
	/** Donnée de création des slash commandes
	 * @type {SlashCommands}
	 */
	commands_builder;

	constructor()
	{
		super(Command, config)
		this.commands_builder = new SlashCommands();
	}

	/**
	 * 
	 * @param {Command} cmd commande à ajouter
	 * @param {String} file_path chemin d'accès vers le fichier
	 */
	add(cmd, file_path)
	{
		if (cmd.name)
			super.add(cmd, file_path)
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
	 * 
	 * @param {string} path
	 */
	#load_dir(path)
	{
		readdirSync(path)
		.forEach(file => 
		{
			if (file.endsWith(".js"))
			{
				const file_path = `../.${path}/${file}`;
				const command = require(file_path.slice(0, file_path.length - 3));
				this.add(command, file_path);
				this.commands_builder.add(command);
			}
		});
	}

	async load_cmdcreator()
	{
		if (isEnable("cmdcreator"))
		{
			const cmd_list = await get_commands();

			if (cmd_list)
			{
				for (let i = 0; i < cmd_list.length; i++)
				{
					if (!str_is_alpha(cmd_list[i].name))
						continue ;
					const cmd_data = {
						parse: cmdCreator.parse,
						name: cmd_list[i].name,
						alias: [],
						permissions: undefined,
						dm: false,
						builder: new SlashCommandBuilder()
						.setName(cmd_list[i].name)
						.setDescription(get_cmd_description(cmd_list[i].name)),
						any_guild: cmd_list[i].public[0] !== 0x00
					}
					this.add(cmd_data, "cmdcreator");
					if (cmd_list[i].name != "help")
						this.commands_builder.add(cmd_data);
				}
			}
		}
	}

	load_addon()
	{
		if (existsSync(`./add-on/${config.addons}`))
		{
			readdirSync(`./add-on/${config.addons}`)
			.forEach(module => 
			{
				if (module.endsWith(config.extension))
				{
					const file_path = `../../add-on/${config.addons}/${module}`;
					const command = require(file_path.slice(0, file_path.length - 3));
					this.add(command, file_path);
					this.commands_builder.add(command);
				}
				else if (statSync(`./add-on/${config.addons}/${module}`).isDirectory())
				{
					readdirSync(`./add-on/${config.addons}/${module}`)
					.forEach(file =>
					{
						if (file.endsWith(config.extension))
						{
							const file_path = `../../add-on/${config.addons}/${module}/${file}`;
							const command = require(file_path.slice(0, file_path.length - 3));
							this.add(command, file_path);
							this.commands_builder.add(command);
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
					if (file == config.folder)
					{
						this.#load_dir(`./sources/modules/${module}/${config.folder}`)
					}
					else if (file.endsWith(config.extension) || this.isDirectFile(file))
					{
						const file_path = `../../sources/modules/${module}/${file}`;
						const command = require(file_path.slice(0, file_path.length - 3));
						this.add(command, file_path);
						this.commands_builder.add(command);
					}
				});
			}
		});
		this.load_addon();
		// await this.load_cmdcreator(); temporarily unavailable
		console.log(`${this._list.length} commandes ont bien été chargées`)
	}

	async reload()
	{
		this.commands_builder.destroy();
		this.destroy();
		await this.load();
	}

	#isDM(channel)
	{
		return (channel.type == ChannelType.DM
			|| channel.type == ChannelType.GroupDM)
	}

	#isValidExecutor(interaction, cmd)
	{
		return (!interaction.bot
			|| cmd.allow_bots)
	}

	/**
	 * 
	 * @param {Message | ChatInputCommandInteraction} interaction
	 * @param {Command} cmd 
	 * @param {{res: boolean}} replyied
	 * @returns {boolean}
	 */
	validCommandChannel(interaction, cmd, replyied)
	{
		if (this.#isDM(interaction.channel))
		{
			if (cmd.dm)
				return (true);
			replyied.res = true;
			interaction.reply({content: `Désolé mais, cette commande n'est pas disponible en message privé.`, flags: [MessageFlags.Ephemeral]})
			return (false);
		}
		if (interaction.guild &&
			(interaction.guild.id == globalThis.guild_id)
			|| cmd.any_guild)
			return (true);
		return (false);
	}
	/**
	 * 
	 * @param {Message | ChatInputCommandInteraction} interaction interaction ou message
	 * @param {string} cmd interaction ou format parsé du message
	 * @param {string[]} args arguments du message parsé
	 * @return {Promise<boolean>}
	 */
	async scan(interaction, cmd, args)
	{
		const replyied = {res: false};

		for (let i in this._list)

		{
			if (this.#isValidExecutor(interaction, cmd)
				&& (this._list[i].name == cmd || this._list[i].alias.includes(cmd))
				&& this.validCommandChannel(interaction, this._list[i], replyied))
			{
				if (replyied.res)
					break;
				if (await this.has_permissions(interaction, this._list[i].permissions))
					this._list[i].parse(interaction, cmd, args);
				else
					interaction.reply({content: `Désolé mais, vous n'avez pas la permission d'utiliser cette commande.`})
				return (true);
			}
		}
		return (replyied.res);
	}
}

class Command extends AAction
{
	/**
	 * @type {string}
	 */
	name;

	/**
	 * @type {string[]}
	 */
	alias = [];

	/**
	 * @type {Function[] | false | undefined}
	 */
	permissions;

	/**
	 * @type {Function}
	 * @param {Message} interaction 
	 * @param {string} cmd 
	 * @param {string[]} args 
	 */
	exe;

	/**
	 * 
	 * @param {{
	 * name: string, alias: string[] | undefined, builder: SlashCommandBuilder | undefined,
	 * permissions: Function[] | undefined, dm: boolean | undefined ,
	 * any_guild: boolean | undefined, parse: Function, conditions: undefined
	 * }} cmd Informations de la nouvelle commande
	 * @param {string} file_path
	 */
	constructor(cmd, file_path)
	{
		super(cmd, file_path)
		this.name = cmd.name;
		if (cmd.alias) this.alias = cmd.alias;
		this.permissions = cmd.permissions;
		this.dm = cmd.dm;
		this.any_guild = cmd.any_guild;
	}
}

module.exports = { Command, Commands }