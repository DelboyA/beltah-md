const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0tZNTQzWHY1UUgvcG1qUEo4VnZmcnRnWkdSZWlhQU00K3N6ZU0vb1kxcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT2NqQ3pQdi9DaUJkc3ZNZ3FNamJ5Y0VxR2VyK290cE5TZnBXR3ozUm5Vdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5Qm4wb013RnRnNjJPdjB2WXNDM2JnU1E1VGw4RG5UVmV3RmR0Ni9Xb253PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJMTjBwK0lJOFVnRTc5MmlzWnlpbS9QbnZjZ2NtTG5HamZ5R0xTUHdqODJNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhNKytGRzIyQ1pZRUp6MXhJQXAyMC8yRzFnNUE4dnpCVG42SzB1VlZ2VUk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklobzUrandQdE9UeHlUR1lEQjNDS3cvYk9VSmFURFhuTVBLV016Uit0QTQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV001SEp4cDh3TG5pa0tlalNEeWZTeTJzbTNxTmZjNkZEWVRvdnYxWDlHTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNnJzRFZscVFzNXdtQkUvTEZldDg4QjU4M3hwbk1tLzZySXBLKzB4cncwWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InY5NDVlKzlidUY4QUZDaDg5SkhYSkxtTTQxdHpVZUZGVW0xc3VsNUlmcVZSQXNBb2UvR0twUlAvSnl6TmUrM2J1OFZGQ2M1dDloMXVnZlpJZTJwcEJ3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTAxLCJhZHZTZWNyZXRLZXkiOiJqQnUzVU5SMDRxMXJsM1JHSGdDYmpSQ1A1TG03NFNGc21tYTlwOHRNUGlBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc3MzQ0MDc1OEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBNzkyMDM2NjBBOTM0NjBGMkU2RkMwMzBERkI2NEY4QyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzE3NjAyODE0fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJBcXAyV0lkQlE2MkdkU0VMTDFNRkpRIiwicGhvbmVJZCI6IjBkMjljM2Y4LTc2NDAtNDgxYS1hNjA3LTVlZWQ5MzdmMjI0OSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlZldTMy85WDl0WXY1SDZUdUpkQ0RpbEhVODA9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSjRqbkgyeWVPNThYcmVuZmlxZDlGbUhPcFlJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkgzNzFSREZBIiwibWUiOnsiaWQiOiIyNTQ3NzM0NDA3NTg6NzhAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J+YrSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS0gvOUlVQ0VPMlRnck1HR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiTG13OThmS1NpTGxYaUc4bW83MzhIUnJSMHpOZ0tlbGlGWXpGVkoybndtUT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiQnVjU2ZETmtiYmxVanVLOXNBdTRVV1c5NE1nR0JlcGFpV0lwL2NZZ28zVXhVazBKQXZ1K2lsNVhvTVZXTTlkUk5sVUtOcmxiWnp4bmFYRXg0Sit2Qmc9PSIsImRldmljZVNpZ25hdHVyZSI6Ik55N3hRQnNBdnM2RFVxcUJkeGJqR3h6SXRCZStCQXRPdVBRVW16bEE5ME0vUFFHekc2TEFObXZaMDQzNVBiTUdsNlpDS2xNQjhGRWZFK0NTY2xXUUNBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzczNDQwNzU4Ojc4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlM1c1BmSHlrb2k1VjRodkpxTzkvQjBhMGRNellDbnBZaFdNeFZTZHA4SmsifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MTc2MDI4MTAsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRXhFIn0=',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "DELBOY ANIEY",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "Beltah KE",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BELTAH_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/dcce2ddee6cc7597c859a.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
