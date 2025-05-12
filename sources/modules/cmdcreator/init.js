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


const { sql_create_table } = require("../../libraries/sql/create");

async function init_module(connection)
{
	await sql_create_table(connection, "cmdcreator_commands", "ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, name VARCHAR(32), description VARCHAR(100), public BIT DEFAULT 0, ephemeral BIT DEFAULT 0");

	await sql_create_table(connection, 
		"cmdcreator_commands_values", 
		"ID INT UNSIGNED REFERENCES cmdcreator_commands(ID) ON DELETE CASCADE, message VARCHAR(4096), embed_color MEDIUMINT UNSIGNED DEFAULT 3092790, embed_logo TEXT, embed_banner TEXT, embed_title VARCHAR(256), embed_author VARCHAR(256), embed_author_url TEXT, embed_author_avatar VARCHAR(2048), embed_description VARCHAR(4096), embed_footer VARCHAR(2048), embed_footer_url TEXT, embed_footer_logo TEXT"
	);

	await sql_create_table(connection, "cmdcreator_alias", "ID INT UNSIGNED REFERENCES cmdcreator_commands(ID) ON DELETE CASCADE, name VARCHAR(32)");
}

module.exports = {
	init_module
}