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

/**
 * @param {string} color 
 * @returns {boolean}
 */
function isHexColor(color)
{
	const regex = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
	return (regex.test(color));
}

/**
 * @param {number} color int color
 * @returns {string} #HEXCODE
 */
function toHexColor(color)

{
    return (`#${color.toString(16)}`);
}

/**
 * @param {string} color #HEXCODE
 * @returns {number} int color
 */
function toIntColor(color)

{
	if (color.startsWith("#"))
		color = color.substring(1)
    return (parseInt(color, 16));
}

const colors = {
    none: 3092790,
    white: 16777215,
    blue: 676480,
    light_blue: 12513018,
    light_red: 15981017,
    mauve: 10578664,
    yellow: 16773120,
    black: 0,
    red: 16719952,
    green: 514972,
    purple: 11353056,
	pink: 16756412,
    lilac: 13874661,
	orange: 16750134
}

module.exports = { colors, isHexColor, toHexColor, toIntColor} 