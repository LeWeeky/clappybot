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

const { Permissions } = require("../discord");
const { History } = require("./history");

function bot_can_ban(guild)
{
	return (guild.members.me.permissions.has(Permissions.BanMembers));
}

function user_can_ban(member)
{
	return (member.permissions.has(Permissions.BanMembers));
}

async function ban(user, reason, author, guild)
{
	const date = new Date;
	let day = String(date.getDate());
	let month = String(date.getMonth()+1);
	const year = date.getFullYear();

	if (day.length == 1) day = "0"+day;
	if (month.length == 1) month = "0"+month;

	guild.members.ban(user.id, {reason: `Modérateur: ${author.tag}, Date: ${day}/${month}/${year}, Raison: ${reason}`});
	new History(user).add("mute", reason, author);
}

module.exports = { bot_can_ban, user_can_ban, ban }