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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////   DATABASES ~ IMPORTS    //////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// [ !!! ] WARNING [ !!! ] 
/*
	Most of these tables are deprecated and will soon be removed, you can still create your own tables via :
	“MAIN_DATABASE” if you want a fast local database.

	Otherwise, use the “DataBaseLinker” class to connect to your MySQL, MariaDB, PostgressDBor other remote
	database system.
*/

const mysql = require('mysql2');
const { QuickDB, SqliteDriver } = require('quick.db');
const main_driver = new SqliteDriver("./data/main_db.sqlite");
const addon_driver = new SqliteDriver("./data/addon_db.sqlite");

const MAIN_DATABASE = new QuickDB({filePath: "main_db.sqlite", driver: main_driver});
const ADD_ON_DATABASE = new QuickDB({filePath: "addon_db.sqlite", driver: addon_driver});

const CACHE_TABLE = MAIN_DATABASE.table('cache');
const TICKETS_TABLE = MAIN_DATABASE.table('ticketDB');
const BIRTHDAY_TABLE = MAIN_DATABASE.table('birthday');
const TASKS_RELOAD_TABLE = MAIN_DATABASE.table('tasks_reload');
const OPINION_TABLE = MAIN_DATABASE.table('avis');
const CHANNELS_TABLE = MAIN_DATABASE.table('systemChannels');
const CHANNELCREATOR_TABLE = MAIN_DATABASE.table('channelcreator');
const COMMENT_TABLE = MAIN_DATABASE.table('comment')
const CONFIG_TABLE = MAIN_DATABASE.table('modules');
const ECONOMIE_TABLE = MAIN_DATABASE.table("Economie");
const INVITATIONS_TABLE = MAIN_DATABASE.table("invitations");
const GHOSTPING_TABLE = MAIN_DATABASE.table('ghostPing');
const GIVEAWAY_TABLE = MAIN_DATABASE.table('giveaway');
const MODERATION_TABLE = MAIN_DATABASE.table('moderation');
const MEMBERS_TABLE = MAIN_DATABASE.table('MembersDB');
const PARTNER_TABLE = MAIN_DATABASE.table('partner');
const RECURRENT_TABLE = MAIN_DATABASE.table('recurrent');
const ROLES_TABLE = MAIN_DATABASE.table('ServerRoles');
const ROLESREACTIONS_TABLE = MAIN_DATABASE.table('RoleReact');
const RAID_TABLE = MAIN_DATABASE.table('RaidDB');
const VOTES_TABLE = MAIN_DATABASE.table('VotesDB');
const VERIFICATIONS_TABLE = MAIN_DATABASE.table('verifID');
const WAB_TABLE = MAIN_DATABASE.table('WhiteAndBlackList');

const SUGGESTIONS_TABLE = MAIN_DATABASE.table('suggData');
const STREAM_TABLE = MAIN_DATABASE.table('stream');

const LEVELS_TABLE = MAIN_DATABASE.table('LevelsDB');
const STATUS_TABLE = MAIN_DATABASE.table('StatusDB');
const WARNS_TABLE = MAIN_DATABASE.table('warnID');
const WELCOME_TABLE = MAIN_DATABASE.table('bvnMSG');

const AutoWarn = MAIN_DATABASE.table('AutoWarn');
const SANCTIONS_TABLE = MAIN_DATABASE.table("Sanction");
const resetModule = MAIN_DATABASE.table('resetModule');

const EmbedDB = MAIN_DATABASE.table('defEmbed');
const VERIFICATIONS_POINTS_TABLE = MAIN_DATABASE.table('PointsVerifs');

class DataBaseLinker
{
	/**
	 * @type {string | undefined}
	 */
	#user;
	/**
	 * @type {string | undefined}
	 */
	#password;
	/**
	 * @type {string | undefined}
	 */
	#name;
	/**
	 * @type {string | undefined}
	 */
	#host;
	/**
	 * @type {number}
	 */
	#locks;
	/**
	 * @type {import('mysql2').Connection | null}
	 */
	#connection

	/**
	 * 
	 * @param {{
	 * 	user: string,
	 * 	password: string,
	 *	name: string,
	 *	host: string
	 * } | false} custom 
	 */
	constructor(custom = false)
	{
		if (!custom)
		{
			this.#user = process.env.SERVICE_ID;
			this.#password = process.env.PASSWORD;
			this.#name = process.env.SERVICE_ID;
			this.#host = process.env.DB_HOST;
		}
		else
		{
			this.#user = custom.user;
			this.#password = custom.password;
			this.#name = custom.name;
			this.#host = custom.host;
		}
		this.#locks = 0;
		this.#connection = null;
	}

	connect()
	{
		if (!this.#connection || this.#locks < 1)
		{
			if (!this.#user || !this.#password || !this.#name)
				return (false);
			this.#connection = mysql.createConnection({
				host: this.#host,
				user: this.#user,
				password: this.#password,
				database: this.#name,
				supportBigNumbers: true,
				bigNumberStrings: true
			});
			this.#locks = 0;
		}
		this.#locks++;
		if (process.env.DEBUG_TRACE == "true")
			console.log("new connection : ", this.#locks);
		return (this.#connection);
	}

	break(full = false)
	{
		if (full)
		{
			this.#locks = 0;
			if (process.env.DEBUG_TRACE == "true")
				console.log("break full : ", this.#locks);
		}
		else
		{
			this.#locks--;
			if (process.env.DEBUG_TRACE == "true")
				console.log("break connection : ", this.#locks);
		}
		if (this.#locks < 1 && this.#connection)
		{
			this.#connection.end();
			this.#connection = null;
		}
	}
}

module.exports = {
	DataBaseLinker,
	CACHE_TABLE,
    ADD_ON_DATABASE,
    TASKS_RELOAD_TABLE,
    OPINION_TABLE,
    CHANNELS_TABLE,
    CHANNELCREATOR_TABLE,
    CONFIG_TABLE,
    MEMBERS_TABLE,
    ROLESREACTIONS_TABLE,
    ROLES_TABLE,
    VERIFICATIONS_TABLE,
    resetModule,
    WAB_TABLE,
	PARTNER_TABLE,
    RAID_TABLE,
    VOTES_TABLE,
    ECONOMIE_TABLE,
    GHOSTPING_TABLE,
    SUGGESTIONS_TABLE,
    COMMENT_TABLE,
    LEVELS_TABLE,
    STATUS_TABLE,
    WARNS_TABLE,
    WELCOME_TABLE,
    BIRTHDAY_TABLE,
    AutoWarn,
    SANCTIONS_TABLE,
    EmbedDB,
    VERIFICATIONS_POINTS_TABLE,
	RECURRENT_TABLE,
	STREAM_TABLE,
	GIVEAWAY_TABLE,
	MODERATION_TABLE,
	INVITATIONS_TABLE,
	TICKETS_TABLE
}