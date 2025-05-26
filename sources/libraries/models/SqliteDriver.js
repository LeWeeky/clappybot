/**
 * ClappyBot - A powerful framework for bot developers
 * Copyright (C) 2025 LeWeeky
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

const Database = require('better-sqlite3');
const { ADriver } = require('./ADriver');
const { sqlite_request } = require('../sql/sqlite/request');
const { sqlite_insert } = require('../sql/sqlite/insert');
const { sqlite_update } = require('../sql/sqlite/update');
const { sqlite_select } = require('../sql/sqlite/select');
const { sqlite_delete } = require('../sql/sqlite/delete');
const { sqlite_exists } = require('../sql/sqlite/exists');
const { sqlite_count } = require('../sql/sqlite/count');
const { sqlite_create_table } = require('../sql/sqlite/create');

class SqliteDriver extends ADriver
{
	/**
	 * @type {typeof Database}
	 */
	static _create = Database

	/**
	 * 
	 * @param {{path: string}} parameters 
	 */
	constructor(parameters)
	{
		super(parameters)
		this._connection = this.constructor._create(parameters.path);
	}

	connect()
	{
		return (this._connection);
	}

	break()
	{
	}

	destroy()
	{
		if (this._connection)
			this._connection.close();
	}

	getAutoIncrementQuery()
	{
		return ("id INTEGER PRIMARY KEY AUTOINCREMENT");
	}

	/**
	 * Replaces the "friendly type" with
	 * the type in the SQL server
	 * @param {string} field 
	 * @param {{}} fields
	 * @returns 
	 */
	static toQueryType(field, fields)
	{
		let type;

		switch (fields[field])
		{
			case "integer":
				type = "INT DEFAULT 0"
				break;
			case "size":
				type = "INTEGER"
				break;
			case "bigint":
				type = "BIGINT"
				break;
			case "datetime":
				type = "DATETIME DEFAULT CURRENT_TIMESTAMP"
				break;
			case "string":
				type = "VARCHAR(255)"
				break;
			case "text":
				type = "TEXT"
				break;
			case "boolean":
				type = "BOOLEAN"
				break;
			default:
				type = fields[field];
				break;
		}
		return (`${field} ${type}`)
	}

	/**
	 * 
	 * @param {string} request 
	 * @param {any[] | null} data 
	 */
	async request(request, data = null)
	{
		const row = await sqlite_request(this.connect(), request, data)
		this.break();
		return (row)
	}

	/**
	 * 
	 * @param {string} table 
	 * @param {string} element 
	 * @param {string | null} more 
	 */
	async create(table, element, more = null)
	{
		await sqlite_create_table(this.connect(), table, element, more);
		this.break();
	}

	/**
	 * 
	 * @param {string} table 
	 * @param {string} element 
	 * @param {any[]} data
	 * @param {boolean} get_last_id
	 * @returns {Promise<number>}
	 */
	async insert(table, element, data, get_last_id = true)
	{
		let last_id = 0;
		const connect = this.connect();
		last_id = await sqlite_insert(connect, table, element, data);
		this.break();
		return (last_id);
	}

	/**
	 * 
	 * @param {string} table 
	 * @param {string} element 
	 * @param {string} where 
	 * @param {any[] | null} data 
	 */
	async update(table, element, where, data = null)
	{
		await sqlite_update(this.connect(), table, element, where, data);
		this.break();
	}

	/**
	 * 
	 * @param {string} table 
	 * @param {string} element 
	 * @param {string | null} where 
	 * @param {any[] | null} data 
	 * @param {number} limit 
	 * @returns {Promise<any[]>}
	 */
	async select(table, element, where = null, data = null, limit = 0)
	{
		const row = await sqlite_select(this.connect(), table, element, where, data, limit);
		this.break();
		return (row);
	}

	/**
	 * 
	 * @param {string} table 
	 * @param {string} where 
	 * @param {any[] | null} data 
	 */
	async delete(table, where, data = null)
	{
		await sqlite_delete(this.connect(), table, where, data)
		this.break();
	}

	/**
	 * 
	 * @param {string} table 
	 * @param {string} where 
	 * @param {any[] | null} data 
	 */
	async exists(table, where, data = null)
	{
		return (await sqlite_exists(this.connect(), table, where, data));
	}

	/**
	 * 
	 * @param {string} table 
	 * @param {string | null} where 
	 * @param {any[] | null} data 
	 * @returns {Promise<number>}
	 */
	async count(table, where = null, data = null)
	{
		return (await sqlite_count(this.connect(), table, where, data));
	}
}

module.exports = {
	SqliteDriver
}