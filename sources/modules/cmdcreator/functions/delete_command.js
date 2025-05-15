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

const { mysql_delete } = require("../../../libraries/sql/mysql/delete");
const { clappybot } = require("../../../main");

async function delete_command(cmd_id)
{
	const connection = clappybot.database.connect();

	if (!connection)
	{
		clappybot.database.break(true);
		return (false);
	}
	if (await mysql_delete(connection, "cmdcreator_commands", "ID = ?", [cmd_id]))
	{
		clappybot.database.break(true);
		return (false);
	}
	clappybot.database.break();
	return (true);
}

module.exports = {
	delete_command
}