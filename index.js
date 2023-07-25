const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  Embed,
} = require("discord.js");
const { token } = require("./config.json");
const { getShortTermData, getShortTermRegId } = require("./api/api");
const { date, weatherImo, calDay } = require("./function/function.js");
const celsius = "\u00B0C";
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {});
client.on("messageCreate", (msg) => {
  if (msg.content.includes("날씨") && msg.content.includes("?")) {
    let str = msg.content.split("날씨");
    async function getLTT() {
      let RegId = await getShortTermRegId(str);
      if (RegId.length == 0) {
        msg.reply("지역명을 찾을 수 없어..");
        return;
      }
      msg.reply(RegId[0][1] + " 날씨를 알려줄게~");
      let LTT = await getShortTermData(RegId[0][0]);

      for (data of LTT) {
        let {
          regId,
          TM_FC,
          TM_EF,
          MOD,
          NE,
          STN,
          C,
          MAN_ID,
          MAN_FC,
          W1,
          T,
          W2,
          TA,
          ST,
          SKY,
          PREP,
          W,
        } = data;

        let { year, month, day, time } = date(TM_EF);
        const embed = new EmbedBuilder();

        msg.channel.send({
          embeds: [
            {
              fields: [
                {
                  name: `${year}/${month}/${day} (${calDay(
                    year,
                    month,
                    day
                  )}) ${time}시 ${
                    time == 0 ? `:crescent_moon:` : `:sun_with_face:`
                  }`,
                  value: `기온 : ${TA}°C  강수 확률 : ${ST}% 개요 : ${W} ${weatherImo(
                    SKY,
                    PREP
                  )} `,
                },
              ],
            },
          ],
        });
      }
    }
    getLTT();
  }
});

// Log in to Discord with your client's token
client.login(token);
