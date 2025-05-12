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

const {
    Client, Partials, Intents,
} = require("../libraries/discord");

const { Options } = require("discord.js")

const client_intents = [
    Intents.Guilds, Intents.GuildMessages, Intents.GuildMessageReactions, Intents.DirectMessageReactions,
    Intents.MessageContent, Intents.DirectMessages, Intents.GuildPresences, Intents.GuildMembers, Intents.GuildBans,
    Intents.GuildVoiceStates, Intents.GuildInvites, Intents.GuildEmojisAndStickers
]

const client_partials = [
    Partials.Message, Partials.Reaction, Partials.Channel, Partials.User
]

class ClientUser

{
    constructor()

    {
        return (
			new Client( {
				partials: client_partials, 
				intents: client_intents,
				sweepers: {
					...Options.DefaultSweeperSettings,
					messages: {
						interval: 900,
						filter: () => message => message.createdTimestamp + 900 < Date.now()
					},
				},
				makeCache: Options.cacheWithLimits({
					...Options.DefaultMakeCacheSettings,
					ReactionManager: 0,
					MessageManager: 300,
					PresenceManager: 50,
				}),
			}
		));
    }
}

module.exports = { ClientUser }