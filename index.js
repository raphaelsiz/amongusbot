require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.token);

var colors = [{color: "red", person: null},{color: "blue", person: null},{color: "aqua", person: null},{color:"yellow",person: null},{color: "black",person:null},{color: "orange",person: null},{color: "white",person:null},{color: "pink",person:null},{color:"green",person:null},{color:"lime",person:null}]

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  if (message.content.indexOf('!') == 0) {
    var noE = message.content.substr(1);
    var split = noE.split(' ');
    if (split.indexOf('colors') == 0){
      let string = "";
      for (let color of colors) {
        if (color.person == null) string = string + color + ", ";
      }
      const embed = new Discord.MessageEmbed().setTitle("Available colors:").setColor(0xaa00ff).setDescription(string);
      message.channel.send(embed);
    }
    else if (split.indexOf('members') == 0){
      console.log(message.guild.members);
      message.channel.send("Logged members in the console.");
    }
    else if (split.indexOf('play') == 0){
      message.guild.fetchMember(message.author).then(member=>{
        if (member._roles.indexOf(process.env.role) >= 0){
          game(message);
        }
        else message.channel.send("You do not have that permission!");
      });
    }
    else if (split.indexOf('end') == 0){
      /*message.guild.fetchMember(message.author).then(member=>{*/
      if (message.member._roles.indexOf(process.env.role) >= 0){
        for (let color of colors) color.person = null;
        message.channel.send("All colors cleared.");
      }
      else message.channel.send("You do not have that permission!");
      /*});*/
    }
    else if (split.indexOf('color') == 0) {
      for (let color of colors) {
        if (color.color == split[1].toLowerCase()){
          if (color.person){
            console.log(color.person)
            message.reply("Sorry, that color is taken!");
            return;
          }
          color.person = message.author;
          message.reply("You are now " + color.color + "!");
          return;
        }
      }
      message.reply("Sorry, that's not a color in Among Us!");
    }
  }
});
async function game(message){
  if (message.member.voiceChannel) {
		const connection = await message.member.voiceChannel.join();
    console.log(connection);
	}
  else message.reply("You need to join a voice channel first!")
}




const express = require('express');
const app = express();
app.listen(3000,()=> console.log("Listening at port 3000!"));
app.get('/',(req,res)=>res.send("Still working on it!"));
