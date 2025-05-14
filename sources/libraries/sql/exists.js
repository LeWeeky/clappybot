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
 * @param {string} where 
 * @param {any[] | null} data 
 * @returns {Promise<boolean>}
 */
async function sql_exists(connection, table, where, data = null)
{
	console.log(where)
	try {
		let rows

		if (data)
		{
			const [res_rows, fields] = await connection
				.promise().execute(`SELECT EXISTS(SELECT 1 FROM ${table} WHERE ${where}) AS element_exists`,
				data
			);
			rows = res_rows;
		}
		else
		{
			const [res_rows, fields] = await connection
				.promise().query(`SELECT EXISTS(SELECT 1 FROM ${table} WHERE ${where}) AS element_exists`
			);
			rows = res_rows;
		}
		if (process.env.DEBUG_INFO == "true")
			console.info('\x1b[32m%s\x1b[0m', `✅ Véréfication de l'existance d'un élément dans ${table} réussi`);
		if (!rows)
			return (false);
		if (!rows[0])
			return (false);
		return (rows[0].element_exists);
	}
	catch (error) {
		if (process.env.DEBUG_ERROR != "false")
		{
			console.error('\x1b[31m%s\x1b[0m', `❌ Erreur : Véréfication de l'existance d'un élément dans ${table} ratée`);
			console.error(error);
		}
		return (false);
	}
}

module.exports = {
	sql_exists
}