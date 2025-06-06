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
const { ROLES_TABLE, CHANNELS_TABLE, CONFIG_TABLE } = require("./libraries/data");
const { readdirSync } = require('fs');
const dotenv = require("dotenv");
const { exit } = require('process');
const { get_owner_id } = require('./libraries/fetching/owner');
const { get_host_remaining_days } = require('./libraries/fetching/host');
const { version } = require("../package.json");
const { DataBaseWrapper } = require('./libraries/models/DataBaseWrapper');
const { MySQLDriver } = require('./libraries/models/MySQLDriver');
const { SqliteDriver } = require('./libraries/models/SqliteDriver');
const { ADriver } = require('./libraries/models/ADriver');
const { AModel } = require('./libraries/models/AModel');

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

function showMissingParameters()
{
	/**
	 * 
	 * @param {string} parameter 
	 */
	function warn(parameter)
	{
		console.warn(`${parameter} is missing`)
	}

	if (!process.env.DB_HOST)
		warn("DB_HOST");
	if (!process.env.DB_USER)
		warn("DB_HOST");
	if (!process.env.DB_PASSWORD)
		warn("DB_HOST");
	if (!process.env.DB_NAME)
		warn("DB_HOST");
}

class Config extends AModel
{
	static table = 'configs';
	static fields = {
		guild_id: 'string',
		prefix: 'string',
		activity: 'integer',
		status: 'string',
		twitch: 'string',
		created_at: 'datetime'
	};
}

class ClappyBot
{
	/**
	 * @type {Config}
	 */
	config;
	/**
	 * @type {string | null}
	 */
	guild_id;

	/**
	 * @type {string | null}
	 */
	owner_id;

	/**
	 * This class is deprecated and will be
	 * removed in few updates
	 * @type {ADriver}
	 */
	database;

	/**
	 * Envelops several databases, for example if you want
	 * a faster local database for small items and a larger
	 * remote one linked to your panel
	 * @type {DataBaseWrapper}
	 */
	databases;

    constructor ()

    {
		dotenv.config({path: "./data/.env", override: true});
        this.bot = new Client({intents: 3276799});
		this.databases = new DataBaseWrapper();
        this.guild_id = null;
        this.owner_id = null;
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
			console.log("🔥 Nouveau ClappyBot !", clappybot.version);
			await CONFIG_TABLE.set(`update`, clappybot.version);
		}
		switch (process.env.DB_DRIVER)
		{
			case "mysql":
				if (process.env.DB_HOST && process.env.DB_USER
					&& process.env.DB_PASSWORD && process.env.DB_NAME)
				{
					this.databases.add(
						new MySQLDriver({
							host: process.env.DB_HOST,
							user: process.env.DB_USER,
							password: process.env.DB_PASSWORD,
							database: process.env.DB_NAME,
							supportBigNumbers: true,
							bigNumberStrings: true
						}),
						"main"
					);
				}
				else
				{
					this.critical("some database parameters are missing");
					showMissingParameters();
					process.exit(78);
				}	
				break;

			case "sqlite":
				if (process.env.DB_PATH)
				{
					this.databases.add(
						new SqliteDriver({
							path: process.env.DB_PATH,
						}),
						"main"
					);
				}
				else
				{
					this.critical("You have to set DB_PATH when DB_DRIVER=sqlite");
					process.exit(78);
				}
				break;

			default:
				if (process.env.DB_DRIVER)
					this.critical(`${process.env.DB_DRIVER} is not a valid driver for the database!`);
				else
					this.critical("DB_DRIVER not set!");
				process.exit(78);
		}
		this.databases.add(
			new SqliteDriver({
				path: "data/cache.db",
			}),
			"cache"
		);
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

		const main_db = clappybot.databases.select("main");

		if (main_db)
		{
			this.database = main_db;
			Config.use(this.database);
			await Config.init();

			this.config = await Config.first() ?? await Config.create({
					prefix: "+",
					activity: 1,
					twitch: "leweeky"
				});
		
			globalThis.guild_id = this.guild_id = this.config.guild_id;
			this.prefix = this.config.prefix ?? '+';
		}
       	this.owner_id = await get_owner_id(process.env.SERVICE_ID);

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
    async setPrefix(prefix)
    {
        this.prefix = this.config.prefix = prefix;
		await this.config.save();
    }

	/**
	 * 
	 * @param {string} guild_id 
	 */
    async setGuild(guild_id)
    {
		globalThis.guild_id = this.config.guild_id = this.guild_id = guild_id;
		await this.config.save();
    }

	getGuild()
    {
        if (this.ready)
        {
            if (this.guild_id)
            {
                if (this.bot.guilds.cache.has(this.guild_id))
                    return (this.bot.guilds.cache.get(this.guild_id))
            }
        }
        return (null)
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