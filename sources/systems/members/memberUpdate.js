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
	"title": "memberUpdate",
	"descriptior": undefined,
	"direct_names": ["member_update", "members_update", "memberUpdate", "membersUpdate"],
	"shared_folder": true,
	"extension": "update.js",
	"folder": "members",
	"addons": "members/update"
}

class MembersUpdate extends AEvents
{
	constructor()
	{
		super(MemberUpdate, config)
	}

	/**
	 * 
	 * @param {GuildMember} old_member
	 * @param {GuildMember} new_member
	 */
	async scan(old_member, new_member)

	{
		for (let i in this._list)
		{
			if (this._list[i] && (!new_member.user.bot
				|| this._list[i].allow_bots)
				&& (old_member.guild.id == globalThis.guild_id || this._list[i].any_guild))
			{
				this._list[i].parse(old_member, new_member)
			}
		}
	}
}

class MemberUpdate extends AEvent
{
	/**
	 * 
	 * @param {{
	 * 	conditions: Function[] | undefined, permissions: Function[] | undefined, dm: boolean
	 * | undefined , any_guild: boolean | undefined, allow_bots: true | undefined, parse: Function
	 * }} event_handler Informations du nouveau message
     * @param {string} file_path
	 */
	constructor(event_handler, file_path)
	{
		super(event_handler, file_path)
	}
}

module.exports = { MemberUpdate, MembersUpdate }