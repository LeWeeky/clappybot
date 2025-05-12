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

const { sql_select } = require("../../../libraries/sql/select");
const { clappybot } = require("../../../main");

async function get_command_bool(cmd_id, target)
{
	const connection = clappybot.database.connect()

	if (!connection)
	{
		clappybot.database.break(true)
		return (true);
	}
	const row = await sql_select(connection, "cmdcreator_commands", target, `ID = '${cmd_id}'`);
	clappybot.database.break();
	if (row && row[0])
		return (row[0][target][0] !== 0x00);
	return (false);
}

async function command_is_public(cmd_id)
{
	return (await get_command_bool(cmd_id, "public"));
}

async function command_is_ephemeral(cmd_id)
{
	return (await get_command_bool(cmd_id, "ephemeral"));
}

module.exports = {
	command_is_public,
	command_is_ephemeral
}