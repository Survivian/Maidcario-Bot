const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const sql = require("sqlite");
const config = require("./config.json");
sql.open("./score.sqlite");



client.on("ready", () => {
  client.user.setGame("==help for more info")
  console.log("Chu ~!");
});

client.on("message", function(message) {
  if (!message.content.startsWith(config.prefix) || message.author.bot || message.channel.type === "dm") return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  var player = message.author
  if (command === "ping") {
    message.channel.send("Pong ~!:ping_pong:")
  };
  if (command === "wl") { if (!args[0]) {
    sql.get(`SELECT * FROM score WHERE userId ="${message.author.id}"`).then(row => {
      if (!row) {
        return message.reply("You haven't won any games yet....")
      } else {
        message.channel.send({embed: {
          author: {
            name: "Tournament Scores for " + player.username,
            icon_url: player.avatarURL
          },
          fields: [{
            name: "Games Won",
            value: row.wins
          },
          {
            name: "Games Lost",
            value: row.losses
          },
          {
            name: "Total Matches",
            value: row.matches
          },
          {
            name: "Win Percentage",
            value: row.percent + "%"
          }]
        }})
      }
    }).catch(() => {
      console.error;
      sql.run("CREATE TABLE IF NOT EXISTS score (userId TEXT, wins INTEGER, losses INTEGER, percent INTEGER, matches INTEGER)").then(() => {
        sql.run("INSERT INTO score (userId, wins, losses, percent, matches) VALUES (?, ?, ?, ?, ?)", [player.id, 0, 0, 0, 0])
      });
      message.reply("You now have a stats page ~! Type '==wl' again to see it ~<3")
    }); return
  } else {
    let member = message.mentions.members.first();
    sql.get(`SELECT * FROM score WHERE userId ="${member.id}"`).then(row => {
      message.channel.send({embed: {
        author: {
          name: "Tournament Scores for " + member.username,
          icon_url: member.avatarURL
        },
        fields: [{
          name: "Games Won",
          value: row.wins
        },
        {
          name: "Games Lost",
          value: row.losses
        },
        {
          name: "Total Matches",
          value: row.matches
        },
        {
          name: "Win Percentage",
          value: row.percent + "%"
        }]
      }})
    }).catch(() => {
      console.error;
      message.reply(`I can't track someone who's not registered....`)
      })}
  };
  if (command === "awl") {
    let member = message.mentions.members.first();
    let wl = args[1];
    sql.get(`SELECT * FROM score WHERE userId ="${member.id}"`).then(row => {
      if (wl === "w") {
        console.log(row.wins + (args[2] * 1))
        console.log((row.wins + (args[2] * 1)) + (row.losses * 1))
        console.log((row.wins + (args[2] * 1)) / ((row.wins + (args[2] * 1)) + (row.losses * 1)))
        sql.run(`UPDATE score SET wins = ${row.wins + (args[2] * 1)}, 
        matches = ${(row.wins + (args[2] * 1)) + (row.losses * 1)}, 
        percent = ${Math.floor((row.wins + (args[2] * 1)) / ((row.wins + (args[2] * 1)) + (row.losses * 1)) * 1000) / 10} 
        WHERE userId = ${member.id}`)
      };
      if (wl === "l") {
        console.log(row.losses + (args[2] * 1))
        console.log((row.losses + (args[2] * 1)) + (row.wins * 1))
        console.log((row.losses + (args[2] * 1)) / ((row.losses + (args[2] * 1)) + (row.wins * 1)))
        sql.run(`UPDATE score SET losses = ${row.losses + (args[2] * 1)}, 
        matches = ${(row.losses + (args[2] * 1)) + (row.wins * 1)}, 
        percent = ${Math.floor((row.losses + (args[2] * 1)) / ((row.losses + (args[2] * 1)) + (row.wins * 1)) * 1000) / 10} 
        WHERE userId = ${member.id}`)
      };
    })
  };
  if (command === "swl") {
    let member = message.mentions.members.first();
    let wl = args[1]
    let points = args[2]
    sql.get(`SELECT * FROM score WHERE userId ="${member.id}"`).then(row => {
      if (wl === "w") {
        sql.run(`UPDATE score SET wins = ${points} WHERE userId = ${member.id}`);
      }
      if (wl === "l") {
        sql.run(`UPDATE score SET losses = ${points} WHERE userId = ${member.id}`);
      }
    });
  };
});

client.login(config.token);