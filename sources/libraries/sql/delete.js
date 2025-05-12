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
 * @returns 
 */
async function sql_delete(connection, table, where, data = null)
{
    try {
		if (data)
			await connection.promise().execute(`DELETE FROM ${table} WHERE ${where}`, data);
		else
        	await connection.promise().query(`DELETE FROM ${table} WHERE ${where}`);
		if (process.env.DEBUG_INFO == "true")
	    	console.info('\x1b[32m%s\x1b[0m', `✅ Element supprimé dans la table : ${table}`);
        return (null);
    }
    catch (error) {
		if (process.env.DEBUG_ERROR == "true")
		{
			console.error('\x1b[31m%s\x1b[0m', `❌ Erreur : Impossible de supprimer l'élement souhaité dans la table ${table}`);
        	console.error(error);
		}
        return (error);
    }
}

module.exports = {
    sql_delete
}