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

const { AFunctionality, AFunctionalities } = require("./abstracts/functionality");

const config = {
	"title": "task",
	"descriptior": undefined,
	"direct_names": [
		"tasks", "daily",
		"weekly", "monthly"],
	"shared_folder": false,
	"extension": "tasks.js",
	"folder": "tasks",
	"addons": "tasks"
}

class Tasks extends AFunctionalities
{
	/** Liste de commandes
	 *  @type {Task[]}
	 */
	list;

	constructor()
	{
		super(Task, config)
	}


	/**
	 * Supprime toutes les commandes
	 */
	destroy()
	{
		for (let i = 0; i < this._list.length; i++)
			this._list[i].stop();
		super.destroy();
	}

	async load()
	{
		await super.load()

		for (let i = 0; i < this._list.length; i++)
			this._list[i].start();
	}

	async reload()
	{
		this.destroy();
		await this.load();
	}

	/**
	 * 
	 * @param {*} handler commande à ajouter
	 * @param {string} file_path
	 */
	add(handler, file_path)
	{
		if (!handler.start)
		{
			console.warn(file_path, "method start is missing")
			return 
		}
		if (!handler.stop)
		{
			console.warn(file_path, "method stop is missing")
			return 
		}
		this._list.push(new Task(handler, file_path))
	}
}

class Task extends AFunctionality
{
	/**
	 * @type {Function}
	 */
	start;

	/**
	 * @type {Function}
	 */
	stop;

	/**
	 * 
	 * @param {{start: Function, stop: Function}} task
	 * @param {string} file_path
	 */
   constructor(task, file_path)
   {
		super(file_path)
	  	this.start = task.start;
	  	this.stop = task.stop;
   }
}

module.exports = { Task, Tasks }