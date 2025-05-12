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

const { Permissions } = require("../../libraries/discord");
const { History } = require("./history");

function bot_can_kick(guild)
{
	return (guild.members.me.permissions.has(Permissions.KickMembers));
}

function user_can_kick(member)
{
	return (member.permissions.has(Permissions.KickMembers));
}

async function kick(user, reason, author, guild)
{
	const date = new Date;
	let day = String(date.getDate());
	let month = String(date.getMonth()+1);
	const year = date.getFullYear();

	if (day.length == 1) day = "0"+day;
	if (month.length == 1) month = "0"+month;

	guild.members.cache.get(user.id).kick(`Modérateur: ${author.tag}, Date: ${day}/${month}/${year}, Raison: ${reason}`);
	new History(user).add("kick", reason, author);
}

module.exports = { bot_can_kick, user_can_kick, kick }