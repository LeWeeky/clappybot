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
 * @param {string} request 
 * @param {any[] | null | false} data 
 * @returns 
 */
async function sql_request(connection, request, data = null)
{
	try {
		let rows;

		if (data)
		{
			const [rows_, fields] = await connection.promise()
			.execute(request, data);
			rows = rows_;
		}
		else
		{
			const [rows_, fields] = await connection.promise()
			.query(request);
			rows = rows_;
		}

		if (process.env.DEBUG_INFO == "true")
			console.info('\x1b[32m%s\x1b[0m', `✅ Exécution terminée : ${request}`);
		return (rows);
	}
	catch (error) {
		if (process.env.DEBUG_ERROR != "false")
		{
			console.error('\x1b[31m%s\x1b[0m', `❌ Erreur d'exécution : ${request}`);
			console.error(error);
		}
		return (false);
	}
}

module.exports = {
	sql_request
}