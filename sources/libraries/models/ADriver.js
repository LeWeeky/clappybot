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

class ADriver
{
	/**
	 * @type {Function}
	 */
	static _create = () => {}

	/**
	 * @type {number}
	 */
	_locks = 0;

	/**
	 * @type {any | null}
	 */
	_connection = null;

	/**
	 * @type {Object}
	 */
	parameters = {};

	/**
	 * 
	 * @param {Object} parameters 
	 */
	constructor(parameters)
	{
		this.parameters = parameters;
	}

	#throw(method)
	{
		throw new Error(`You must implement the '${method}' method in your subclass.`);
	}

	connect()
	{
		this._locks++;
		if (!this._connection)
			this._connection = this.constructor._create(this.parameters);
		return (this._connection);
	}

	break()
	{
		if (this._locks)
			this._locks--;
	}

	destroy()
	{
		this.#throw("destroy")
	}

	getAutoIncrementQuery()
	{
		this.#throw("getAutoIncrementQuery")
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
			case "size": // [ ! ] Not supported by PostgreSQL / SQLite
				type = "UNSIGNED INT"
				break;
			case "bigint": // [ ! ] Not supported by PostgreSQL / SQLite
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
	 * @returns 
	 */
	async request(request, data = null)
	{
		this.#throw("request")
	}

	/**
	 * 
	 * @param {string} table 
	 * @param {string} element 
	 * @param {string | null} more 
	 */
	async create(table, element, more = null)
	{
		this.#throw("create")
	}

	/**
	 * 
	 * @param {string} table 
	 * @param {string} element 
	 * @param {any[]} data 
	 * @param {boolean} get_last_id
	 * @returns {Promise<number>}
	 */
	async insert(table, element, data,  get_last_id = true)
	{
		this.#throw("insert")
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
		this.#throw("update")
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
		this.#throw("select")
	}

	/**
	 * 
	 * @param {string} table 
	 * @param {string} where 
	 * @param {any[] | null} data 
	 */
	async delete(table, where, data = null)
	{
		this.#throw("delete")
	}

	/**
	 * 
	 * @param {string} table 
	 * @param {string} where 
	 * @param {any[] | null} data 
	 * @returns {Promise<boolean>}
	 */
	async exists(table, where, data = null)
	{
		this.#throw("exists")
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
		this.#throw("count")
	}
}

module.exports = {
	ADriver
}