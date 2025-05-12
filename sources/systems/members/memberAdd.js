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

const { GuildMember } = require("discord.js");
const { AEvents, AEvent } = require("../abstracts/events");

const config = {
	"title": "MemberAdd",
	"descriptior": undefined,
	"direct_names": ["member_add", "members_add", "memberAdd", "membersAdd"],
	"shared_folder": true,
	"extension": "join.js",
	"folder": "members",
	"addons": "members/join"
}

class MembersAdd extends AEvents
{
	constructor()
	{
		super(MemberAdd, config)
	}

	/**
	 * 
	 * @param {GuildMember} member
	 */
	async scan(member)
	{
		for (let i in this._list)
		{
			if (this._list[i].parse && (!member.user.bot
				|| this._list[i].allow_bots)
				&& (member.guild.id == globalThis.guild_id || this._list[i].any_guild))
			{
				this._list[i].parse(member)
			}
		}
	}
}

class MemberAdd extends AEvent
{
	/**
	 * 
	 * @param {{
	 * 	conditions: Function[] | undefined, dm: boolean
	 * | undefined , any_guild: boolean | undefined, allow_bots: true | undefined, parse: Function
	 * }} event_handler Informations du nouveau message
	 * @param {string} file_path
	 */
	constructor(event_handler, file_path)
	{
		super(event_handler, file_path)
	}
}

module.exports = { MemberAdd, MembersAdd }