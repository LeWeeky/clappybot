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
/////////////////////////////////////////    CLAPPYBOTS ~ MAIN     //////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const { Random } = require('./libraries/random_numbers');
const { Client } = require('./libraries/discord');
const { ROLES_TABLE, CHANNELS_TABLE, DataBaseLinker, CONFIG_TABLE } = require("./libraries/data");
const { readdirSync } = require('fs');
const dotenv = require("dotenv");
const { exit } = require('process');
const { save_env } = require('./libraries/save_env');
const { get_owner_id } = require('./libraries/fetching/owner');
const { get_host_remaining_days } = require('./libraries/fetching/host');
const { sql_insert } = require('./libraries/sql/insert');
const { sql_request } = require('./libraries/sql/request');
const { sql_select } = require('./libraries/sql/select');
const { version } = require("../package.json")

function getAscii()

{
    const ASCII =

    [
`
.__                        
/  | _  _  _   |__| _  _|_ 
\\__|(_||_)|_)\\/|  |(_)_)|_ 
    |  |  /             
`.trim()

        ,

`-------- ปรบมือโฮสติ้ง --------`

        ,

`-------- paʻipaʻi hoʻokipa --------`
        ,

`
-.-. .-.. .- .--. .--. -.-- .... --- ... -
`.trim(),
`-------- クラッピークルー --------`
        ,

`
.---..-.   .---..---..---..-..-..-. .-..----..---..---.
| |  | |__ | | || |-'| |-' >  / | |=| || || | \\ \\ \`| |'
\`---'\`----'\`-^-'\`-'  \`-'   \`-'  \`-' \`-'\`----'\`---' \`-' 
`.trim()

        ,

`
.  ,___ _                       __             
  /   ///                      ( /  /       _/_
 /    // __,   ,_    ,_   __  , /--/ __ (   /  
(___/(/_(_/(__/|_)__/|_)_/ (_/_/  /_(_)/_)_(__ 
            /|    /|      /                  
            (/    (/      '                  
`.trim()
        ,

`
.  ____ _                         _   _           _   
  / ___| | __ _ _ __  _ __  _   _| | | | ___  ___| |_ 
 | |   | |/ _\` | '_ \\| '_ \\| | | | |_| |/ _ \\/ __| __|
 | |___| | (_| | |_) | |_) | |_| |  _  | (_) \__ \ |_ 
 \\____|_|\\__,_| .__/| .__/ \\__, |_| |_|\\___/|___/\\__|
            |_|   |_|    |___/                                   
`.trim()
    ]

    const i = new Random(0, ASCII.length).next();
    return (ASCII[i])
}

class ConfigRoles
// [!] Classe dépréciée, sera bientôt supprimée
{
    async get(role_name)

    {
        return (await ROLES_TABLE.get(role_name));
    }

    async set(role_name, role_id)

    {
        return (await ROLES_TABLE.set(role_name, role_id));
    }
}

class ClappyBot

{
	/**
	 * @type {string | false | null}
	 */
	guild_id;

	/**
	 * @type {string | false | null}
	 */
	owner_id;

	/**
	 * @type {DataBaseLinker}
	 */
	database;

    constructor ()

    {
		dotenv.config({path: "./data/.env", override: true});
        this.bot = new Client({intents: 3276799});
        this.guild_id = false;
        this.owner_id = false;
        this.id = "abcde";
        this.ready = false;
        this.version = version
        this.roles = new ConfigRoles();
        this.modules = {};
		this.tmp_modules = {};
        this.disabled_modules = {};
        this.prefix = "+";
        this.dolphin = false;
        this.swap = {
            ram_log: [],
            invives: {},
            antiraid: {
                members: {},
                channels: {},
                guild: {}
            },
            mutex: {},
            tmp: {}
        };
    }

    /**
     * 
     * @param {Client} bot 
     */
    async init (bot)

    {
		if (!await CONFIG_TABLE.has(`update`))
		{
			console.log("🔥 Nouveau ClappyBot !", clappybot.version)
			await CONFIG_TABLE.set(`update`, clappybot.version);
		}
		this.database = new DataBaseLinker();
		if (process.env.NEW_TOKEN && process.env.NEW_TOKEN.length > 0)
		{
			console.log("🔑 Nouveau token")
			process.env.TOKEN = process.env.NEW_TOKEN;
			save_env();
			delete process.env.NEW_TOKEN;
		}
		if (!process.env.DB_HOST)
			this.warning("DB_HOST not set!");
		if (!process.env.PASSWORD)
			this.warning("PASSWORD not set!");
		if (!process.env.SERVICE_ID)
			this.warning("SERVICE_ID not set!");
		if (!process.env.TOKEN || process.env.TOKEN.length == 0)
        {
			this.critical("Token not found ...");
			exit(2);
		}
        if (!process.env.TOKEN || process.env.TOKEN.length == 0)
        {
			console.error("Token not found ...");
			exit(2);
		}
        bot.login(process.env.TOKEN);
        readdirSync("./sources/listeners/")
        .forEach(file => 
        {
            const event = require(`./listeners/${file}`);
            bot.on(event.name, (...args) => {
                if (event.name == "ready")
                    event.listen(bot)
                else
                    event.listen(...args)
            });
        });
    }

    async new (bot)

    {
        this.bot = bot
		if (process.env.SERVICE_ID)
        	this.id = process.env.SERVICE_ID
		else
			this.id = "EMPTY";

		const row =	await sql_select(clappybot.database.connect(), "myclappybot", "guild_id")
		clappybot.database.break();
		if (row && row.length > 0)
		{
			globalThis.guild_id = row[0].guild_id
			this.guild_id = globalThis.guild_id
		}

       this.owner_id = await get_owner_id(process.env.SERVICE_ID);

        let prefix = await CONFIG_TABLE.get(`bot.prefix`);

        if (!prefix) 
        {
            prefix = "+";
            await CONFIG_TABLE.set(`bot.prefix`, "+");
        }

        this.prefix = prefix;

        await this.reload_modules();
        this.ready = true;

        return (this);
    }

	warning(message)
	{
		if (process.env.DEBUG_WARNING != "false")
		{
			console.warn('\x1b[31m%s\x1b[0m', "[ ! WARING ! ]:", message)
		}
	}

	critical(message)
	{
		if (process.env.DEBUG_CRITICAL != "false")
		{
			console.error('\x1b[31m%s\x1b[0m', "[ !!! CRITICAL !!! ]:", message)
		}
	}
	/**
	 * 
	 * @param {string} prefix 
	 */
    set_prefix(prefix)

    {
        this.prefix = prefix;

        CONFIG_TABLE.set(`bot.prefix`, prefix)
    }

	/**
	 * 
	 * @param {string} guild_id 
	 */
    async setGuild(guild_id)

    {
		globalThis.guild_id = guild_id;

		const connection = this.database.connect();
		const row = await sql_request(connection,
			"SELECT EXISTS(SELECT 1 FROM myclappybot) AS element_exists"
		);

		if (row && row.length)
		{
			await sql_request(connection,
				"UPDATE myclappybot SET guild_id = ?",
				[guild_id])
		}
		else
		{
			await sql_insert(connection, "myclappybot", "guild_id", [guild_id])
		}
		this.database.break();
    }

    delGuild()

    {

    }

    getGuild()

    {
        if (this.ready)

        {
            if (this.guild_id)

            {
                if (this.bot.guilds.cache.has(this.guild_id))

                {
                    return (this.bot.guilds.cache.get(this.guild_id))
                }
            }
        }

        return (false)
    }

	/**
	 * 
	 * @param {string} owner_id 
	 */
    async setOwner(owner_id)
	// TODO créer un nouveau système pour les 
	// bots basés sur la version opensource
    {
        this.owner_id = owner_id;
		await CONFIG_TABLE.set('owner', owner_id);
    }

    isPremium()
	// TODO créer un nouveau système pour les 
	// bots basés sur la version opensource
    {
        return (true);
    }

	/**
	 * 
	 * @param {string} module 
	 * @returns 
	 */
    async allow_modules(module)

    {
        if (await CONFIG_TABLE.has(`modules.${module}`))
            return (false);
        await CONFIG_TABLE.set(`modules.${module}`, true)
        //await this.reload_modules();
        return (true);
    }

	/**
	 * Active temporairement le module
	 * @param {string} module 
	 * @returns 
	 */
    async tmp_allow_modules(module)

    {
        if (await CONFIG_TABLE.has(`tmp_modules.${module}`))
            return (false);
        await CONFIG_TABLE.set(`tmp_modules.${module}`, true)
        await this.reload_modules();
        return (true);
    }

	/**
	 * 
	 * @param {string} module 
	 * @returns 
	 */
    async enable_modules(module)

    {
        if (!(await CONFIG_TABLE.has(`disabled_modules.${module}`)))
            return (false);
        await CONFIG_TABLE.delete(`disabled_modules.${module}`);
        await this.reload_modules();
        return (true);
    }

	/**
	 * 
	 * @param {string} module 
	 * @returns 
	 */
    async deny_modules(module)

    {
        if (!(await CONFIG_TABLE.has(`modules.${module}`)))
            return (false);
        await CONFIG_TABLE.delete(`modules.${module}`);
       	await this.reload_modules();
        return (true);
    }

	/**
	 * Désactive l'activation temporaire
	 * @param {string} module 
     * @param {boolean} reload
	 * @returns {Promise<boolean>}
	 */
    async tmp_deny_modules(module, reload = true)

    {
        if (!(await CONFIG_TABLE.has(`tmp_modules.${module}`)))
            return (false);
        await CONFIG_TABLE.delete(`tmp_modules.${module}`);
        if (reload)
            await this.reload_modules();
        return (true);
    }

	/**
	 * 
	 * @param {string} module 
	 * @returns 
	 */
    async disable_modules(module)

    {
        if (await CONFIG_TABLE.has(`disabled_modules.${module}`))
            return (false);
        await CONFIG_TABLE.set(`disabled_modules.${module}`, true);
        await this.reload_modules();
        return (true);
    }

    async reload_modules()

    {
        let modules = await CONFIG_TABLE.get(`modules`);
		let tmp_modules = await CONFIG_TABLE.get(`tmp_modules`);
        let disabled_modules = await CONFIG_TABLE.get(`disabled_modules`);

        if (!modules)
        {
            modules = {};
            CONFIG_TABLE.set(`modules`, {});
        }

		if (!tmp_modules)
        {
            tmp_modules = {};
            CONFIG_TABLE.set(`tmp_modules`, {});
        }

        if (!disabled_modules)
        {
            disabled_modules = {};
            CONFIG_TABLE.set(`disabled_modules`, {});
        }

        if (this.dolphin) modules["clapteam"] = true;
        this.modules = modules;
		this.tmp_modules = tmp_modules;
        this.disabled_modules = disabled_modules;
    }

	/**
	 * 
	 * @param {boolean} bots 
	 * @returns 
	 */
    async getMembers(bots= false)

    {
        let members = 0;

        if (this.ready)

        {
            if (this.guild_id)

            {
				const guild = this.bot.guilds.cache.get(this.guild_id);
                if (guild)

                {
                    guild.members.cache.forEach(
                        function(member)
                        {
                            if (!member.user.bot || bots) members++;
                        }
                    )
                }
            }
        }

        return (members);
    }

    ram_debug()

    {
        const ram_now = Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 10) / 10;
        let i = 0;
        let total = ram_now;

        this.swap['ram_log'].push(ram_now)

        while (this.swap['ram_log'][i])
        {
            total+= this.swap['ram_log'][i]
            i++;
        }

        const avarage = Math.round(total / i * 10) / 10;
        console.log(
            `---------------\n`+
            `   RAM USAGE\n`+
            `---------------\n`+
            `Now: ${ram_now}Mb\n`+
            `Avarage: ${avarage}Mb\n`+
            `---------------`
        )

        return (
            ` -------------------\n`+
            `   Actuel: ${ram_now}Mb\n`+
            `   Moyenne: ${avarage}Mb\n`+
            ` -------------------`
        );
    }

    async channel_send(channel_name, message)

    {
        const channels_data = await CHANNELS_TABLE.get(`channel`)

        if (channels_data[channel_name])

        {
            const guild = await clappybot.getGuild();
            if (guild && guild.channels.cache.has(channels_data[channel_name]))
            {
                guild.channels.cache.get(channels_data[channel_name]).send(message)
                return (true);
            }
        }
        return (false);
    }

    async last_version(data = "version")

    {
        const version_page = await fetch("https://clappycrew.com/clappybots/last_version");
        if (version_page)

        {
            const version_to_json = await version_page.json();
            if (version_to_json)

            {
                if (data == "all")
                    return (version_to_json);
                return (version_to_json[data])
            }
        }
        return (version);
    }

	async host()

	{
		let remaining_host = await get_host_remaining_days(process.env.SERVICE_ID);

		let outdated_host = await CONFIG_TABLE.get(`host.out`);
		if (outdated_host === undefined)
		{
			outdated_host = 0;
			await CONFIG_TABLE.set(`host.out`, 0);
		}

		if (outdated_host > 0 && remaining_host > 0)
			await CONFIG_TABLE.set(`host.out`, 0);

		return (
			{
				remaining:
					remaining_host,
				outdated:
					outdated_host
			}
		)
	}

	/**
	 * 
	 * @param {number} price 
	 */
	async add_sold(price)
	{
		let sold = await CONFIG_TABLE.get(`bot.coins`);
		if (!sold)
		{
			sold = 0;
			await CONFIG_TABLE.set(`bot.coins`, 0);
		}
		await CONFIG_TABLE.add(`bot.coins`, price);
		return (await this.get_sold())
	}

	/**
	 * 
	 * @param {number} price 
	 */
	async remove_sold(price)
	{
		return (await this.add_sold(-price));
	}

	async get_sold()
	{
		let sold = await CONFIG_TABLE.get(`bot.coins`);
		if (!sold)
		{
			sold = 0;
			await CONFIG_TABLE.set(`bot.coins`, 0);
		}
		return (sold);
	}
}

const clappybot = new ClappyBot();

function isPremium()

{
    return (clappybot.isPremium());
}

async function getMembers()

{
    return (clappybot.getMembers());
}

module.exports = { clappybot, isPremium, ConfigRoles, version, getAscii, getMembers }