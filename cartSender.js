const Discord = require('discord.js');
const client = new Discord.Client();
const embed = require('discord-embed-maker')
client.login('NzMzNDM3NzIxMjcxNDY4MDcy.XxDJTg.DwGsH9K1liUXWjynGC3NpxLNbuU')
const channel = client.channels.fetch('702652513542733875')
const { Client, MessageEmbed } = require('discord.js')
const delay = (msec) => new Promise((resolve) => setTimeout(resolve, msec));


var hours = (new Date()).getHours().toString();
var minutes = (new Date()).getMinutes().toString();
if (minutes < 10) {
	minutes = '0' + minutes
}
var seconds = (new Date()).getSeconds();
if (seconds < 10) {
	seconds = '0' + seconds
}
client.on('message', message => {
	// If the message is "how to embed"
	if (message.content === 'Test') {
	  // We can create embeds using the MessageEmbed constructor
	  // Read more about all that you can do with the constructor
	  // over at https://discord.js.org/#/docs/main/master/class/MessageEmbed
	  	const embed = new MessageEmbed()
			.setTitle('Shoe Palace Cart Ready!')
			.setColor(3066993)
			.setImage('https://sneakernews.com/wp-content/uploads/2020/07/adidas-Yeezy-Boost-350-V2-FZ1267-1.jpg')
			.setDescription('Be the first to react with a shopping cart to claim!')
			.setFooter(hours + ':' + minutes + ':' + seconds + '                                               ' + 'Developed by @CheckingOrder @NerdyFitzy');

		const sendCookie = new MessageEmbed()
			.setTitle('Your ATC cookie is ready!')
			.setColor(3066993)
			.setDescription('frontend: DA COOKIE')
			.setFooter(hours + ':' + minutes + ':' + seconds + '                                               ' + 'Developed by @CheckingOrder @NerdyFitzy');
	  	message.channel.send(embed).then(embed => {
			embed.react('🛒')
			const filter = (reaction, user) => reaction.emoji.name === '🛒' && user.id != '733437721271468072';

			embed.awaitReactions(filter, {max: 1})
			.then(collected => {
				collected.each(user => {
					let unfiltered = user.users.cache
					unfiltered.each(reacters => {
						if(reacters.bot === false) {
							let winner = reacters.id;
							client.users.cache.get(winner).send(sendCookie);

						}
					})
				})

			})
			.catch(collected => {
				console.log(" error! " + collected);
			});
	  	})


		

	}
});

async function sendHook(frontend) {
	// If the message is "how to embed"
		// We can create embeds using the MessageEmbed constructor
		// Read more about all that you can do with the constructor
		// over at https://discord.js.org/#/docs/main/master/class/MessageEmbed
			const embed = new MessageEmbed()
			  .setTitle('Shoe Palace Cart Ready!')
			  .setColor(3066993)
			  .setImage('https://sneakernews.com/wp-content/uploads/2020/07/adidas-Yeezy-Boost-350-V2-FZ1267-1.jpg')
			  .setDescription('Be the first to react with a shopping cart to claim!')
			  .setFooter(hours + ':' + minutes + ':' + seconds + '                                               ' + 'Developed by @CheckingOrder @NerdyFitzy');
  
		  const sendCookie = new MessageEmbed()
			  .setTitle('Your ATC cookie is ready!')
			  .setColor(3066993)
			  .setDescription('frontend: ' + frontend)
			  .setFooter(hours + ':' + minutes + ':' + seconds + '                                               ' + 'Developed by @CheckingOrder @NerdyFitzy');
			channel.send(embed).then(embed => {
			  embed.react('🛒')
			  const filter = (reaction, user) => reaction.emoji.name === '🛒' && user.id != '733437721271468072';
  
			  embed.awaitReactions(filter, {max: 1})
			  .then(collected => {
				  collected.each(user => {
					  let unfiltered = user.users.cache
					  unfiltered.each(reacters => {
						  if(reacters.bot === false) {
							  let winner = reacters.id;
							  client.users.cache.get(winner).send(sendCookie);
  
						  }
					  })
				  })
  
			  })
			  .catch(collected => {
				  console.log(" error! " + collected);
			  });
			})
}


sendHook()

