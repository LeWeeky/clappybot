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
 * @param {*} connection 
 * @param {string} table 
 * @param {string} target 
 * @param {string | null | false} where 
 * @param {any[] | null | false} data 
 * @returns 
 */
async function sqlite_select(connection, table, target, where = null, data = null, limit = 0)
{
	try {
		let rows;
		let statement;
		let limit_query = '';

		if (limit > 0)
			limit_query = `LIMIT ${limit}`

		if (where)
			statement = connection.prepare(`SELECT ${target} FROM ${table} WHERE ${where} ${limit_query}`);
		else
			statement = connection.prepare((`SELECT ${target} FROM ${table}`));
		if (data)
			rows = statement.all(...data);
		else
			rows = statement.all();
		if (process.env.DEBUG_INFO == "true")
			console.info('\x1b[32m%s\x1b[0m', `✅ Récupérations de ${target} de la table ${table}`);
		return (rows);
	}
	catch (error) {
		if (process.env.DEBUG_ERROR != "false")
		{
			console.error('\x1b[31m%s\x1b[0m', `❌ Erreur : impossible de récupérer ${target} dans la table ${table}`);
			console.error(error);
		}
		return (false);
	}
}

module.exports = {
	sqlite_select
}