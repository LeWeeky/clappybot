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

const { colors } = require("./colors");
const { CONFIG_TABLE } = require("./data");
const { EmbedBuilder } = require("./discord");
const { clappybot } = require("../main");
const { send_to_support } = require("./messages/support");

async function init_version(guild)
{
    const update = await CONFIG_TABLE.get(`update`);

    if (!guild) return

    if (update != clappybot.version)
    {
		console.log("❤️ Nouvelle version installée", clappybot.version)

        await CONFIG_TABLE.set(`update`, clappybot.version);

		let embed = new EmbedBuilder()
        .setTitle("🎉 MISE À JOUR INSTALLÉE")
		.setFields(
            {
                name:
                    `🏆️ ClappyBot ${clappybot.version}`,
                value:
					"``` Accueillez les ClappyBots dans le monde fantastique de l'OpenSource ! ```"
            }
        )
        .setImage("https://clappycrew.com/src/clappybot-update.gif")
        .setColor(colors.none)

        send_to_support({embeds: [embed]});
    }
}

module.exports = { init_version }