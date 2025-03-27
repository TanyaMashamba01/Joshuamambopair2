const PastebinAPI = require('pastebin-js');
const pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL');
const { makeid } = require('./id');
const express = require('express');
const fs = require('fs');
const pino = require('pino');
const {
    default: Josh_King,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
} = require('maher-zubair-baileys');

const router = express.Router();

const audioUrls = [
    "https://files.catbox.moe/vkhvuv.mp4",
    "https://files.catbox.moe/vpnqp7.mp3",

// Helper function to remove files
function removeFile(filePath) {
    if (!fs.existsSync(filePath)) return false;
    fs.rmSync(filePath, { recursive: true, force: true });
}

// Route handler
router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;

    async function MIDKINGX_MD_PAIR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
        try {
            const Pair_Code_By_Josh_King = Josh_King({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'fatal' }).child({ level: 'fatal' })),
                },
                printQRInTerminal: false,
                logger: pino({ level: 'fatal' }).child({ level: 'fatal' }),
                browser: ['Chrome (Linux)', '', '']
            });

            if (!Pair_Code_By_Josh_King.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const code = await Pair_Code_By_Brasho_Kish.requestPairingCode(num);

                if (!res.headersSent) {
                    await res.send({ code });
                }
            }

            Pair_Code_By_Josh_King.ev.on('creds.update', saveCreds);
            Pair_Code_By_Josh_King.ev.on('connection.update', async (s) => {
                const { connection, lastDisconnect } = s;
                if (connection === 'open') {
                    await delay(5000);
                    const data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                    await delay(800);
                    const b64data = Buffer.from(data).toString('base64');
                    const session = await Pair_Code_By_Josh_King.sendMessage(Pair_Code_By_Josh_King.user.id, { text: '' + b64data });

                    // Send random audio after session
                    const randomAudioUrl = audioUrls[Math.floor(Math.random() * audioUrls.length)];
                    await Pair_Code_By_Josh_King.sendMessage(Pair_Code_By_Josh_King.user.id, {
                        audio: { url: randomAudioUrl },
                        mimetype: 'audio/mpeg',
                        ptt: true,
                        waveform: [100, 0, 100, 0, 100, 0, 100], // Optional waveform pattern
                        fileName: 'shizo',
                        contextInfo: {
                            mentionedJid: [Pair_Code_By_Josh_King.user.id], // Mention the sender in the audio message
                            externalAdReply: {
                                title: 'Thanks for choosing 🅙🅞🅢🅗🅤🅐🅜🅑🅞 🅜🅓 𝑺𝒖𝒑𝒑𝒐𝒓𝒕 happy deployment 💜',
                                body: 'Regards 𝓙𝓸𝓼𝓱𝓾𝓪𝓶𝓪𝓶𝓫𝓸',
                                thumbnailUrl: 'https://i.postimg.cc/nrBmSprW/Thu-13-03-2025-21-53-54.png',
                                sourceUrl: 'https://whatsapp.com/channel/0029VaraMtfFcowAKRdDdp1T',
                                mediaType: 1,
                                renderLargerThumbnail: true,
                            },
                        },
                    }, { quoted: session });

                    await delay(100);
                    await Pair_Code_By_Brasho_Kish.ws.close();
                    removeFile('./temp/' + id);
                } else if (connection === 'close' && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode !== 401) {
                    await delay(10000);
                    MIDKINGX_MD_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log('service restarted', err);
            removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.send({ code: 'Service Currently Unavailable' });
            }
        }
    }

    await MIDKINGX_MD_PAIR_CODE();
});

module.exports = router;
