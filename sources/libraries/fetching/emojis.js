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

const { GuildEmoji } = require("discord.js");
const { clappybot } = require("../../main");

class Emoji

{
	/**
	 * 
	 * @param {{name: string, id?: string}} emote 
	 */
    constructor(emote = {name: "inconnu"})

    {

    }

	get_data()
	{
		if (this.id)
			return ({name: this.name, id: this.id});
		return ({name: this.name});
	}

	display()
	{
		if (this.name)
			return (this.name);
		return ("inconnu");
	}

	/**
	 * 
	 * @param {string} id 
	 * @returns {GuildEmoji | undefined | false}
	 */
    #fetch(id= String())

    {
		const emoji = clappybot.bot.emojis.cache.get(id);

        if (emoji)
        {
			this.id = emoji.id;
			if (emoji.animated)
				this.name = `<a:${emoji.name}:${emoji.id}>`;
			else
				this.name = `<:${emoji.name}:${emoji.id}>`;
			return (clappybot.bot.emojis.cache.get(id));
		}
        return (false);
    }

    #get_id(value= String())

    {
        let i = 0;
        let id = "";
        let removed = 0;

        while (value[i])

        {
            if (value[i] == ':')

            {
                removed++;
                i++;
            }

            if (removed == 2 && value[i] != '>')
                id = `${id}${value[i]}`;
            i++;
        }
        if (id.length == 0 || isNaN(parseInt(id)))
            return (false);
        return (id);
    }

	/**
	 * 
	 * @param {string} value 
	 * @returns {GuildEmoji | string | undefined | false}
	 */
    get(value)

    {
        if (value.match(/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g))
        {
			this.name = value;
			return (value);
		}

        if (!isNaN(parseInt(value)))
            return (this.#fetch(value));

        if (value.startsWith("<") && value.endsWith(">"))

        {
            const custom_id = this.#get_id(value);
            if (custom_id)
                return (this.#fetch(custom_id));
            return (false);
        }
    }
}

module.exports = { Emoji }