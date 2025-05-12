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

function char_is_alpha(char)
{
    return ((char >= 'A' && char <= 'Z') ||
        (char >= 'a' && char <= 'z'));
}

function str_is_alpha(string)
{
	let i = 0;

	if (!string)
		return (false);
	while (i < string.length)
	{
		if (!char_is_alpha(string[i]))
			return (false);
		i++;
	}
	return (true);
}

module.exports = {
	char_is_alpha, str_is_alpha
}


