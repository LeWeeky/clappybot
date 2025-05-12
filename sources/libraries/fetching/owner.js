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

const { api_call } = require("./call_api");

async function get_owner_id(service_id)
{
	const response = await api_call(`service/${service_id}/owner/`);

	if (!response || !response.ok)
		return (null);
	const json_data = await response.json();

	if (!json_data || !json_data.discord_id)
		return (null);

	return (json_data.discord_id);
}

module.exports = {
	get_owner_id
}