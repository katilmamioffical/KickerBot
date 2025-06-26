const { Client, Intents, Permissions } = require('discord.js-selfbot-v13');
const { token } = require('./config.json');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.DIRECT_MESSAGES
    ],
    partials: ['CHANNEL']
});

client.once('ready', () => {
    console.log(`${client.user.tag} olarak giriş yapıldı ve bot aktif!`);
    console.log('Tüm güvenlik kontrolleri devre dışı. Sadece DM komutları bekleniyor...');
});

client.on('messageCreate', async message => {
    if (message.guild) return;
    if (message.author.id === client.user.id) return;

    const args = message.content.trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === '!!kickle') {
        const sunucuID = args[0];
        if (!sunucuID || !/^\d{17,19}$/.test(sunucuID)) {
            return message.reply('Lütfen geçerli bir sunucu IDsi belirtin.\n**Kullanım:** `!!kickle <sunucuID>`');
        }

        try {
            const guild = await client.guilds.fetch(sunucuID).catch(() => null);
            if (!guild) {
                return message.reply('Bu IDye sahip bir sunucuda değilim veya böyle bir sunucu yok.');
            }

            const botMember = await guild.members.fetch(client.user.id);
            if (!botMember.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
                return message.reply(`**${guild.name}** adlı sunucuda "Üyeleri At" yetkim bulunmuyor. Lütfen yetkiyi verip tekrar deneyin.`);
            }

            await message.reply(`**GÜVENLİK KONTROLÜ DEVRE DIŞI!**\n**${guild.name}** adlı sunucudaki tüm atılabilir üyeleri uzaklaştırma işlemi başlatılıyor...`);

            const allMembers = await guild.members.fetch();
            let kickedCount = 0;
            let couldNotKickCount = 0;

            for (const member of allMembers.values()) {
                if (member.id === client.user.id || member.id === guild.ownerId) {
                    couldNotKickCount++;
                    continue;
                }

                if (member.kickable) {
                    await member.kick(`DM komutu ile istendi. (Güvenlik kontrolsüz)`).catch(() => couldNotKickCount++);
                    kickedCount++;
                } else {
                    couldNotKickCount++;
                }
            }

            await message.reply(`İşlem tamamlandı!\nSunucu: **${guild.name}**\nAtılan Üye Sayısı: **${kickedCount}**\nAtılamayan Üye Sayısı: **${couldNotKickCount}**`);

        } catch (error) {
            console.error('DM komutu işlenirken hata:', error);
            await message.reply('İşlem sırasında beklenmedik bir hata oluştu. Lütfen konsol loglarımı kontrol et.');
        }
    }
});

client.login(token);
