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

async function get_host_expiration(service_id)
{
	const response = await api_call(`service/${service_id}/host`);

	if (!response)
		return (null);
	const json_data = await response.json();

	if (!json_data || !json_data.expiration_date)
		return (null);

	return (new Date(json_data.expiration_date));
}

async function get_host_remaining_days(service_id)
{
	const expiration_date = await get_host_expiration(service_id);
	if (!expiration_date)
		return (0);

	const current_date = new Date();
	return (Math.ceil((
		expiration_date.getTime() - current_date.getTime())
		/ (1000 * 60 * 60 * 24))
	);
}

module.exports = {
	get_host_expiration, get_host_remaining_days
}