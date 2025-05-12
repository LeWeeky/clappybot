# ClappyBot - A powerful framework for bot developers
https://clappycrew.com/clappybots

## 👀 Overview

[Discord.js](https://github.com/discordjs/discord.js) makes it possible to develop incredible bots. However, as we add new functionalities, our code tends to become more and more “unnecessarily” loaded or disorganized.

ClappyBot offers a solution to this problem by providing a system that will manage the various elements of the discord API for you, while importing all your functionality in the form of “modules”.

A module is a grouping of commands and other interactions of the same theme. For example, we could group the commands “/ban”, “/kick”, etc. under a single module called “moderation”.

This framework will therefore enable you to create numerous modules quickly and easily, without worrying about importing them or other issues such as database linking, so that you can concentrate solely on adding functionality and not on the surrounding system.

## 🚀 Quick Start

Let's create your first bot! The first step is cloning this repository and go inside.

```
git clone https://github.com/LeWeeky/clappybot.git
```
```
cd clappybot
```

You need to create your own `.env`, to do this, you can use this file  `data/template.env`.

```
SERVICE_ID=azerty
PASSWORD=YOUR_DB_PASSWORD
TOKEN=YOUR_DISCORD_APP_TOKEN
API_URI=YOUR_API_URI
AUTHOR=LeWeeky
AUTHOR_ID=449712261871829002
AUTHOR_URL=https://fr.tipeee.com/leweeky
COMPANY=ClappyCrew
COMPANY_LOGO=🐏
COMPANY_URL=https://clappycrew.com
MAIN_COMMAND=help
DB_HOST=YOUR_DB_IP_OR_DOMAIN
```

`SERVICE_ID` is a custom unique identifier for your bot (useful if you want to manage a large number of bots using containers) and can be the name of your database user.

`PASSWORD` is the password of your user in your database system

`TOKEN` is the token of your [discord application](https://discord.com/developers/applications) (bot)

`API_URI` is an optional parameter if you wish to communicate with your api for certain reasons

`AUTHOR` your name or nickname

`AUTHOR_ID` id of your discord account

`AUTHOR_URL` your website, guild, youtube channel or other

`COMPANY` the name of your team of developers

`COMPANY_LOGO` a cute emoji for your team

`COMPANY_URL` team's website, guild, youtube channel or other

`MAIN_COMMAND` the main command of your bot for example : "/help"

`DB_HOST` IP or domain of your database

Set your parameters and save them in the `data/.env` file.

Now we need a template for our first module, don't worry we can clone this one : 

```
git https://github.com/LeWeeky/Module-template-for-clappybot.git sources/modules/template
```

Before the first run, make sure all intents are enabled in your [discord application](https://discord.com/developers/applications). Then you can start your bot by running this command :
```
npm run dev
```

Now your bot should be online, congratulations 🎉 ! For the time being, you'll need to define a "main guild", which you can do using `/setguild` command, supplied with the module template. Once this is done, you can set up a channel for announcements (updates, changes) with this command `/setsupport`.

## 💥 Troubleshooting

I'm sorry, the documentation is being processed and has not yet been published ... so if you have any problems or questions, don't hesitate to ask for help on the discord!

https://discord.gg/UvQfUbk

## 📦 Modules

feel free to create your own modules, a complete documentation on the steps to follow will be published soon, in the meantime you can simply leaf through the template content.

## 📜 Licence

Copyright (C) 2019-2025 LeWeeky

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.