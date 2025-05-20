const { fetchException } = require("./fetchException");

/**
 *  Pluralize a singular model name
 * (include basic English rules and few exceptions)
 * @param {string} name 
 * @returns {string}
 */
function toPluralize(name)
{
	const execption = fetchException(name, "plural")

	if (execption)
		return (execption);
	if (name.endsWith('y') && !/[aeiou]y$/i.test(name))
        return name.slice(0, -1) + 'ies'; // "Category" -> "Categories"
    if (name.endsWith('s') || name.endsWith('x') || name.endsWith('z')
		|| name.endsWith('ch') || name.endsWith('sh'))
	{
        return (name + 'es'); // "Box" -> "Boxes"
    }
    return (name + 's');
}

module.exports = {
	toPluralize
}