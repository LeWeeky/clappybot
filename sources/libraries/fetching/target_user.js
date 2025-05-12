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
 * @param {*} interaciton 
 * @param {string[]} args 
 * @param {"string" | "user"} type 
 * @returns 
 */
function get_target_user(interaciton, args, type = "string")
{
	if (interaciton.options)
	{
		if (type == "string")
			return (interaciton.options.getString("user"));
		return (interaciton.options.getUser("user"));
	}
	else
		return (args[0]);
}

module.exports = {
	get_target_user
}