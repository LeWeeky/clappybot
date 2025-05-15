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

const { mysql_select } = require("../../../libraries/sql/mysql/select");
const { clappybot } = require("../../../main");

async function get_command_id(name)
{
	const connection = clappybot.database.connect();

	if (!connection)
		return (-1);
	
	const row = await mysql_select(connection, "cmdcreator_commands", "ID", `name = '${name}'`);
	clappybot.database.break();

	if (!row)
	{
		clappybot.database.break(true);
		return (-1);
	}

	if (row.length == 0)
		return (0);
	return (row[0].ID);
}

async function get_command_values(id)
{
	const connection = clappybot.database.connect();

	if (!connection)
		return (null);

	const row = await mysql_select(connection, "cmdcreator_commands_values", "*", `ID = '${id}'`);
	clappybot.database.break();

	if (!row)
	{
		clappybot.database.break(true);
		return (null);
	}

	if (row.length == 0)
		return (null);
	return (row[0]);
}

module.exports = {
	get_command_id,
	get_command_values
}