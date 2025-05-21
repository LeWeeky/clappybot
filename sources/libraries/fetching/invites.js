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

async function is_invite_from_this_guild(guild, invide_code)
{
    const invite_list = await guild.invites.fetch().catch(error => {
        console.error("unable to retrieve invitations")
		return (false);
    });
	if (!invite_list)
		return (false);
	invite_list.forEach(invite => {
        if (invide_code == invite.code)
			return (true);
    })
	return (false);
}

/**
 * 
 * @param {string} invite 
 */
function get_invite_code(invite)
{
	if (invite.endsWith("/"))
		invite = invite.substring(0, invite.length - 2);
	if (invite.endsWith("http:"))
		invite = invite.substring(7, invite.length - 8);
	if (invite.endsWith("https:"))
		invite = invite.substring(8, invite.length - 9);
	while (invite.startsWith(":"))
		invite = invite.substring(1);
	while (invite.startsWith("/"))
		invite = invite.substring(1);
	while (invite.endsWith("/"))
		invite = invite.substring(0, invite.length - 2);
	const args = invite.split("/");
	return (args[args.length - 1]);
}

/**
 * 
 * @param {*} guild serveur concerné
 * @returns liste des invitations
 */
async function get_invites(guild)

{
    const invites = {};
    const invite_list = await guild.invites.fetch().catch(error => {
        console.error("unable to retrieve invitations")
		return (false);
    });
	if (!invite_list)
		return (false);
	invite_list.forEach(invite => {
        invites[invite.code] = invite.uses;
    })

    return (invites);
}

/**
 * 
 * @param {*} guild serveur concerné
 * @returns liste des invitations
 */
async function get_invites_data(guild)
{
    const invites = {};
    const invite_list = await guild.invites.fetch().catch(error => {
        console.log("Impossoble de récupérer les invitations")
		return (false);
    });
	if (!invite_list)
		return (false);
	invite_list.forEach(invite => {
        invites[invite.code] = {
			uses: invite.uses,
			inviter_id: invite.inviterId
		}
    })

    return (invites);
}


module.exports = {
	is_invite_from_this_guild,
	get_invite_code,
	get_invites,
	get_invites_data
}