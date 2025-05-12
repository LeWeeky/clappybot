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

const { isSpace } = require("../fetching/is_space");

function split(string = "")

{
    const args = []
    const len = string.length;
    let word = "";
    let i = 0;

    while (i < len && isSpace(string[i])) i++;
    while (i < len)

    {
        if (isSpace(string[i]))

        {
            args.push(word);
            word = "";
            while (i < len && isSpace(string[i])) i++;
        }

        else

        if (i+1 == len)

        {
            args.push(`${word}${string[i]}`);
            break;
        }
            else
        {
            word = `${word}${string[i]}`;
            i++;
        }
    }

    return (args);
}

module.exports = { split }