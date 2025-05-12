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

const { subString } = require('../../libraries/formating/substring')
const { str_is_alpha } = require('../../libraries/informations/is_alpha')
const { isColor } = require('../../libraries/informations/is_color')
const { msg_cmd_reply } = require('../../libraries/messages/msg_cmd_reply')
const { isAdmin } = require('../../libraries/permissions/guild_admin')
const { colors, toIntColor } = require('../../libraries/colors')
const { EmbedBuilder, SlashCommandBuilder } = require('../../libraries/discord')
const { sql_select } = require('../../libraries/sql/select')
const { clappybot } = require('../../main')
const { interactions } = require('../../systems/interactions')
const { build_commands } = require('../../systems/interactions/slashBuilder')
const { command_is_ephemeral, command_is_public } = require('./functions/command_boolean')
const { command_exists } = require('./functions/command_exists')
const { create_command } = require('./functions/create_command')
const { delete_command } = require('./functions/delete_command')
const { get_command_id } = require('./functions/get_command')
const { reply_command } = require('./functions/reply_command')
const { update_command } = require('./functions/update_command')
const { getMainPanel } = require('./panels/main')

function parse_args(interaction, args)
{
	if (!interaction.options)
		return;
	const arg = interaction.options.getString("option");
	if (arg)
		args.push(arg);
}

function helpEdit(interaction, newCmd = "<votre commande>")
{
	let desc = 
	"↬ Définissez les attribus de votre nouvelle commande :\n"+
	"``` ▸ "+clappybot.prefix+"cmd edit "+newCmd+" title <votre titre> ```"+
	"``` ▸ "+clappybot.prefix+"cmd edit "+newCmd+" desc <description> ```"+
	"``` ▸ "+clappybot.prefix+"cmd edit "+newCmd+" color <couleur> ```"+
	"``` ▸ "+clappybot.prefix+"cmd edit "+newCmd+" footer <message> ```"+
	"``` ▸ "+clappybot.prefix+"cmd edit "+newCmd+" minititle <mini-titre> ```"+
	"``` ▸ "+clappybot.prefix+"cmd edit "+newCmd+" logo <url> ```"+
	"``` ▸ "+clappybot.prefix+"cmd edit "+newCmd+" banner <url> ```"+
	"↬ Dites à quoi elle sert / ce qu'elle fait :\n"+
	"``` ▸ "+clappybot.prefix+"cmd edit "+newCmd+" info <informations> ```"

	if (newCmd != "<votre commande>")

	{
		desc = "Félicitations ✨ ! Votre commande a été créé !\n\n"+desc
	}

	let embed = new EmbedBuilder()
	.setColor(colors.none)
	.setAuthor({name: "🧱 Cmd Creator | Édition Commande !"})
	.setDescription(desc)
	.setFooter({text: "↳Vous pouvez mettre ` remove ` devant l'attribut pour le retirer !"})

	msg_cmd_reply(interaction, {embeds:[embed]}, {reply: true, edit: true})
}

async function parse(interaction, cmd, args)
{
	if (interaction.options)
		await interaction.deferReply();
	parse_args(interaction, args);

	if (args.length == 0)
	{
		msg_cmd_reply(interaction, getMainPanel(), {reply: true, edit: true})
	}

	else

	{
		if (args[0] == "create")
		{
			if (args.length == 2)
			{
				const newCmd = args[1];

				if (!str_is_alpha(newCmd))
				{
					interaction.reply("Désolé mais, la commande ne doit être composée que de lettres !")
					return
				}

				if (await command_exists(newCmd))
				{
					interaction.reply("Désolé mais, la commande existe déjà !")
				}

				else

				{
					if (await create_command(newCmd))
					{
						const target = await interaction.channel.send("Rechargement des commandes !")
						await interactions.commands.reload();
						await build_commands();

						target.delete();
						helpEdit(interaction, newCmd)
					}
					else
					{
						interaction.reply("Désolé mais, une erreur est survenue ! Veuillez contacter le développeur ou réessayer plus tard.");
					}
				}
			}

			else

			{
				interaction.reply("Désolé mais, la commande est ` "+clappybot.prefix+"cmd create <nom> `")
			}
		}

		else

		if (args[0] == "edit")
		{
			if (args.length > 2)

			{
				const newCmd = args[1].toLowerCase();
				const cmd_id = await get_command_id(newCmd);

				if (cmd_id)
				{
					if (args[2] == "title")
					{
						if (args.length > 3)
						{
							const Args = interaction.content.substr(clappybot.prefix.length+cmd.length+1+4+1+newCmd.length+1+args[2].length+1)

							if (await update_command(cmd_id, "embed_title", Args))
							{
								reply_command(interaction, cmd_id);
							}
							else
							{
								interaction.reply("Désolé mais, une erreur est survenue ! Veuillez contacter le développeur ou réessayer plus tard.");
							}
						}

						else

						{
							interaction.reply("La commande est ` "+clappybot.prefix+"cmd edit "+newCmd+" title <titre> `")
						}
					}

					else

					if (args[2] == "minititle")

					{
						if (args.length > 3)

						{
							const Args = interaction.content.substr(clappybot.prefix.length+cmd.length+1+4+1+newCmd.length+1+args[2].length+1)
							
							if (await update_command(cmd_id, "embed_author", Args))
							{
								reply_command(interaction, cmd_id);
							}
							else
							{
								interaction.reply("Désolé mais, une erreur est survenue ! Veuillez contacter le développeur ou réessayer plus tard.");
							}
						}

						else

						{
							interaction.reply("La commande est ` "+clappybot.prefix+"cmd edit "+newCmd+" minititle <mini-titre> `")
						}
					}

					else

					if (["description", "desc"].includes(args[2])) 

					{
						if (args.length > 3)

						{
							const Args = interaction.content.substr(clappybot.prefix.length+cmd.length+1+4+1+newCmd.length+1+args[2].length+1)
							if (await update_command(cmd_id, "embed_description", Args))
							{
								reply_command(interaction, cmd_id);
							}
							else
							{
								interaction.reply("Désolé mais, une erreur est survenue ! Veuillez contacter le développeur ou réessayer plus tard.");
							}
						}

						else

						{
							interaction.reply("La commande est ` "+clappybot.prefix+"cmd edit "+newCmd+" description <description> `")
						}
					}

					else

					if (args[2] == "color")

					{
						if (args.length == 4)

						{
							if (isColor(args[3]))

							{
								const color = toIntColor(args[3].substr(1));

								if (await update_command(cmd_id, "embed_color", color))
								{
									reply_command(interaction, cmd_id);
								}
								else
								{
									interaction.reply("Désolé mais, une erreur est survenue ! Veuillez contacter le développeur ou réessayer plus tard.");
								}
							}

							else

							{
								let embed = new EmbedBuilder()
								.setAuthor({name: "🧱 Cmd Creator | Couleur Inconnue"})
								.setColor(colors.red)
								.setDescription("La couleur est invalide ! Essaie d'en générer une en cliquant [juste ici](https://www.canva.com/colors/color-palette-generator/)")

								interaction.channel.send({embeds:[embed]})
							}
						}

						else

						{
							interaction.channel.send("La commande est ` "+clappybot.prefix+"cmd edit "+newCmd+" color <couleur> `")
						}
					} 

					else

					if (args[2] == "footer")

					{
						if (args.length > 3)

						{
							const Args = interaction.content.substr(clappybot.prefix.length+cmd.length+1+4+1+newCmd.length+1+args[2].length+1)
							if (await update_command(cmd_id, "embed_footer", Args))
							{
								reply_command(interaction, cmd_id);
							}
							else
							{
								interaction.reply("Désolé mais, une erreur est survenue ! Veuillez contacter le développeur ou réessayer plus tard.");
							}
						}

						else

						{
							interaction.channel.send("La commande est ` "+clappybot.prefix+"cmd edit "+newCmd+" footer <message> `")
						}
					}

					else

					if (args[2] == "logo")

					{
						if (args.length > 3)

						{
							const Args = interaction.content.substr(clappybot.prefix.length+cmd.length+1+4+1+newCmd.length+1+args[2].length+1)
							if (await update_command(cmd_id, "embed_logo", Args))
							{
								reply_command(interaction, cmd_id);
							}
							else
							{
								interaction.reply("Désolé mais, une erreur est survenue ! Veuillez contacter le développeur ou réessayer plus tard.");
							}
						}

						else

						{
							interaction.reply("La commande est ` "+clappybot.prefix+"cmd edit "+newCmd+" footer <message> `")
						}
					}

					else

					if (args[2] == "banner")

					{
						if (args.length > 3)

						{
							const Args = interaction.content.substr(clappybot.prefix.length+cmd.length+1+4+1+newCmd.length+1+args[2].length+1)
							if (await update_command(cmd_id, "embed_banner", Args))
							{
								reply_command(interaction, cmd_id);
							}
							else
							{
								interaction.reply("Désolé mais, une erreur est survenue ! Veuillez contacter le développeur ou réessayer plus tard.");
							}
						} 

						else

						{
							interaction.reply("La commande est ` "+clappybot.prefix+"cmd edit "+newCmd+" footer <message> `")
						}
					}

					else

					if (["info", "infos", "information", "informations"].includes(args[2]))

					{
						if (args.length > 6)

						{
							const content = subString(interaction.content, clappybot.prefix.length+cmd.length+args[0].length+args[1].length+args[2].length);

							if (await update_command(cmd_id, "description", content))
							{
								interaction.reply("Informations mise à jour, elles apparaitrons quand l'utilisateur fait **/"+newCmd+"** !")
							}
							else
							{
								interaction.reply("Désolé mais, une erreur est survenue ! Veuillez contacter le développeur ou réessayer plus tard.");
							}
						} 

						else

						{
							interaction.channel.send("La commande est ` "+clappybot.prefix+"cmd edit "+newCmd+" info <informations> `")
						}
					}

					else

					if (args[2] == "remove")

					{
						if (args.length == 4)

						{
							if (args[3] == "title")

							{
								if (await update_command(cmd_id, "embed_title", null))
								{
									reply_command(interaction, cmd_id);
								}
								else
								{
									interaction.reply("Désolé mais, une erreur est survenue ! Veuillez contacter le développeur ou réessayer plus tard.");
								}
							}

							else

							if (args[3] == "minititle")

							{
								if (await update_command(cmd_id, "embed_author", null))
								{
									reply_command(interaction, cmd_id);
								}
								else
								{
									interaction.reply("Désolé mais, une erreur est survenue ! Veuillez contacter le développeur ou réessayer plus tard.");
								}
							}

							else

							if (["description", "desc"].includes(args[3]))

							{
								if (await update_command(cmd_id, "embed_description", null))
								{
									reply_command(interaction, cmd_id);
								}
								else
								{
									interaction.reply("Désolé mais, une erreur est survenue ! Veuillez contacter le développeur ou réessayer plus tard.");
								}
							}

							else

							if (args[3] == "color")

							{
								if (await update_command(cmd_id, "embed_color", colors.none))
								{
									reply_command(interaction, cmd_id);
								}
								else
								{
									interaction.reply("Désolé mais, une erreur est survenue ! Veuillez contacter le développeur ou réessayer plus tard.");
								}
							}

							else

							if (args[3] == "footer")

							{
								if (await update_command(cmd_id, "embed_footer", null))
								{
									reply_command(interaction, cmd_id);
								}
								else
								{
									interaction.reply("Désolé mais, une erreur est survenue ! Veuillez contacter le développeur ou réessayer plus tard.");
								}
							}

							else

							if (args[3] == "logo")

							{
								if (await update_command(cmd_id, "embed_logo", null))
								{
									reply_command(interaction, cmd_id);
								}
								else
								{
									interaction.reply("Désolé mais, une erreur est survenue ! Veuillez contacter le développeur ou réessayer plus tard.");
								}
							}

							else

							if (args[3] == "banner")

							{
								if (await update_command(cmd_id, "embed_banner", null))
								{
									reply_command(interaction, cmd_id);
								}
								else
								{
									interaction.reply("Désolé mais, une erreur est survenue ! Veuillez contacter le développeur ou réessayer plus tard.");
								}
							}

							else

							{
								interaction.reply(`Désolé mais, l'argument *${args[3]}* n'est pas reconnu !`)
							}
						} 

						else

						{
							interaction.reply("Commande inconnue !")
						}
					} 

					else

					if (["autosup", "autodel", "autosupprimer", "autodelete"].includes(args[2]))

					{
						if (args.length == 4)

						{
							if (args[3] == "on")

							{
								if (await command_is_ephemeral(cmd_id))

								{
									interaction.reply("La suppression automatique est déjà activée pour cette commande !")
								} 

								else

								{
									if (await update_command(cmd_id, "ephemeral", true))
									{
										interaction.reply("Suppression de la commande activée avec succès !")
									}
									else
									{
										interaction.reply("Désolé mais, une erreur est survenue ! Veuillez contacter le développeur ou réessayer plus tard.");
									}
								}
							}

							else

							if (args[3] == "off")

							{
								if (await command_is_ephemeral(cmd_id))

								{
									interaction.reply("La suppression automatique n'est pas activée sur cette commande !")
								}

								else

								{
									if (await update_command(cmd_id, "ephemeral", false))
									{
										interaction.reply("Suppression de la commande désactivée avec succès !")
									}
									else
									{
										interaction.reply("Désolé mais, une erreur est survenue ! Veuillez contacter le développeur ou réessayer plus tard.");
									}
								}
							}

							else

							{
								interaction.reply("La commande est ` "+clappybot.prefix+"cmd edit "+newCmd+" autosup <on/off> ` !")
							}
						}
					}

					else

					if (["args", "arguments"].includes(args[2]))

					{
						interaction.reply("Désolé mais, cette fonctionnalité a temporairement été retirée !")
						//editArgs(newCmd)
					}

					else

					{
						interaction.reply("Commande inconnu, faites ` "+clappybot.prefix+"help cmdcreator ` !")
					}
				}

				else

				{
					interaction.reply("La commande **"+newCmd+"** n'existe pas, faites ` "+clappybot.prefix+"cmd create "+newCmd+" ` !")
				}
			}

			else

			{
				interaction.reply(
					"Vous n'arrivez pas à utiliser cette commande ?\n"+
					" ↦ Faites ` "+clappybot.prefix+"help cmdcreator ` !"
					)
			}
		} 

		else

		if (args[0] == "alias")

		{
			interaction.reply("Désolé mais, cette commande a temporairement été retirée !")
			// if (args.length == 1)

			// {
			// 	let embed = new EmbedBuilder()
			// 	.setTitle("🧱 ◦ CmdCreator | Alias")
			// 	.setDescription(
			// 		" ▸ Alias ↦ Il s'agit des mots clefs qui renvoient à la commande mentionnée"+
			// 		`\`\`\`  ▸ Définitions ↦ ${clappybot.prefix}cmd allias <cmd> <set/add/rm> <allias> \`\`\``+
			// 		`\`\`\`  ▸ cmd = la commande dont vous voulez définir les allias \`\`\``+
			// 		`\`\`\`  ▸ set = définit le ou les allias qui correspondent \`\`\``+
			// 		`\`\`\`  ▸ add = ajoute le ou les allias à ceux déjà défini \`\`\``+
			// 		`\`\`\`  ▸ rm = retire le ou les allias à la liste des allias  \`\`\``+
			// 		`\`\`\`  ▸ allais = 1 ou plusieurs allais séparé par des espaces  \`\`\``+
			// 		`\`\`\`  ▸ ${clappybot.prefix}cmd allias <cmd> reset ↦ supprime tous les allias \`\`\``+
			// 		`\`\`\`  ▸ ${clappybot.prefix}cmd allias <cmd> list ↦ affiche la liste des allias \`\`\``
			// 	)
			// 	.setColor(colors.orange)

			// 	message.channel.send({embeds: [embed]})
			// }

			// else

			// {
			// 	const Cmd = args[1].trim()

			// 	if (await CMDCREATOR_TABLE.has(`cmd.${Cmd}`))

			// 	{
			// 		if (args.length == 2)

			// 		{
			// 			message.reply(`Vous n'avez pas spécifié d'action ! Faites ↦ *${clappybot.prefix}cmd allias* !`)
			// 		}

			// 		else

			// 		{
			// 			if (args[2] == "set")

			// 			{
			// 				if (args.length == 3)

			// 				{
			// 					message.reply(`Veuillez spécifier le ou les allias à définir !`)
			// 				}

			// 				else

			// 				{
			// 					let Alias = []
			// 					for (let i = 3; i < args.length; i++)

			// 					{
			// 						const allias = args[i].trim()

			// 						if (await CMDCREATOR_TABLE.has(`allias.${allias}`)) 

			// 						{
			// 							message.reply(`Désolé mais, **${allias}** est déjà utilisé comme allias !`)
			// 						}

			// 						else

			// 						{
			// 							if (await CMDCREATOR_TABLE.has(`cmd.${allias}`)) 

			// 							{
			// 								message.reply(`Désolé mais, **${allias}** ne peut pas être utilisé car une commande utilise déjà ce nom !`)
			// 							}

			// 							else

			// 							{
			// 								Alias.push(allias)
			// 							}
			// 						}
			// 					}

			// 					if (Alias.length > 0)

			// 					{
			// 						await CMDCREATOR_TABLE.set(`cmd.${Cmd}.allias`, Alias)

			// 						for (let i in Alias)

			// 						{
			// 							await CMDCREATOR_TABLE.set(`allias.${Alias[i]}`, Cmd)
			// 						}

			// 						message.reply(`Alias mis à jours !`)
			// 					}
			// 				}
			// 			}

			// 			else

			// 			if (args[2] == "reset")

			// 			{
			// 				if (args.length == 3)

			// 				{
			// 					const Alias = await CMDCREATOR_TABLE.get(`cmd.${Cmd}.allias`)

			// 					if (Alias)

			// 					{
			// 						let i = 0;
			// 						while (Alias[i])

			// 						{
			// 							await CMDCREATOR_TABLE.delete(`allias.${Alias[i]}`)
			// 							i++;
			// 						}

			// 						await CMDCREATOR_TABLE.delete(`cmd.${Cmd}.allias`)
			// 						message.reply("Les allias de cette commande ont bien été supprimés !")
			// 					}

			// 					else

			// 					{
			// 						message.reply("Cette commande ne possède pas d'allias !")
			// 					}
			// 				}

			// 				else

			// 				{
			// 					message.reply("Désolé mais, vous donnez trop d'arguments !")
			// 				}
			// 			}

			// 			else

			// 			if (args[2] == "add")

			// 			{
			// 				if (args.length == 3)

			// 				{
			// 					message.reply(`Veuillez spécifier le ou les allias à définir !`)
			// 				}

			// 				else

			// 				{
			// 					let Alias = []
			// 					for (let i = 3; i < args.length; i++)

			// 					{
			// 						const allias = args[i].trim()

			// 						if (await CMDCREATOR_TABLE.has(`allias.${allias}`)) 

			// 						{
			// 							message.reply(`Désolé mais, **${allias}** est déjà utilisé comme allias !`)
			// 						}

			// 						else

			// 						{
			// 							if (await CMDCREATOR_TABLE.has(`cmd.${allias}`))

			// 							{
			// 								message.reply(`Désolé mais, **${allias}** ne peut pas être utilisé car une commande utilise déjà ce nom !`)
			// 							}

			// 							else

			// 							{
			// 								Alias.push(allias)
			// 							}
			// 						}
			// 					}

			// 					if (Alias.length > 0)

			// 					{
			// 						for (let i in Alias)

			// 						{
			// 							await CMDCREATOR_TABLE.push(`cmd.${Cmd}.allias`, Alias[i])
			// 							await CMDCREATOR_TABLE.set(`allias.${Alias[i]}`, Cmd)
			// 						}

			// 						message.reply(`Alias mis à jours !`)
			// 					}
			// 				}
			// 			}

			// 			else

			// 			if (["remove", "delete", "rm", "del"].includes(args[2]))

			// 			{
			// 				if (args.length == 3)

			// 				{
			// 					message.reply(`Veuillez spécifier le ou les allias à définir !`)
			// 				}

			// 				else

			// 				{
			// 					const Alias = await CMDCREATOR_TABLE.get(`cmd.${Cmd}.allias`)

			// 					if (Alias && Alias.length > 0)

			// 					{
			// 						let toRemove = []
			// 						for (let i = 3; i < args.length; i++)

			// 						{
			// 							const allias = args[i].trim()

			// 							if (Alias.includes(allias))

			// 							{
			// 								await CMDCREATOR_TABLE.delete(`allias.${allias}`)
			// 								toRemove.push(allias)
			// 							}

			// 							else

			// 							{
			// 								message.reply(`Désolé mais, *${allias}* ne fait pas partie des allias de cette commande !`)
			// 							}
			// 						}

			// 						let newAlias = []

			// 						for (let i in Alias)

			// 						{
			// 							if (!toRemove.includes(Alias[i])) newAlias.push(Alias[i])
			// 						}

			// 						if (newAlias == Alias)

			// 						{
			// 							message.reply("Aucune modification apportée !")
			// 						}

			// 						else

			// 						{
			// 							await CMDCREATOR_TABLE.set(`cmd.${Cmd}.allias`, newAlias)
			// 							message.reply(`Alias mis à jours !`)
			// 						}
			// 					}

			// 					else

			// 					{
			// 						message.reply("Désolé mais, cette commande ne possède pas d'alliace !")
			// 					}
			// 				}
			// 			}

			// 			else

			// 			if (args[2] == "list")

			// 			{
			// 				const Alias = await CMDCREATOR_TABLE.get(`cmd.${Cmd}.allias`)

			// 				if (Alias.length > 0)

			// 				{
			// 					let desc = ""

			// 					for (let i in Alias)

			// 					{
			// 						if (desc.length == 0)

			// 						{
			// 							desc = Alias[i]
			// 						}

			// 						else

			// 						{
			// 							desc = `${desc}, ${Alias[i]}`
			// 						}
			// 					}

			// 					let embed = new EmbedBuilder()
			// 					.setTitle("🧱 CmdCreator | Liste d'Alias")
			// 					.setDescription(` ▸ ${desc}`)
			// 					.setColor(colors.orange)

			// 					message.channel.send({embeds: [embed]})
			// 				}

			// 				else

			// 				{
			// 					message.reply("Cette commande n'a pas d'allias !")
			// 				}
			// 			}

			// 			else

			// 			{
			// 				message.reply(`Désolé mais, l'argument *${args[2]}* n'est pas reconnu`)
			// 			}
			// 		}
			// 	}

			// 	else

			// 	{
			// 		message.reply(`Désolé mais, la commande *${Cmd}* n'existe pas !`)
			// 	}
			// }
		}

		else

		/*

		if (args[0] == "code")

		{
			if (args.length == 1)

			{
				let embed = new EmbedBuilder()
				.setTitle("🧱 ◦ CmdCreator | Code")
				.setDescription(
					" ▸ Renvoie le code que vous avez défini pour vos paramètres"+
					`\`\`\`  ▸ ${clappybot.prefix}cmd code <cmd>  \`\`\``+
					`\`\`\`  ▸ cmd = la commande dont vous voulez définir les allias \`\`\``+
					`\`\`\`  ▸ set = définit le ou les allias qui correspondent \`\`\``+
					`\`\`\`  ▸ add = ajoute le ou les allias à ceux déjà défini \`\`\``+
					`\`\`\`  ▸ rm = retire le ou les allias à la liste des allias  \`\`\``+
					`\`\`\`  ▸ allais = 1 ou plusieurs allais séparé par des espaces  \`\`\``+
					`\`\`\`  ▸ ${clappybot.prefix}cmd allias <cmd> reset ↦ supprime tous les allias \`\`\``+
					`\`\`\`  ▸ ${clappybot.prefix}cmd allias <cmd> list ↦ affiche la liste des allias \`\`\``
				)
				.setColor(colors.orange)

				message.channel.send({embeds: [embed]})
			}

			else 

			{

			}
		}

		else 
		
		*/

		if (args[0] == "rename")

		{
			if (args.length == 3)

			{
				const oldCmd = args[1]
				const newCmd = args[2]

				if (await command_exists(oldCmd)) 

				{
					if (!str_is_alpha(newCmd))
					{
						interaction.reply("Désolé mais, la commande ne doit être composée que de lettres !")
						return;
					}
					if (!await command_exists(newCmd)) 

					{
						const cmd_id = await get_command_id(oldCmd);

						if (!cmd_id ||  await update_command(cmd_id, "name", newCmd))
						{
							interaction.reply("Commande renommée !")
						}
						else
						{
							interaction.reply("Désolé mais, une erreur est survenue ! Veuillez contacter le développeur ou réessayer plus tard.");
						}
					} 

					else

					{
						interaction.reply("Commande **"+newCmd+"** déjà existante !")
					}
				} 

				else

				{
					interaction.reply("Commande **"+oldCmd+"** inexistante !")
				}
			}

			else

			{
				interaction.reply("La commande est ` "+clappybot.prefix+"cmd rename <ancien nom> <nouveau nom> ` !")
			}
		}

		else

		if (["list", "liste"].includes(args[0]))

		{
			const connection = clappybot.database.connect();
			const cmds = await sql_select(connection, "cmdcreator_commands", "name");

			if (!cmds || cmds.length == 0)
			{
				let embed = new EmbedBuilder()
				.setAuthor({name: "🧱 Cmd Creator | Liste des Commandes"})
				.setColor(colors.orange)
				.setDescription("Et bien c'est vide !")

				msg_cmd_reply(interaction, {embeds:[embed]}, {reply: true, edit: true})
			}

			else

			{
				let cmdList = ""
				let i = 0;

				for (i; i < cmds.length; i++)
				{
					const target_cmd = " ▸ Commande N°"+(i+1)+" ↴```"+cmds[i].name+"```";

					if (target_cmd.length + cmdList.length > 4000)
					{
						cmdList+="Pour voir __toutes__ les commandes rendez-vous sur notre site !\n";
						continue;
					}
					cmdList+=target_cmd;
				}

				cmdList+="\n**__Total__:** "+i

				let embed = new EmbedBuilder()
				.setAuthor({name: "🧱 Cmd Creator | Liste des Commandes"})
				.setColor(colors.orange)
				.setDescription(cmdList)

				msg_cmd_reply(interaction, {embeds:[embed]}, {reply: true, edit: true})
			}
		}

		else

		if (args[0] == "delete")

		{
			if (args.length == 2)

			{
				const cmd_id = await get_command_id(args[1]);

				if (cmd_id)

				{
					if (await delete_command(cmd_id))
					{
						const target = await interaction.channel.send("Rechargement des commandes !")
						await interactions.commands.reload();
						await build_commands();
						target.delete();

						interaction.reply("Commande supprimée")
					}
					else
					{
						interaction.reply("Désolé mais, une erreur est survenue ! Veuillez contacter le développeur ou réessayer plus tard.");
					}
				} 

				else

				{
					interaction.reply("Commande inexistante !")
				}
			} 

			else

			{
				interaction.reply("La commande est : ` "+clappybot.prefix+"cmd delete <nom> `")
			}
		}

		else

		if (["publique", "public"].includes(args[0]))

		{
			if (args.length == 3)

			{
				const Cmd = args[1]
				const cmd_id = await get_command_id(Cmd);

				if (cmd_id)
				{
					if (args[2] == "on")
					{
						if (await command_is_public(cmd_id))

						{
							interaction.reply("Désolé mais, cette commande est déjà publique !")
						} 

						else

						{
							if (await update_command(cmd_id, "public", true))
							{
								await build_commands();
								interaction.reply("La commande a bien été rendu publique, elle sera disponible dans tous les serveurs !")
							}
							else
							{
								interaction.reply("Désolé mais, une erreur est survenue ! Veuillez contacter le développeur ou réessayer plus tard.");
							}
						}
					}

					else

					if (args[2] == "off")

					{
						if (await command_is_public(cmd_id))

						{
							interaction.reply("Désolé mais, cette commande est déjà privée !")
						} 

						else

						{
							if (await update_command(cmd_id, "public", false))
							{
								await build_commands();
								interaction.reply("La commande a bien été rendu privée, elle ne sera plus disponible dans les autres serveurs !")
							}
							else
							{
								interaction.reply("Désolé mais, une erreur est survenue ! Veuillez contacter le développeur ou réessayer plus tard.");
							}
						}
					}

					else

					{
						interaction.reply({content: `Désolé mais, l'argument *${args[2]}* est invalide !`})
					}
				}

				else

				{
					interaction.channel.send("Commande **"+Cmd+"** inexistante !")
				}
			}

			else

			{
				interaction.channel.send("La commande est ` "+clappybot.prefix+"cmd public <commande> <on/off> ` !")
			}
		}

		else

		if (["aide", "help"].includes(args[0]))
		
		{
			helpEdit(interaction);
		}

		else

		{
			interaction.reply('Argument inconnu faites ` '+clappybot.prefix+'help cmdcreator ` !')
		}
	}
}

module.exports = {
	parse,
	name: "cmdcreator",
	permissions: [
		isAdmin
	],
	builder: new SlashCommandBuilder()
		.setName("cmdcreator")
		.setDescription("Créateur de commandes !")
		.setDefaultMemberPermissions(0)
		.addStringOption(option =>
            option.setName("option")
            .setDescription("Sélectionnez une option")
			.setChoices(
				{
					name: "🛟 Aides & Explications",
					value: "help"
				},
				{
					name: "📝 Liste",
					value: "list"
				}
			)
            .setRequired(false)
			)
}