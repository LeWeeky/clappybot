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

const { MEMBERS_TABLE } = require("../../libraries/data");
const { clappybot } = require("../../main");
const { History } = require("./history");


async function is_mute(guild, user_id)
{
	if (guild && guild.members.cache.has(user_id))
	{
		return (guild.members.cache.get(user_id)
			.roles.cache.has(await clappybot.roles.get("mute")));
	}
	return (await MEMBERS_TABLE.has(`membres.${user_id}.mute`));
}

async function mute_role_exists(guild)
{
	const mute_role_id = await clappybot.roles.get("mute");
	if (mute_role_id)
		return (guild.roles.cache.has(mute_role_id));
	return (false);
}

async function mute(user, reason, guild, author)
{
	await MEMBERS_TABLE.set(`membres.${user.id}.mute`, true);
	new History(user).add("mute", reason, author);

	if (guild.members.cache.has(user.id))

	{
		const mute_role_id = await clappybot.roles.get("mute")
		const member = guild.members.cache.get(user.id);
		const res = await member.roles.add(mute_role_id)
		.then(res => {
				return (true);
		})
		.catch(error => {
			console.log(error)
			console.log("Impossible de mettre le rôle mute /mute")
			return (false);
		})
		return (res)
	}
	return (true);
}

module.exports = { mute, is_mute, mute_role_exists }