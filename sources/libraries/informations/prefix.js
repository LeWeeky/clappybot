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

const { CONFIG_TABLE } = require("../../libraries/data");

class PrefixClass

{
    async get()

    {
        if (!(await CONFIG_TABLE.has(`bot.prefix`))) await CONFIG_TABLE.set(`bot.prefix`, "+")

		const prefix = await CONFIG_TABLE.get(`bot.prefix`);
        return (prefix);
    }

    async has(content)

    {
        if (content.startsWith(await this.get())) return (true);
        return (false);
    }
}

const Prefix = new PrefixClass()

module.exports = { Prefix }