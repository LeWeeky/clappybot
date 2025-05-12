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

const { clappybot } = require("../../main");

class Roles

{
    constructor (guild = clappybot.guild)

    {
        this.guild = guild;
    }

    get (id, mentions = false, target = 0)

    {
        if (mentions && mentions.size > target)

        {
            let mentionsList = []
            mentions.map((role, id) => {
                mentionsList.push([role, id])
            })

            const role = mentionsList[target][0]

            if (role)

            {
                return (role);
            }
        }

        if (id.startsWith("<@") && id.endsWith(">"))

        {
            id = id.slice(3, (id.length - 1));
        }
        if (!isNaN(id))

        {
			if (this.guild && this.guild.roles.cache.has(id))

			{
				return (this.guild.roles.cache.get(id));
			}
        }

        return (false);
    }

    list()

    {
        const roles = [];
        this.guild.roles.cache.forEach((role, role_id) => {
            if (role_id != this.guild.id)
            roles.push([role.name, role_id])
        })
        return (roles);
    }
}

module.exports = { Roles }