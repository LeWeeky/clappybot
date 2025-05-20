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

You need to create your own `.env` in the `data` folder, to do this, you can use one of these template files : `data/template.sqlite.env`, `data/template.mysql.env` according to the type of database you want (sqlite for local, mysql for remote).

`SERVICE_ID` is a custom unique identifier for your bot (useful if you want to manage a large number of bots using containers).

`DB_DRIVER` can be set to `mysql` (for remote db) or `sqlite` (for local db) IP or domain of your database

`DB_HOST` (only if `DB_DRIVER=mysql`) IP or domain of your database

`DB_USER` (only if `DB_DRIVER=mysql`) user for your database

`DB_PASSWORD` (only if `DB_DRIVER=mysql`) is the password of user in your database

`DB_PATH` (only if `DB_DRIVER=sqlite`) the path to your local database for example : `DB_PATH=data/main.sqlite`

`TOKEN` is the token of your [discord application](https://discord.com/developers/applications) (bot)

`API_URI` is an optional parameter if you wish to communicate with your api for certain reasons

`AUTHOR` your name or nickname or discord username

`AUTHOR_ID` id of your discord account

`AUTHOR_URL` your website, guild, youtube channel or other

`COMPANY` the name of your team of developers or project

`COMPANY_LOGO` a cute emoji for your team or project

`COMPANY_URL` team's website, guild, youtube channel or other

`MAIN_COMMAND` the main command of your bot for example : `MAIN_COMMAND=help`

Set your parameters and save them in the `data/.env` file.

Now we need a first module for the settigns, don't worry we can clone this one : 
```
git clone https://github.com/LeWeeky/settings-module-for-clappybot.git sources/modules/mybotsettings
```

This is an option, but you'll probably want to create your own module to add your functionalities. That's why there's a module template that will be a great help in developing your bot (don't forget to read the [README.md](https://github.com/LeWeeky/Module-template-for-clappybot)):
```
git clone https://github.com/LeWeeky/Module-template-for-clappybot.git sources/modules/template
```

Before the first run, make sure all intents are enabled in your [discord application](https://discord.com/developers/applications). Then you can check for updates and install dependencies by running this command :
```
npm run update
```

Once done, you can start as follows:

for 🐧 **Linux** and 🍎 **MacOS** users
```
npm run dev
```

for 🪟 **Windows** users
```
node index.js
```

If you are a 🪟 **Windows** user it is recommended that you define the debug logs you want in your `.env` file like this:
```
DEBUG_INFO=true
DEBUG_TRACE=true
DEBUG_ERROR=true
DEBUG_WARING=true
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