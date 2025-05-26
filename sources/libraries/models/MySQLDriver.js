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

const mysql = require('mysql2');
const { ADriver } = require('./ADriver');
const { mysql_request } = require('../sql/mysql/request');
const { mysql_create_table } = require('../sql/mysql/create');
const { mysql_insert, mysql_last_insert_id } = require('../sql/mysql/insert');
const { mysql_update } = require('../sql/mysql/update');
const { mysql_select } = require('../sql/mysql/select');
const { mysql_delete } = require('../sql/mysql/delete');
const { mysql_exists } = require('../sql/mysql/exists');
const { mysql_count } = require('../sql/mysql/count');

class MySQLDriver extends ADriver
{
	/**
	 * @type {typeof mysql.createConnection}
	 */
	static _create = mysql.createConnection

	/**
	 * 
	 * @param {{
	 * 	host: string
	 * 	user: string,
	 *	password: string,
	 *	database: string,
	 *	supportBigNumbers?: boolean,
	 *	bigNumberStrings?: boolean
	 * }} parameters 
	 */
	constructor(parameters)
	{
		super(parameters)
	}

	break()
	{
		super.break();
		if (!this._locks && this._connection)
		{
			setTimeout(() => {
				if (!this._locks && this._connection)
				{
					this._connection.end()
					this._connection = null;
				}
			}, 1000);
		}
	}

	destroy()
	{
		if (this._connection)
			this._connection.end();
	}

	/**
	 * Returns query for auto increment
	 * premary key 
	 * @returns {string}
	 */
	getAutoIncrementQuery()
	{
		return ("id INT AUTO_INCREMENT PRIMARY KEY");
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
				type = "UNSIGNED INT"
				break;
			case "bigint":
				type = "UNSIGNED BIGINT"
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
		const row = await mysql_request(this.connect(), request, data)
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
		await mysql_create_table(this.connect(), table, element, more);
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
		await mysql_insert(connect, table, element, data);
		if (get_last_id)
			last_id = await mysql_last_insert_id(connect);
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
		await mysql_update(this.connect(), table, element, where, data);
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
		const row = await mysql_select(this.connect(), table, element, where, data, limit);
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
		await mysql_delete(this.connect(), table, where, data)
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
		const result = await mysql_exists(this.connect(), table, where, data);
		this.break();
		return (result);
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
		const result = await mysql_count(this.connect(), table, where, data);
		this.break();
		return (result);
	}
}

module.exports = {
	MySQLDriver
}