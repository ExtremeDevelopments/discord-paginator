## About

discord-paginator works with the discord.js library to paginate your embeds to reduce code clutter and do the hard work for you!

## Installation

```bash
npm i discord-paginator --save
```

## Usage

```js
const page = require("discord-paginator");

client.on("message", (message) => {
  // Fetch your commands the way you would like
  const commands = client.commands.map((i) => `${i.name} - ${i.description}`);
  const chunked = page.chunk(commands, 10).map((x) => x.join("\n"));

  const embed = new MessagEmbed().setDescription(chunked[0]);
  const msg = await message.channel.send({ embeds: [embed ]})
  if (chunked.length > 1) await page.paginate(msg, chunked)
});
```

## Help

Need help? Feel free to shoot me a dm on discord at Extreme#1000!