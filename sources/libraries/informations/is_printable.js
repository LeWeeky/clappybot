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

const { Embed } = require("discord.js");

/**
 * Retourne TRUE si le message est envoyable sinon FALSE
 * @param {{content?: string, embeds?: Embed[]}} data
 * @returns {boolean}
 */
function is_printable_msg(data)
{
	if (!data)
		return (false);
	if (data.embeds)
	{
		let i = 0;

		while (data.embeds[i] && data.embeds[i].data)
		{
			if (
				data.embeds[i].data.description ||
				data.embeds[i].data.title ||
				(data.embeds[i].data.author && data.embeds[i].data.author.name) ||
				(data.embeds[i].footer && data.embeds[i].data.footer.text) ||
				data.embeds[i].data.image ||
				data.embeds[i].data.thumbnail
			)
			{
				if (!data.embeds[i + 1])
					return (true);
			}
			else
			{
				return (false);
			}
			i++;
		}
	}
	if (data.content && typeof(data.content) == "string")
		return (true);
	return (false);
}

module.exports = { is_printable_msg }