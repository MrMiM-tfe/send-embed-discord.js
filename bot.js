const { Client, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log('Ready!');
});

const generateEmbed = (text) => {
  // Strip and split the text
  text = text.replace('/e ', '');
  text = text.replace('\uFEFF', '');
  text = text.replace(/\n\n/g, '\n');
  text = text.split('\n');
  // Create the embed
  let fields = ['title', 'message', 'description', 'url', 'color', 'timestamp', 'footer_image', 'footer', 'thumbnail', 'image', 'author', 'author_url', 'author_icon'];
  let embed = {};
  let last_attrb = ''
  for (var x = 0; x < text.length; x++) {
    let line = text[x]
    let split = line.split(':');

    // Check if it is an attribute or continuation of previous
    if (fields.includes(split[0])) {
      // Check if there is a leading ' '
      if (split[1].startsWith(' ')) {
        embed[split[0]] = split[1].slice(1);
      } else {
        embed[split[0]] = split[1];
      }

      // Store the last attribute to be set so we can have multi-line
      last_attrb = split[0];
    } else {
      embed[last_attrb] += '\n' + line;
    }
  }

  // Find the unused fields
  let unused = [];
  let keys = Object.keys(embed);
  for (var x = 0; x < keys.length; x++) {
    if (embed[keys[x]] == '') {
      unused.push(keys[x]);
    }
  }

  // Remove the unused fields
  for (var x = 0; x < unused.length; x++) {
    delete embed[unused[x]];
  }

  // Proccess color
  embed.color = embed.color ? parseInt(embed.color.replace('#', ''), 16) : 0;

  delete embed['']

  // Convert the embed to Discord's format
  let discordEmbed = {
    type: 'rich',
    footer: { text: '' },
    author: { name: '' }
  }
  let messageId = ''
  keys = Object.keys(embed);
  for (var x = 0; x < keys.length; x++) {
    switch (keys[x]) {
      case 'timestamp':
        if (embed.timestamp.toLowerCase() == 'true') {
          let timestamp = (new Date).toISOString();
          discordEmbed.timestamp = timestamp;
        }
        break;
      case 'message':
        messageId = embed.message;
        break;
      case 'footer_image':
        discordEmbed.footer.icon_url = embed.footer_image;
        break;
      case 'footer':
        discordEmbed.footer.text = embed.footer;
        break;
      case 'thumbnail':
        discordEmbed.thumbnail = {};
        discordEmbed.thumbnail.url = embed.thumbnail;
        break;
      case 'image':
        discordEmbed.image = {};
        discordEmbed.image.url = embed.image;
        break;
      case 'author':
        discordEmbed.author.name = embed.author;
        break;
      case 'author_url':
        discordEmbed.author.url = embed.author_url;
        break;
      case 'author_icon':
        discordEmbed.author.icon_url = embed.author_icon;
        break;
      default:
        discordEmbed[keys[x]] = embed[keys[x]];
        break;
    }
  }
  return { discordEmbed, messageId }
}

let lastMessage = ''
let lastEmbed = ''
client.on('messageCreate', (message) => {

  if (message.content.includes("$E")) {

    let text = message.content.replace('$E', '')
    const { discordEmbed } = generateEmbed(text)
    message.channel.send({ embeds: [discordEmbed] }).then(message => {
      lastEmbed = message
    })
    lastMessage = message.id
  } else if (message.content.includes("$D")) {

    let text = message.content.replace('$D', '')
    const { discordEmbed, messageId } = generateEmbed(text)
    message.channel.messages.fetch(messageId)
      .then(message => {
        message.edit({ embeds: [discordEmbed] }).then(message => {
          lastEmbed = message
        })
        lastMessage = message.id
      })
      .catch(console.error);

  }
})
client.on('messageUpdate', (last_message , message) => {

  if (message.content.includes("$E") && lastMessage == message.id) {
    let text = message.content.replace('$E', '')
    const { discordEmbed } = generateEmbed(text)
    lastEmbed.edit({ embeds: [discordEmbed] })

  }
})

// Login to Discord with your client's token
client.login("Token");