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

class DataBaseWrapper
{
	/**
	 * @type {{}}
	 */
	#databases = {};

	constructor()
	{

	}

	/**
	 * @param {ADriver} driver
	 * @param {string} name
	 */
	add(driver, name)
	{
		this.#databases[name] = driver;
	}

	/**
	 * @param {string} driver_name
	 */
	remove(driver_name)
	{
		if (!this.#databases[driver_name])
			return (false);
		this.#databases[driver_name].destroy();
		delete this.#databases[driver_name];
		return (true);
	}

	/**
	 * @param {string} driver_name
	 * @returns {ADriver | null}
	 */
	select(driver_name)
	{
		if (this.#databases[driver_name])
			return (this.#databases[driver_name]);
		return (null);
	}

	closeAll()
	{
		const databases = Object.entries(this.#databases);

		databases.forEach(([name, driver]) => {
			console.log(name, driver)
			driver.destroy();
		})
	}
}

module.exports = {
	DataBaseWrapper
}