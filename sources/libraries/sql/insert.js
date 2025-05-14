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
 * @param {string} table 
 * @param {string | false} target 
 * @param {any[]} data 
 * @returns 
 */
async function sql_insert(connection, table, target, data)
{
    let targets = "?";

    for (let i = 1; i < data.length; i++)
    {
        targets = targets + ", ?";
    }

    try {
        if (target)
        {
            await connection.promise().execute(
                `INSERT INTO ${table} (${target}) VALUES (${targets})`, data
            );
        }
        else
        {
            await connection.promise().execute(
                `INSERT INTO ${table} VALUES (${targets})`, data
            );
        }
		if (process.env.DEBUG_INFO == "true")
        	console.info('\x1b[32m%s\x1b[0m', `✅ Table ${table} mise à jour (insert)`);
		return (null);
    }
    catch (error) {
		if (process.env.DEBUG_ERROR != "false")
		{
			console.error('\x1b[31m%s\x1b[0m', `❌ Erreur : mise à jour de la Table ${table} (insert)`);
       		console.error(error);
		}
        return (error);
    }
}

async function sql_last_insert_id(connection)
{
    try {
		const [row, field] = await connection.promise().execute(
			`SELECT LAST_INSERT_ID() as id`
		);
		if (process.env.DEBUG_INFO == "true")
        	console.info('\x1b[32m%s\x1b[0m', `✅ ID de la dernière insertion`);
		console.log(row)
		if (!row || row.length == 0)
			return (0);
		return (row[0].id)
    }
    catch (error) {
		if (process.env.DEBUG_ERROR != "false")
		{
			console.error('\x1b[31m%s\x1b[0m', `❌ Erreur : impossible de récupérer l'ID de la dernière insertion`);
       		console.error(error);
		}
        return (0);
    }
}

module.exports = {
    sql_insert, sql_last_insert_id
}