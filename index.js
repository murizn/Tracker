const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();

const avatarWebhookUrl = process.env.avatar;
const bannerWebhookUrl = process.env.banner;
const TOKEN = process.env.TOKEN;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("oi amigo, achou o vosso site? saiba que temos um iplogger para todos que acessam a api.");
});

app.get("/id/:id", async (req, res) => {
  const { id } = req.params;

  const r = await fetch(`https://discord.com/api/v9/users/${id}`, {
    method: "GET",
    headers: {
      Authorization: `${TOKEN}`,
    },
  });

  const badgesList = [
    ["Discord_Employee", 1 << 0],
    ["Partnered_Server_Owner", 1 << 1],
    ["HypeSquad_Events", 1 << 2],
    ["Bug_Hunter_Level_1", 1 << 3],
    ["House_Bravery", 1 << 6],
    ["House_Brilliance", 1 << 7],
    ["House_Balance", 1 << 8],
    ["Early_Supporter", 1 << 9],
    ["Team_User", 1 << 10],
    ["Bug_Hunter_Level_2", 1 << 14],
    ["Verified_Bot", 1 << 16],
    ["Early_Verified_Bot_Developer", 1 << 17],
    ["Discord_Certified_Moderator", 1 << 18],
    ["Active_Developer", 1 << 22]
  ];

  const response = await r.json();

  let avatarUrl = `https://cdn.discordapp.com/avatars/${id}/${response.avatar}`;
  let bannerUrl = response.banner ? `https://cdn.discordapp.com/banners/${id}/${response.banner}` : null;



  let nitro = response.premium_type

  if (nitro == 0) {
    nitro = "Sem nitro"
  }

  if (nitro == 1) {
    nitro = "Nitro Classic"
  }

  if (nitro == 2) {
    nitro = "Nitro Gaming"
  }

  if (nitro == 3) {
    nitro = "Nitro Basic"
  }

  const badges = badgesList
    .filter(([badgeName, badgeFlag]) => (response.public_flags & badgeFlag) === badgeFlag)
    .map(([badgeName]) => badgeName);

  res.status(r.status).json({
    id: response.id,
    username: response.username,
    avatar: avatarUrl,
    banner: bannerUrl,
    discriminator: response.discriminator,
    public_flags: response.public_flags,
    flags: response.flags,
    nitro: nitro,
    accent_color: response.accent_color,
    badges: badges
  });
});

app.post("/send-assets", async (req, res) => {
  const { avatarUrl, bannerUrl } = req.body;

  if (avatarUrl) {
    sendPayloadToWebhook(avatarWebhookUrl, avatarUrl, "# Avatar recebido");
  }

  if (bannerUrl) {
    sendPayloadToWebhook(bannerWebhookUrl, bannerUrl, "# Banner recebido");
  }

  res.sendStatus(200);
});

function sendPayloadToWebhook(webhookUrl, imageUrl, content) {
  const payload = {
    content: content,
    embeds: [
      {
        image: {
          url: imageUrl
        }
      }
    ]
  };

  fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
    .catch(error => {
      console.error("Failed to send payload to webhook", error);
    });
}

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
