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

const { sql_exists } = require("../../../libraries/sql/exists");
const { clappybot } = require("../../../main");

async function command_exists(cmd_name)
{
	const connection = clappybot.database.connect();

	if (!connection)
	{
		clappybot.database.break(true);
		console.log("Impossible de vérifier l'existance de la commande :", cmd_name)
		return (false);
	}
	const result = await sql_exists(connection, "cmdcreator_commands", "name = ?", [cmd_name]);

	clappybot.database.break();
	return (result);
}

module.exports = {
	command_exists
}