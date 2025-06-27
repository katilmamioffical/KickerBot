const { Client, Intents, Permissions } = require('discord.js-selfbot-v13');
const { token, prefix, language } = require('./config.json');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.DIRECT_MESSAGES
    ],
    partials: ['CHANNEL']
});

// Dil paketleri
const messages = {
    en: {
        ready: "Logged in as",
        waiting: "Waiting for DM commands only...",
        invalidID: "Please provide a valid server ID.\n**Usage:** `!!kickle <serverID>`",
        notInGuild: "Either I am not in a server with this ID or the server does not exist.",
        noPermission: (name) => `I don't have the \"Kick Members\" permission in **${name}**. Please grant the permission and try again.`,
        starting: (name) => `Starting to kick all kickable members in **${name}**...`,
        done: (name, kicked, failed) => `Process completed!\nServer: **${name}**\nKicked: **${kicked}**\nFailed to Kick: **${failed}**`,
        error: "An unexpected error occurred. Please check the console for details."
    },
    tr: {
        ready: "Giriş yapıldı:",
        waiting: "Sadece DM komutları bekleniyor...",
        invalidID: "Lütfen geçerli bir sunucu IDsi belirtin.\n**Kullanım:** `!!kickle <sunucuID>`",
        notInGuild: "Bu ID'ye sahip bir sunucuda değilim veya böyle bir sunucu yok.",
        noPermission: (name) => `**${name}** adlı sunucuda \"Üyeleri At\" yetkim bulunmuyor. Lütfen yetkiyi verip tekrar deneyin.`,
        starting: (name) => `**${name}** adlı sunucudaki tüm atılabilir üyeler atılıyor...`,
        done: (name, kicked, failed) => `İşlem tamamlandı!\nSunucu: **${name}**\nAtılan Üye: **${kicked}**\nAtılamayan: **${failed}**`,
        error: "İşlem sırasında beklenmedik bir hata oluştu. Konsolu kontrol edin."
    }
};

const msg = messages[language] || messages.en;

client.once('ready', () => {
    console.log(`${msg.ready} ${client.user.tag}`);
    console.log(msg.waiting);
});

client.on('messageCreate', async message => {
    if (message.guild) return;
    if (message.author.id === client.user.id) return;

    const args = message.content.trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === `${prefix}kickle`) {
        const serverID = args[0];
        if (!serverID || !/^\d{17,19}$/.test(serverID)) {
            return message.reply(msg.invalidID);
        }

        try {
            const guild = await client.guilds.fetch(serverID).catch(() => null);
            if (!guild) {
                return message.reply(msg.notInGuild);
            }

            const botMember = await guild.members.fetch(client.user.id);
            if (!botMember.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
                return message.reply(msg.noPermission(guild.name));
            }

            await message.reply(msg.starting(guild.name));

            const allMembers = await guild.members.fetch();
            let kickedCount = 0;
            let failedCount = 0;

            for (const member of allMembers.values()) {
                if (member.id === client.user.id || member.id === guild.ownerId) {
                    failedCount++;
                    continue;
                }

                if (member.kickable) {
                    await member.kick(`Requested via DM command`).catch(() => failedCount++);
                    kickedCount++;
                } else {
                    failedCount++;
                }
            }

            await message.reply(msg.done(guild.name, kickedCount, failedCount));

        } catch (error) {
            console.error('Error during command execution:', error);
            await message.reply(msg.error);
        }
    }
});

client.login(token);
