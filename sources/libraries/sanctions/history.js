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

const { MEMBERS_TABLE } = require("../data");

class History

{
    constructor (user)

    {
        this.user = user;
    }

    async get()

    {
        let history = []

        if (await MEMBERS_TABLE.has(`membres.${this.user.id}.history`))

        {
            for (let  [n, sanction] of Object.entries(await MEMBERS_TABLE.get(`membres.${this.user.id}.history`)))

            {
                history.push(sanction)
            }
        }

        return (history);
    }

    async add(sanction, reason, author)

    {
        let len = 0
        if (await MEMBERS_TABLE.has(`membres.${this.user.id}.history`)) len = await MEMBERS_TABLE.has(`membres.${this.user.id}.history`).length

        let date = new Date;
        let day = String(date.getDate());
        let month = String(date.getMonth()+1);
        const year = date.getFullYear();

        if (day.length == 1) day = "0"+day;
        if (month.length == 1) month = "0"+month;

        const result = {
            sanction: sanction,
            author: author.username,
            reason: reason,
            date: `${day}/${month}/${year}`
        }

        await MEMBERS_TABLE.push(`membres.${this.user.id}.history`, result);
        return (result);
    }

}

module.exports = { History }