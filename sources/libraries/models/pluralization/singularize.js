const { fetchException } = require("./fetchException");

/**
 * Singularize a plural model name
 * (include basic English rules and few exceptions)
 * @param {string} name 
 * @returns {string}
 */
function toSingularize(name)
{
	const execption = fetchException(name, "singular")

	if (execption)
		return (execption);
    if (name.endsWith('ies'))
        return (name.slice(0, -3) + 'y'); // "Categories" -> "Category"
    if (name.endsWith('es'))
		{
        const base = name.slice(0, -2);
        if (/(s|x|z|ch|sh)$/.test(base))
            return (base); // "Boxes" -> "Box"
    }
    if (name.endsWith('s'))
        return (name.slice(0, -1)); // "Users" -> "User"
    return (name); // fallback: no change
}

module.exports = {
	toSingularize
}