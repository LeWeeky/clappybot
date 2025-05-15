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
 * @param {*} table 
 * @param {*} where 
 * @param {any[] | null} data 
 * @returns {Promise<number>}
 */
async function sqlite_count(connection, table, where = null, data = null)
{
	try {
		let row
		let statement
		
		if (!where)
		{
			statement = connection
				.prepare(`SELECT COUNT(*) AS occurrences FROM ${table}`
			);
		}
		else
		{
			statement = connection
				.prepare(`SELECT COUNT(*) AS occurrences FROM ${table} WHERE ${where}`
			);

		}
		if (data)
			row = statement.get(...data);
		else
			row = statement.get();
		if (process.env.DEBUG_INFO == "true")
			console.info('\x1b[32m%s\x1b[0m', `✅ Comptage dans ${table} réussi`);
		if (!row)
			return (-1);
		return (row.occurrences);
	}
	catch (error) {
		if (process.env.DEBUG_ERROR != "false")
		{
			console.error('\x1b[31m%s\x1b[0m', `❌ Erreur : Comptage raté dans ${table}`);
			console.error(error);
		}
		return (-1);
	}
}

module.exports = {
	sqlite_count
}