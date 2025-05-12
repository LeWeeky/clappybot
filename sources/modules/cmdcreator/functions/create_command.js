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

const { colors } = require("../../../libraries/colors");
const { sql_insert } = require("../../../libraries/sql/insert");
const { clappybot } = require("../../../main");
const { get_command_id } = require("./get_command");

async function create_command(cmd_name)
{
	const connection = clappybot.database.connect();

	if (!connection)
	{
		clappybot.database.break(true);
		return (false);
	}
	if (await sql_insert(connection, "cmdcreator_commands", "name", [cmd_name]))
	{
		clappybot.database.break(true);
		return (false);
	}
	const cmd_id = await get_command_id(cmd_name)
	if (!cmd_id)
	{
		clappybot.database.break(true);
		return (false);
	}
	if (await sql_insert(connection, "cmdcreator_commands_values", "ID, embed_color", [cmd_id, colors.none]))
	{
		clappybot.database.break(true);
		return (false);
	}
	clappybot.database.break();
	return (true);
}

module.exports = {
	create_command
}