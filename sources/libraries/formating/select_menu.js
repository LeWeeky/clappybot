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
 * @param {any[]} options Options à transformer en format menu
 * @param {number} start 
 * @param {number} end 
 * @returns 
 */
function SelectMenuOptions(options, start = 0, end = 24)

{
    const select_options = []
    const len = options.length;

    if (start < 0)
        start = 0;

    if (start != 0 || end != 24)
        options = options.slice(start, end)

    if (start > 0) select_options.push({
        label: "⬅ Précédent",
        value: `previous-${start}`
    })

    let i = 0;
    while (options[i] && (i < 24 && start == 0) || (i < 23 && start != 0))

    {
        if (options[i]) select_options.push({
            label: options[i][0],
            value: options[i][1]
        })
        i++;
    }

    if (len > end)

    {
        select_options.push({
            label: "➡ Suivant",
            value: `next-${( start + 24 )}`
        })
    }

    return (select_options);
}

module.exports = { SelectMenuOptions }