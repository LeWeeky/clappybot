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

function ms_to_date(ms)

{
    let seconds = 0
    let minutes = 0
    let hours = 0
    let days = 0

    if (ms > 999)

    {
        seconds = Math.round(ms/1000);
    }

    else

    {
        return ("0s");
    }

    while (seconds > 59)

    {
        minutes++;
        seconds -= 60;
    }

    while (minutes > 59)

    {
        hours++;
        minutes -= 60;
    }

    while (hours > 23)

    {
        days++;
        hours -= 24;
    }

    let date_str = String();

    if (seconds  > 0)

    {
        let seconds_str = String(seconds);
        if (seconds < 10)
            seconds_str =  "0"+String(seconds);

        date_str = seconds_str+"s";
    }

    if ((hours > 0 && seconds > 0) || minutes > 0)

    {
        let minutes_str = String(minutes);

        if (minutes_str.length == 1)
            minutes_str = "0"+minutes_str;

        date_str = `${minutes_str}m ${date_str}`;
    }

    if (hours > 0)

    {
        let hours_str = String(hours)
        date_str = `${hours_str}h ${date_str}`;
    }

    if (days > 0)

    {
        let days_str = String(days)
        date_str = `${days_str}j ${date_str}`;
    }

    return (date_str.trim());
}

function timeFormat(ms)

{
    let seconds
    let minutes = 0
    let hours = 0

    ms = 1920000 - ms
    if (ms > 1000) {
        seconds = parseInt(ms/1000)
    }

    while (seconds > 59) {
        minutes++
        seconds = seconds - 60
    }

    while (minutes > 59) {
        hours++
        minutes = minutes - 60
    }

    let date_str = ""
    let seconds_str = ""

    if (seconds  > 0)

    {
        seconds_str = String(seconds)
        if (seconds_str.length == 1) {
            seconds_str = "0"+seconds_str
        }

        date_str = seconds_str
    }

    if (hours > 0 || minutes > 0) {
        let minutes_str = String(minutes)
        if (minutes_str.length == 1) {
            minutes_str = "0"+minutes_str
        }

        date_str = minutes_str+":"+date_str
    }

    if (hours > 0)

    {
        let hours_str = String(hours)
        date_str = hours_str+date_str
    }

    if (date_str.length > 2) {
        date_str = "` "+date_str+" ` min"
    } else {
        date_str = "` "+date_str+" ` sec"
    }

    return (date_str);
}

module.exports = { timeFormat, ms_to_date }