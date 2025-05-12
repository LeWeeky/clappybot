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
 * @param {{
 * name: string,
 * id: string | null
 * animated: boolean | null | number
 * }} emoji  
 * @returns {Promise<number>}
 */
async function add_emoji_to_cache(connection, emoji)
{
    try {
		if (emoji.animated)
			emoji.animated = 1;
		else
			emoji.animated = 0;
        // Insérer l'emoji dans la table emoji_cache
        const [rows] = await connection.promise().query(
            'INSERT INTO emojis_cache (name, id, animated) VALUES (?, ?, ?)',
            [emoji.name, emoji.id, emoji.animated]
        );

        // Récupérer le cache_id de l'emoji inséré
        return (rows.insertId);
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'emoji dans le cache :", error);
        return error;
    }
}

module.exports = {
	add_emoji_to_cache
}