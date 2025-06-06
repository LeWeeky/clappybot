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

const { ADriver } = require("./ADriver");
const { toSingularize } = require("./pluralization/singularize");

class AModel {
	/**
	 * Defines the elements to which this model belongs. This will create
	 * new columns to link this model to its owners. 
	 *
	 * For example, if you make this model belong to the ‘authors’ model,
	 * an ‘author_id’ column will be created.
	 * @type {string[]}
	 */
	static belongs_to = [];
	/**
	 * @type {AModel[]}
	 */
	static has_one = [];
	/**
	 * @type {AModel[]}
	 */
	static has_many = [];
	/**
	 * @type {number}
	 * Unique id of element
	 */
	id = 0;
	/**
	 * @type {Object}
	 * List of columns
	 */
	static fields = {};
	/**
	 * @type {string | null}
	 * Name of the table inside database
	 */
	static table = null;
	/**
	 * @type {string | null}
	 * Name when it's single
	 */
	static single = null;
	
	/**
	 * @type {ADriver | null}
	 * Database driver to use
	 */
	static db = null;

	/**
	 * @type {{}}
	 * Save old values
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
	 * @param {ADriver} db
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
				if (this[field] !== null)
				{
					fields_to_insert.push(field)
					values.push(this[field])
				}
			});
			const placeholders = fields_to_insert.join(', ');
			this.id = await this.constructor.db.insert(this.constructor.table, placeholders, values);
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
			await this.constructor.db.update(
				this.constructor.table, placeholders, "id = ?", values
			);
		}
		for (let field in this.constructor.fields)
			this.#old_values[field] = this[field];
		return (true);
	}

	/**
	 * Recovers all the models it owns
	 */
	async fetchStuff()
	{
		if (this.id)
		{
			const target = {};
			target[`${this.constructor.single}_id`] = this.id;
			// TODO do it with a single request
			for (let i = 0; i < this.constructor.has_one.length; i++)
			{
				this[this.constructor.has_one[i].single]
				= await this.constructor.has_one[i].firstBy(target);
			}
			for (let i = 0; i < this.constructor.has_many.length; i++)
			{
				this[this.constructor.has_many[i].table]
				= await this.constructor.has_many[i].findBy(target);
			}
		}
	}

	/**
	 * Delete current instance from database
	 */
	async delete()
	{
		if (!this.constructor.db)
		{
			console.error("db is not set for:", this.constructor.table);
			return (false);
		}
		if (this.id)
		{
			await this.constructor.db.delete(
				 this.constructor.table, "id = ?", [this.id]
			)
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

		await this.db.delete(
			this.table, placeholders, values,
		);
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
		if (!this.table)
		{
			console.error("table name is not set for:", this);
			return (false);
		}
		this.single = toSingularize(this.table)
		for (let i = 0; i < this.belongs_to.length; i++)
		{
			const id = `${toSingularize(this.belongs_to[i])}_id`;
			this.fields[id] = "integer"
		}
		let query = `${this.db.getAutoIncrementQuery()},\n`
		let count = 0;
		for (let field in this.fields)
		{
			if (count != 0)
				query = query+", \n";
			query = query + "  " + this.toQueryType(field);
			count++;
		}
		await this.db.create(
			this.table, query
		);
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

		const row = await this.db.select(
			this.table, "*"
		);
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
	 * @returns {Promise<new() this[] | never[]>}
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
		const row = await this.db.select(
			this.table, "*", placeholders, values, limit
		);
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
	 * @returns {Promise<this | null>}
	 */
	static async firstBy(fields)
	{
		const result = await this.findBy(fields, 1);

		if (result.length == 0)
			return (null);
		return (result[0])
	}

	/**
	 * Returns first element that corresponding
	 * to the requested fields as new instance
	 * or create a new one if not found
	 * @param {{}} fields
	 * @returns {Promise<this>}
	 */
	static async firstByOrCreate(fields)
	{
		const user = await this.firstBy(fields);

		if (user)
			return (user);
		return (await this.create(fields));
	}

	/**
	 * Returns first element as new instance
	 * @returns {Promise<AModel | null>}
	 */
	static async first()
	{
		if (!this.db)
		{
			console.error("db is not set for:", this.table);
			return (null);
		}
		const row = await this.db.select(
			this.table, "*", null, null, 1
		);

		if (row.length == 0)
			return (null);
		return (new this(row[0]))
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