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

const { clappybot } = require("../../main")

class User

{
	/**
	 * @type {import("discord.js").User}
	 */
	instance
	/**
	 * @type {string | undefined}
	 */
	name;
	/**
	 * @type {string | undefined}
	 */
	username;
	/**
	 * @type {string | undefined}
	 */
	tag;
	/**
	 * @type {string | undefined}
	 */
	id;
	/**
	 * @type {string | function | undefined}
	 */
	avatarURL;
	/**
	 * @type {number | undefined}
	 */
	avatarSize;
    /**
     * 
     * @param {{
     * username?: string, avatarURL?: string, tag?: string, id?: string, avatarSize?: number, displayAvatarURL?: Function}} user 
     */
    constructor(user = {avatarSize: 512})
    {
        this.name =  user.username;
        this.username =  user.username;
        this.tag = user.tag;
        this.id = user.id;
        this.avatarSize = user.avatarSize;

        this.bot = clappybot.bot;

        if (user.avatarURL && typeof user.avatarURL == "string")
			this.avatarURL = user.avatarURL;
        else if (typeof user.displayAvatarURL == "function")
			this.avatarURL = user.displayAvatarURL({dynamic: true, size: this.avatarSize});
    }

    #set(user)
    {
		this.instance = user;
        this.avatarURL = user.displayAvatarURL({dynamic: true, size: 512})
		this.name =  user.username;
        this.username =  user.username;
        this.tag = user.tag;
        this.id = user.id;
        this.avatarSize = user.avatarSize;

		return ({
            id : user.id,
            name : user.username,
            username: user.username,
            tag : user.tag,
            exists: true,
			instance: this.instance
        });
    }

    async #fetch(id)
    {
        const user = await this.bot.users.fetch(id)
        .catch(err => {
            console.error(err)
            return (null)
        })

        if (user)
            return (this.#set(user));
        return (null);
    }

	/**
	 * 
	 * @param {string} id 
	 * @param {*} mentions 
	 * @param {number} target 
	 * @returns 
	 */
    async get(id, mentions = null, target = 0)
    {
        if (mentions && mentions.size > target)
        {
            let mentionsList = []
            mentions.map((user, id) => {
                mentionsList.push([user, id])
            })

            const user = mentionsList[target][0]

            if (user)
                return (this.#set(user));
        }

		if (!id)
			return (null);
		if (typeof id == 'number')
			id = String(id);
        let len = id.length;
        if (id.startsWith("<@") && id.endsWith(">"))
        {
            id = id.slice(2, (id.length - 1));
            len = id.length
        }

        if (!isNaN(id))
        {
            if (len >= 16 && len <= 20)
            {
                if (this.bot.users.cache.has(id))
                    return (this.#set(this.bot.users.cache.get(id)));
                else
                    return (await this.#fetch(id));
            }
        }
        return (null);
    }

	getData(not_null = false)
	{
		if (!this.username && not_null)
		{
			const user = {username: "DeletedUser", id: "0", tag: "DeletedUser#0000", avatarURL: "https://tenor.com/view/discord-loading-gif-26060546"}
			this.name =  user.username;
			this.username =  user.username;
			this.tag = user.tag;
			this.id = user.id;
			this.avatarSize = user.avatarSize;

			this.bot = clappybot.bot;

			if (user.avatarURL && typeof user.avatarURL == "string")
				this.avatarURL = user.avatarURL;
			else if (typeof user.displayAvatarURL == "function")
				this.avatarURL = user.displayAvatarURL({dynamic: true, size: this.avatarSize});
		}
		return ({
            id : this.id,
            name : this.username,
            username: this.username,
            tag : this.tag,
            exists: true,
			instance: this.instance
        });
	}
}

module.exports = { User }