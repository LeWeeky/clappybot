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

const { mysql_select } = require("../sql/select");
const { clappybot } = require("../../main");

async function get_next_id(target)
{
	try {
		const connection = clappybot.database.connect();
		const rows = await mysql_select(connection, "next_ids", "next_id", "module = ?", [target]);

		if (rows[0])
		{
			await connection.promise().execute(
				'UPDATE next_ids SET next_id = ? WHERE module = ?',
				[rows[0].next_id + 1, target]
			);
	
			clappybot.database.break();

			return (rows[0].next_id);
		}
		await connection.promise().execute(
			'INSERT INTO next_ids VALUES (?, ?)',
			[target, 2]
		);
		clappybot.database.break();
		return (1);
	} catch (error) {
		clappybot.database.break();
		console.error('Erreur lors de la récupération du next_id de  '+target+' :', error.message);
		return error;
	}
}

module.exports = {
	get_next_id
}