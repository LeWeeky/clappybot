const exceptions = require('./exceptions.json');

/**
 * 
 * @param {string} target 
 * @param {"plural" | "singular"} type 
 * @returns {string | null}
 */
function fetchException(target, type)
{
	let target_index = 0;
	let reply_index = 1;
	if (type == 'singular')
	{
		target_index = 1;
		reply_index = 0;
	}

	for (let i = 0; i < exceptions.length; i++)
	{
		if (exceptions[i][target_index] == target)
			return (exceptions[i][reply_index])
	}
	return (null);
}

module.exports = {
	fetchException
}