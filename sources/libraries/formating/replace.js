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

const { LEVELS_TABLE, CONFIG_TABLE } = require('../data');
const { clappybot } = require('../../main');

async function get_guilds_number()
{
	let count = 0;

	await clappybot.bot.guilds.cache.forEach(guild => {
		count++;
	})
	return (count);
}

async function replaceByVariables(member, content, target = false, type = null) 

{
    if (!(await LEVELS_TABLE.has(`levels.${member.id}`)))

    {
        await LEVELS_TABLE.set(`levels.${member.id}`, {
            xp: 0,
            level: 0,
            pseudo: member.user.username
        })
    }

    const guild = member.guild

    while (["{user.pseudo}"].some(s => content.includes(s))) {
        content = content.replace("{user.pseudo}", member.user.username)
    }

    while (["{user.tag}"].some(s => content.includes(s))) {
        content = content.replace("{user.tag}", member.user.tag)
    }

    while (["{user.id}"].some(s => content.includes(s))) {
        content = content.replace("{user.id}", member.id)
    }

    while (content.includes("{user.mention}")) {
        content = content.replace("{user.mention}", `<@${member.user.id}>`)
    }

    while (["{user.avatarURL}"].some(s => content.includes(s))) {
        content = content.replace("{user.avatarURL}", member.user.displayAvatarURL({size: 256, dynamic: true}))
    }

    while (["{user.creation}"].some(s => content.includes(s))) {
        content = content.replace("{user.creation}", member.user.createdAt.toLocaleString("fr-FR"))
    }

    while (["{user.join}"].some(s => content.includes(s))) {
        content = content.replace("{user.join}", member.joinedAt.toLocaleString("fr-FR"))
    }

    while (content.includes("{user.level}")) {
        content = content.replace("{user.level}", await LEVELS_TABLE.get(`levels.${member.id}.level`))
    }

    while (content.includes("{user.xp}")) {
        content = content.replace("{user.xp}", await LEVELS_TABLE.get(`levels.${member.id}.xp`))
    }

    while (["{members}"].some(s => content.includes(s))) {
        content = content.replace("{members}", member.guild.memberCount)
    }

    while (["{bots}"].some(s => content.includes(s))) {
        content = content.replace("{bots}", guild.members.cache.filter(member => member.user.bot).size)
    }

	while (["{servers}"].some(s => content.includes(s))) {
        content = content.replace("{servers}", await get_guilds_number())
    }

	while (["{users}"].some(s => content.includes(s))) {
        content = content.replace("{users}", clappybot.bot.users.cache.filter(user => !user.bot).size)
    }

    while (["{humains}"].some(s => content.includes(s))) {
        const humains = guild.memberCount - guild.members.cache.filter(member => member.user.bot).size
        content = content.replace("{humains}", humains)
    }

    while (["{server.name}"].some(s => content.includes(s))) {
        content = content.replace("{server.name}", guild.name)
    }

    while (["{server.iconURL}"].some(s => content.includes(s))) {
        content = content.replace("{server.iconURL}", guild.iconURL({dynamic:true}))
    }

    while (["{server.creation}"].some(s => content.includes(s))) {
        content = content.replace("{server.creation}", guild.createdAt.toLocaleString("fr-FR"))
    }

    while (["{owner.id}"].some(s => content.includes(s))) {
        content = content.replace("{owner.id}", guild.ownerId)
    }

    while (["{owner.tag}"].some(s => content.includes(s))) {
        content = content.replace("{owner.tag}", guild.members.cache.get(guild.ownerId).user.tag)
    }

    while (["{owner.id}"].some(s => content.includes(s))) {
        content = content.replace("{owner.avatarURL}", guild.members.cache.get(guild.ownerId).user.displayAvatarURL({dynamic:true}))
    }

    while (["{owner.pseudo}"].some(s => content.includes(s))) {
        content = content.replace("{owner.pseudo}", guild.members.cache.get(guild.ownerId).user.username)
    }

    while (["{owner.pseudo}"].some(s => content.includes(s))) {
        content = content.replace("{owner.pseudo}", guild.members.cache.get(guild.ownerId).user.createdAt.toLocaleString("fr-FR"))
    }

    while (["{prefix}"].some(s => content.includes(s)))
	{
        content = content.replace("{prefix}", await CONFIG_TABLE.get(`bot.prefix`))
    }

    if (target)

    {

        const Member = target["user"]
        const Role = target["role"]
        const Channel = target["channel"]

        if (Member)

        {
            while (["{target.user.pseudo}"].some(s => content.includes(s))) {
                content = content.replace("{target.user.pseudo}", Member.user.username)
            }

            while (["{target.user.tag}"].some(s => content.includes(s))) {
                content = content.replace("{target.user.tag}", Member.user.tag)
            }

            while (["{target.user.id}"].some(s => content.includes(s))) {
                content = content.replace("{target.user.id}", Member.id)
            }

            while (["{target.user.avatarURL}"].some(s => content.includes(s))) {
                content = content.replace("{target.user.avatarURL}", Member.user.displayAvatarURL({size: 256, dynamic: true}))
            }

            while (["{target.user.creation}"].some(s => content.includes(s))) {
                content = content.replace("{target.user.creation}", Member.user.createdAt.toLocaleString("fr-FR"))
            }

            while (["{target.user.join}"].some(s => content.includes(s))) {
                content = content.replace("{target.user.join}", Member.joinedAt.toLocaleString("fr-FR"))
            }
        }

        if (Role)

        {
            while (["{target.role.color}"].some(s => content.includes(s))) {
                if (guild.roles.cache.get(target).color) {
                    content = content.replace("{target.role.color}", Role.color)
                } else {
                    content = content.replace("{target.role.color}", aucune)
                }
            }

            while (["{target.role.name}"].some(s => content.includes(s))) {
                    content = content.replace("{target.role.name}", Role.name)
            }

            while (["{target.role.id}"].some(s => content.includes(s))) {
                content = content.replace("{target.role.id}", Role.name)
            }
        }

        if (Channel)

        {
            while (["{target.channel.name}"].some(s => content.includes(s))) {
                content = content.replace("{target.channel.name}", Channel.name)
            }

            while (["{target.channel.id}"].some(s => content.includes(s))) {
                content = content.replace("{target.channel.id}", Channel.id)
            }
        }

    }

    return content

}

module.exports = { replaceByVariables }