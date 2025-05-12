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

const { clappybot } = require("../../main");
const { isRent } = require("./is_rent");

/**
 * 
 * @param {string} module module clappybot
 * @returns {boolean} true si le module est possédé, sinon false
 */
function isAllow(module)
{
	// TODO créer un nouveau système pour les 
	// bots basés sur la version opensource
	return (module != "youtube")

    if (clappybot.modules["clapteam"] || clappybot.modules[module] || module == "broadcast"
		|| clappybot.tmp_modules["clapteam"] || clappybot.tmp_modules[module] || isRent(module))
		return (true);
    return (false);
}

module.exports = {
	isAllow
}