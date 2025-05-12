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
async function sql_select(connection, table, target, where = null, data = null)
{
	try {
		let rows;

		if (where)
		{
			if (data)
			{
				const [rows_, fields] = await connection.promise()
				.execute(`SELECT ${target} FROM ${table} WHERE ${where}`, data);
				rows = rows_;
			}
			else
			{
				const [rows_, fields] = await connection.promise()
				.query(`SELECT ${target} FROM ${table} WHERE ${where}`);
				rows = rows_;
			}
		}
		else
		{
			if (data)
				{
					const [rows_, fields] = await connection.promise()
					.execute(`SELECT ${target} FROM ${table}`, data);
					rows = rows_;
				}
				else
				{
					const [rows_, fields] = await connection.promise()
					.query(`SELECT ${target} FROM ${table}`);
					rows = rows_;
				}
		}
		if (process.env.DEBUG_INFO == "true")
			console.info('\x1b[32m%s\x1b[0m', `✅ Récupérations de ${target} de la table ${table}`);
		return (rows);
	}
	catch (error) {
		if (process.env.DEBUG_ERROR == "true")
		{
			console.error('\x1b[31m%s\x1b[0m', `❌ Erreur : impossible de récupérer ${target} dans la table ${table}`);
			console.error(error);
		}
		return (false);
	}
}

module.exports = {
	sql_select
}