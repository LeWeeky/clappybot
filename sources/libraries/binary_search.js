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
 * 
 * @param {[[any, any]]} plist 
 * @param {string | number} content 
 * @returns {false | [any, any]}
 */
function binarySearch(plist, content)

{
    let len = plist.length
    let first = 0
    let last = len-1
    let tries = 0
    let found = false

    while (first <= last && !found && tries<len)
    {
        tries++
        let midIndex = Math.floor(( first+last )/2)
        let Mid = plist[midIndex]

        if (Mid[0] == content) 
        {
            found = true
            return Mid
        }
        if (Mid > content) 
        {
            last=midIndex-1
        }
		else if (Mid < content)
		{
            first=midIndex+1
        }
    }

    return (found);
}

module.exports = { binarySearch }