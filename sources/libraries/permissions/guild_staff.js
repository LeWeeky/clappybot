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

const { GuildMember, User } = require("discord.js");
const { ROLES_TABLE } = require( "../../libraries/data");
const { isAdmin } = require("./guild_admin");

/**
 * 
 * @param {GuildMember | User} member 
 * @returns 
 */
async function isStaff(member)

{
	if (member instanceof GuildMember)
	{
		const staff = await ROLES_TABLE.get("staff");
		const staff2 = await ROLES_TABLE.get("staff2");

		if (staff && member.roles.cache.has(staff)
		|| staff2 && member.roles.cache.has(staff2))
			return (true);
	}
    if (isAdmin(member))
		return (true);
    return (false);
}

module.exports = { isStaff }