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

async function get_commands()
{
	const connection = clappybot.database.connect();

	if (!connection)
	{
		clappybot.database.break(true);
		return (false);
	}
	const rows = await mysql_select(connection, "cmdcreator_commands", "name, description, public, ephemeral", false);
	if (!rows)
	{
		clappybot.database.break(true);
		return (false);
	}
	clappybot.database.break();
	return (rows);
}

module.exports = {
	get_commands
}