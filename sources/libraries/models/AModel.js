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

const { sql_insert, sql_last_insert_id } = require("../sql/insert");
const { sql_update } = require("../sql/update");
const { DataBaseLinker } = require("../data");
const { sql_create_table } = require("../sql/create");
const { sql_select } = require("../sql/select");
const { sql_delete } = require("../sql/delete");

class AModel {
	/**
	 * @type {number}
	 */
	id = 0;
	/**
	 * @type {Object}
	 */
	static fields = {};
	/**
	 * @type {string | null}
	 */
	static table = null;
	
	/**
	 * @type {DataBaseLinker | null}
	 */
	static db = null;

	/**
	 * @type {{}}
	 */
	#old_values = {};

	/**
	 * Create new instance of this model
	 * but without saving it in the database
	 * 
	 * You can save it using the save method
	 * @param {*} data
	*/
	constructor(data = {})
	{
		if (data.id)
			this.id = data.id
		for (let field in this.constructor.fields)
			this.#old_values[field] = this[field] = data[field] ?? null;
	}

	/**
	 * Defines database to be used
	 * @param {DataBaseLinker} db
	 */
	static use(db)
	{
		this.db = db;
	}

	/**
	 * Save current instance in database
	 * @returns 
	 */
	async save()
	{
		if (!this.constructor.db)
		{
			console.error("db is not set for:", this.constructor.table);
			return (false);
		}
		if (this.id == 0)
		{
			const fields = Object.keys(this.constructor.fields);
			const fields_to_insert = [];
			const values = [];
			fields.forEach(field => {
				if (this[field])
				{
					fields_to_insert.push(field)
					values.push(this[field])
				}
			});
			const placeholders = fields_to_insert.join(', ');

			const connection = this.constructor.db.connect();
			await sql_insert(connection,
				this.constructor.table, placeholders, values
			);
			this.id = await sql_last_insert_id(connection);
			this.constructor.db.break();
		}
		else
		{
			const fields = Object.keys(this.constructor.fields);
				
			const fields_to_update = fields.filter((field) => {
				if (this[field] != this.#old_values[field])
					return (field)
			})

			if (fields_to_update.length == 0)
				return (false);
			const values = fields_to_update.map(field => this[field]);
			let placeholders = null;

			fields_to_update.forEach(field => {
				if (!placeholders)
					placeholders = `${field} = ?`;
				else
					placeholders = ` ${placeholders}, ${field} = ?`;
			})

			values.push(this.id)
			await sql_update(this.constructor.db.connect(),
				this.constructor.table, placeholders, "id = ?", values
			);
		}
		this.constructor.db.break();
		for (let field in this.constructor.fields)
			this.#old_values[field] = this[field];
		return (true);
	}

	async delete()
	{
		if (!this.constructor.db)
		{
			console.error("db is not set for:", this.constructor.table);
			return (false);
		}
		if (this.id)
		{
			await sql_delete(this.constructor.db.connect(),
				 this.constructor.table, "id = ?", [this.id]
			)
			this.constructor.db.break();
		}
		return (true);
	}

	/**
	 * Deletes all elements that corresponding
	 * to the requested fields
	 * @param {{}} fields
	 */
	static async deleteBy(fields)
	{
		if (!this.db)
		{
			console.error("db is not set for:", this.table);
			return (false);
		}
		let placeholders = null;
		const values = [];
		for (let field in fields)
		{
			if (!this.fields[field] && field != 'id')
			{
				console.warn(`Field '${field}' doesn't exist in the '${this.table}' table`)
				continue;
			}
			if (!placeholders)
				placeholders = `${field} = ?`;
			else
				placeholders = ` ${placeholders} AND ${field} = ?`;
			values.push(fields[field])
		}

		await sql_delete(this.db.connect(),
			this.table, placeholders, values,
		);
		this.db.break();
		return (true);
	}

	/**
	 * Create new instance of this model
	 * and save it in the database
	 * @param {{}} data 
	 * @returns {Promise<AModel>}
	 */
	static async create(data = {})
	{
		const model = new this(data);
		await model.save();
		return (model)
	}

	/**
	 * Replaces the "friendly type" with
	 * the type in the SQL server
	 * @param {string} field 
	 * @returns 
	 */
	static toQueryType(field)
	{
		let type;

		switch (this.fields[field])
		{
			case "integer":
				type = "INT"
				break;
			case "size": // [ ! ] Not supported by PostgreSQL / SQLite
				type = "UNSIGNED INT"
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
			default:
				type = this.fields[field];
				break;
		}
		return (`${field} ${type}`)
	}

	/**
	 * Initialise the model's table,
	 * you should
	*/
	static async init()
	{
		if (!this.db)
		{
			console.error("db is not set for:", this.constructor.table);
			return (false);
		}
		let query = `id INT AUTO_INCREMENT PRIMARY KEY,\n`
		let count = 0;
		for (let field in this.fields)
		{
			if (count != 0)
				query = query+", \n";
			query = query + "  " + this.toQueryType(field);
			count++;
		}
		// query = query + "\n)";
		await sql_create_table(this.db.connect(),
			this.table, query
		);
		this.db.break()
		return (true);
	}

	/**
	 * Returns all elements of this table
	 * as new instances
	 */
	static async all()
	{
		if (!this.db)
		{
			console.error("db is not set for:", this.table);
			return ([]);
		}

		const row = await sql_select(this.db.connect(),
			this.table, "*"
		);
		this.db.break();
		if (row.length == 0)
			return ([]);
		const models = [];
		for (let i = 0; i < row.length; i++)
			models.push(new this(row[i]))
		return (models);
	}

	/**
	 * Returns all elements that corresponding
	 * to the requested fields as new instances
	 * @param {{}} fields
	 * @param {number} limit
	 */
	static async findBy(fields, limit = 0)
	{
		if (!this.db)
		{
			console.error("db is not set for:", this.table);
			return ([]);
		}
		let placeholders = null;
		const values = [];
		for (let field in fields)
		{
			if (!this.fields[field] && field != 'id')
			{
				console.warn(`Field '${field}' doesn't exist in the '${this.table}' table`)
				continue;
			}
			if (!placeholders)
				placeholders = `${field} = ?`;
			else
				placeholders = ` ${placeholders} AND ${field} = ?`;
			values.push(fields[field])
		}

		const row = await sql_select(this.db.connect(),
			this.table, "*", placeholders, values, limit
		);
		this.db.break();
		if (row.length == 0)
			return ([]);
		const models = [];
		for (let i = 0; i < row.length; i++)
			models.push(new this(row[i]))
		return (models);
	}

	/**
	 * Returns first element that corresponding
	 * to the requested fields as new instance
	 * @param {{}} fields
	 * @returns {Promise<AModel | null>}
	 */
	static async firstBy(fields)
	{
		const result = await this.findBy(fields, 1);

		if (result.length == 0)
			return (null);
		return (result[0])
	}

	/**
	 * Returns the model fields and values
	 * as an object
	 * @returns 
	 */
	toObject()
	{
		const obj = {id: this.id};
		for (const field in AModel.fields)
		{
			obj[field] = this[field];
		}
		return (obj);
	}
}

module.exports = {
	AModel
}