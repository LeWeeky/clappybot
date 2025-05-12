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

const { char_is_number } = require("../informations/is_number");

function get_days(string_time, time_data)
{
	var	tmp = "";
	let i = 0;
	var	founded = false;

	while (string_time[i])
	{
		if (!char_is_number(string_time[i]))
		{
			if (string_time[i] == "d" || string_time[i] == "j")
			{
				founded = true;
				break ;
			}
			if (string_time[i] == "h" || string_time[i] == "m" || string_time[i] == "s")
				return (0);
			return (-1);
		}
		tmp = `${tmp}${string_time[i]}`;
		i++;
	}
	if (!founded)
		return (-1);
	if (tmp.length > 0)
		time_data.days = parseInt(tmp);
	return (i + 1)
}

function get_hours(string_time, time_data, start)
{
	var	tmp = "";
	let i = start;
	var	founded = false;

	if (!string_time[i] && start)
		return (start);
	while (string_time[i])
	{
		if (!char_is_number(string_time[i]))
		{
			if (string_time[i] == "h")
			{
				founded = true;
				break ;
			}
			if (string_time[i] == "m" || string_time[i] == "s")
				return (start);
			return (-1);
		}
		tmp = `${tmp}${string_time[i]}`;
		i++;
	}
	if (!founded)
		return (-1);
	time_data.hours = parseInt(tmp);
	return (i + 1)
}

function get_minutes(string_time, time_data, start)
{
	var	tmp = "";
	let i = start;
	var	founded = false;

	if (!string_time[i] && start)
		return (start);
	while (string_time[i])
	{
		if (!char_is_number(string_time[i]))
		{
			if (string_time[i] == "m")
			{
				founded = true;
				break ;
			}
			if (string_time[i] == "s")
				return (start);
			return (-1);
		}
		tmp = `${tmp}${string_time[i]}`;
		i++;
	}
	if (!founded)
		return (-1);
	time_data.minutes = parseInt(tmp);
	return (i + 1)
}

function get_seconds(string_time, time_data, start)
{
	var	tmp = "";
	let i = start;
	var	founded = false;

	if (!string_time[i] && start)
		return (start);
	while (string_time[i])
	{
		if (!char_is_number(string_time[i]))
		{
			if (string_time[i] == "s")
			{
				founded = true;
				break ;
			}
			return (-1);
		}
		tmp = `${tmp}${string_time[i]}`;
		i++;
	}
	if (!founded)
		return (-1);
	time_data.seconds = parseInt(tmp);
	return (i + 1)
}

/**
 * 
 * @param {string} string_time 
 * @returns 
 */
function string_time_to_time_data(string_time)
{
	string_time = string_time.toLocaleLowerCase();
	const time_data = {
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	}
	let start = 0;

	if (!string_time)
		return (undefined);
	start = get_days(string_time, time_data);
	if (start == -1)
		return (undefined);
	start = get_hours(string_time, time_data, start);
	if (start == -1)
		return (undefined);
	start = get_minutes(string_time, time_data, start);
	if (start == -1)
		return (undefined);
	start = get_seconds(string_time, time_data, start);
	if (start == -1)
		return (undefined);
	return (time_data);
}

/**
 * 
 * @param {string} string_time 
 * @returns 
 */
function time_to_ms(string_time)
{
	const	time_data = string_time_to_time_data(string_time);

	if (!time_data)
		return (0);
	return (
		Date.now() + ((86400 * time_data.days)
		+ (3600 * time_data.hours)
		+ (60 * time_data.minutes)
		+ (time_data.seconds)) * 1000);
}

module.exports = {
	string_time_to_time_data,
	time_to_ms
}