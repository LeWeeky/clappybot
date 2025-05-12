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

const { CHANNELS_TABLE } = require("../../libraries/data");

class Channels
{
    constructor(guild = false)

    {
        this.guild = guild;
    }

    get(id, mentions, target = 0)

    {
        if (mentions && mentions.size > target)

        {
            let mentionsList = []
            mentions.map((channel, id) => {
                mentionsList.push([channel, id])
            })

            const channel = mentionsList[target][0]

            if (channel)

            {
                return (channel);
            }
        }

        const len = id.length;
        if (id.startsWith("<#") && id.endsWith(">"))

        {
            if (len == 22)
            {
                id = id.slice(3,21);
            }
            else if (len == 23)
            {
                id = id.slice(3,22);
            }
        }

        if (!isNaN(id))
        {
            if (len == 17 || len == 18 || len == 19)
            {
                if (this.guild.channels.cache.has(id))
                {
                    return (this.guild.channels.cache.get(id));
                }
            }
        }
        return (false);
    }

    /**
     * 
     * @param {false | any} type 
     * @returns 
     */
    getList(type = false)
    {
        const channels = [];

        if (this.guild) this.guild.channels.cache
        .forEach(
            function (channel, id)
            {
                if (!type || (channel.type == type)) channels.push([String(channel.name), id])
            }
        )
        return (channels);
    }
}

async function send_to_sanction(guild, message_data = {})
{
    const channel_id = await CHANNELS_TABLE.get("channel.warns");
    if (channel_id)
    {
        if (guild.channels.cache.has(channel_id))
        {
            guild.channels.cache.get(channel_id).send(message_data);
        } 
    }
}

module.exports = { Channels, send_to_sanction }