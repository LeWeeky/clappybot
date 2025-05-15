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

const { stat } = require("fs");

/**
 * 
 * @param {*} connection 
 * @param {string} name 
 * @param {string} content 
 * @param {string | null} more 
 * @returns 
 */
async function sqlite_create_table(connection, name, content, more = null)
{
    try {
		let statement;

		if (more)
			statement = connection.prepare(`CREATE TABLE IF NOT EXISTS ${name} (${content}) ${more}`);
        else
			statement = connection.prepare(`CREATE TABLE IF NOT EXISTS ${name} (${content})`);

		statement.run();
		if (process.env.DEBUG_INFO == "true")
			console.info('\x1b[32m%s\x1b[0m', `✅ Table ${name} crée`);
        return (null);
    }
    catch (error) {
		if (process.env.DEBUG_ERROR != "false")
        {
			console.error('\x1b[31m%s\x1b[0m', `❌ Erreur : Table ${name}`);
        	console.error(error);
		}
        return (error);
    }
}

module.exports = {
    sqlite_create_table
}