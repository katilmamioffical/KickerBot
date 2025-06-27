# 🔨 Discord Selfbot - !!kickle Command

This project is an example of a **Discord.js v13 selfbot** developed strictly for **educational and testing purposes**. The command allows the user to mass kick all *kickable* members from a specified server via DM.

> ⚠️ **WARNING:** This project violates Discord’s [Terms of Service](https://discord.com/terms) and [Community Guidelines](https://discord.com/guidelines). It should only be used for **personal learning and testing** purposes. Using it with real accounts or without permission may result in **account termination**.

---

## 🚀 Features

- 🔁 `!!kickle <serverID>` command via DM to kick members from a server  
- 🛡 Server owner and selfbot user are not affected  
- 🧠 Developer-friendly and well-commented codebase  
- 🔌 Easy configuration via `config.json`  
- 💬 All actions are reported back to the user via DM  

---

## 💻 Installation

### Requirements

- [Node.js](https://nodejs.org/) (v16 or higher recommended)  
- A Discord account (use your own account for selfbot testing)

---

### 🪟 Setup (Windows)

1. Download and install [Node.js](https://nodejs.org/en/download)  
2. Open `config.js` and enter your account token, preferred prefix, and language.  
3. Run `setup.bat` to install the dependencies.  
4. Once setup is complete, run `start.bat` to start the bot.

---

### 🐧 Setup (Linux / macOS)

1. Install Node.js (v16 or higher). You can use [nvm](https://github.com/nvm-sh/nvm) or your system package manager:
   ```bash
   sudo apt install nodejs npm   # Debian/Ubuntu
   brew install node             # macOS with Homebrew

2. Open `config.js` and enter your account token, prefix, and language.
3. Make the scripts executable and run:

   ```bash
   chmod +x setup.sh start.sh
   ./setup.sh
   ./start.sh
   ```

---

### 📱 Setup (Termux - Android)

1. Update packages and install Node.js:

   ```bash
   pkg update && pkg upgrade
   pkg install nodejs git nano -y
   git clone https://github.com/katilmamioffical/KickerBot
   cd KickerBot
   nano config.js #enter your account token, prefix, and language.
   chmod +x setup.sh start.sh
   ./setup.sh
   ./start.sh
   ```
