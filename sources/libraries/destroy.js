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

const { clappybot } = require("../main");
const { AutoWarn, BIRTHDAY_TABLE, CHANNELCREATOR_TABLE, CHANNELS_TABLE, COMMENT_TABLE,
ECONOMIE_TABLE, GHOSTPING_TABLE, LEVELS_TABLE, MEMBERS_TABLE, OPINION_TABLE, PARTNER_TABLE, RAID_TABLE, RECURRENT_TABLE,
ROLESREACTIONS_TABLE, ROLES_TABLE, SANCTIONS_TABLE, STATUS_TABLE, STREAM_TABLE, SUGGESTIONS_TABLE, TASKS_RELOAD_TABLE, VERIFICATIONS_POINTS_TABLE,
VERIFICATIONS_TABLE, VOTES_TABLE, WAB_TABLE, WARNS_TABLE, WELCOME_TABLE, resetModule } = require("./data");

class Destroy
{
	constructor(clap_id, owner_id)
	{
		if (clap_id != clappybot.id || owner_id != clappybot.owner_id)
			return (false);
		return (this);
	}

	async all()
	{
		await this.db();
		await this.reload();
	}

	async db()
	{
		await TASKS_RELOAD_TABLE.deleteAll()
		await OPINION_TABLE.deleteAll()
		await CHANNELS_TABLE.deleteAll()
		await CHANNELCREATOR_TABLE.deleteAll()
		await MEMBERS_TABLE.deleteAll()
		await ROLESREACTIONS_TABLE.deleteAll()
		await ROLES_TABLE.deleteAll()
		await VERIFICATIONS_TABLE.deleteAll()
		await resetModule.deleteAll()
		await WAB_TABLE.deleteAll()
		await PARTNER_TABLE.deleteAll()
		await RAID_TABLE.deleteAll()
		await VOTES_TABLE.deleteAll()
		await ECONOMIE_TABLE.deleteAll()
		await GHOSTPING_TABLE.deleteAll()
		await SUGGESTIONS_TABLE.deleteAll()
		await COMMENT_TABLE.deleteAll()
		await LEVELS_TABLE.deleteAll()
		await STATUS_TABLE.deleteAll()
		await WARNS_TABLE.deleteAll()
		await WELCOME_TABLE.deleteAll()
		await BIRTHDAY_TABLE.deleteAll()
		await AutoWarn.deleteAll()
		await SANCTIONS_TABLE.deleteAll()
		await VERIFICATIONS_POINTS_TABLE.deleteAll()
		await RECURRENT_TABLE.deleteAll()
		await STREAM_TABLE.deleteAll()
		return (this);
	}

	async reload()
	{
		globalThis.guild_id = undefined;
		clappybot.owner_id = undefined;
		clappybot.host = 0;
		clappybot.prefix = "+";
		await clappybot.reload_modules();
		return (this);
	}
}

module.exports = { Destroy }