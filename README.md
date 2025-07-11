# ClappyBot - A powerful framework for bot developers
https://clappycrew.com/clappybots

## 👀 Overview

[Discord.js](https://github.com/discordjs/discord.js) makes it possible to develop incredible bots. However, as we add new functionalities, our code tends to become more and more “unnecessarily” loaded or disorganized.

ClappyBot offers a solution to this problem by providing a system that will manage the various elements of the discord API for you, while importing all your functionality in the form of “modules”.

A module is a grouping of commands and other interactions of the same theme. For example, we could group the commands “/ban”, “/kick”, etc. under a single module called “moderation”.

This framework will therefore enable you to create numerous modules quickly and easily, without worrying about importing them or other issues such as database linking, so that you can concentrate solely on adding functionality and not on the surrounding system.

## 🚀 Quick Start

Let's create your first bot! The first step is creating your project and go inside.

```
npm create clappybot
```
```
cd <Name of you project>
```
```
npm install
```

*⚠️ If you forgot or gave wrong information during the environment configuration
please refer to this page: [📝 Environment configuration](https://docs.clappycrew.com/clappybot/environment)*

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

Now your bot should be online, congratulations 🎉 ! For the time being, you'll need to define a "main guild", which you can do using `/setguild` command, supplied with the module settings. Once this is done, you can set up a channel for announcements (updates, changes) with this command `/setsupport`.

## 💥 Troubleshooting

The documentation is available here: https://docs.clappycrew.com/category/clappybot

If you have any problems or questions, don't hesitate to ask for help on the discord: https://discord.gg/UvQfUbk

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