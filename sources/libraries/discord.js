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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////   DISCORDJS ~ IMPORTS    //////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const {
    ActivityType, ActionRowBuilder, ApplicationCommandType, ApplicationCommandOptionType,
    ButtonBuilder, ButtonStyle, ChannelType, Client, EmbedBuilder, GatewayIntentBits,
    StringSelectMenuBuilder, Partials, PermissionsBitField, InteractionType, SlashCommandBuilder, MessageType,
    SelectMenuInteraction, Message, AttachmentBuilder
} = require('discord.js');

const Permissions = PermissionsBitField.Flags;
const Intents = GatewayIntentBits;
const MessageSent = Message.prototype;
const SelectMenuBuilder = StringSelectMenuBuilder;

module.exports = {
    Client, Partials, Permissions, Intents,
    ActionRowBuilder, SelectMenuBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder,
    MessageType, ApplicationCommandType, ApplicationCommandOptionType, ChannelType, ActivityType, InteractionType,
    SelectMenuInteraction, MessageSent, AttachmentBuilder
}