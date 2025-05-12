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

const { sql_update } = require("../../../libraries/sql/update");
const { clappybot } = require("../../../main");

/**
 * @typedef { "name" | 
*   "description" |
*   "public" |
*   "ephemeral" |
*   "message" |
*   "embed_color" |
*   "embed_logo" |
*   "embed_banner" |
*   "embed_title" |
*   "embed_author" |
*   "embed_author_url" |
*   "embed_author_avatar" |
*   "embed_description" |
*   "embed_footer" |
*   "embed_footer_url" |
*   "embed_footer_logo"
* } command_values
*/


/**
 * 
 * @param {command_values} target 
 */
function get_table(target)
{
	if (target.startsWith("embed") || target == "message")
		return ("cmdcreator_commands_values");
	return ("cmdcreator_commands");
}

/**
 * 
 * @param {string} cmd_id 
 * @param { command_values } target 
 * @param {*} value 
 * @returns 
 */
async function update_command(cmd_id, target, value)
{
	const connection = clappybot.database.connect();

	if (!connection)
	{
		clappybot.database.break(true);
		return (false);
	}

	if (await sql_update(connection, get_table(target), `${target} = ?`, "ID = ?", [value, cmd_id]))
	{
		clappybot.database.break(true);
		return (false);
	}
	clappybot.database.break();
	return (true);
}

module.exports = {
	update_command
}