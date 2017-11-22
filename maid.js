//The bot kinda needs these things to do things.
const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const sql = require("sqlite");
const config = require("./config.json");
sql.open("./score.sqlite");


//Ready to go!
client.on("ready", () => {
  client.user.setGame("==help for more info")
  console.log("Chu ~!");
  //testing a non-fatal infinite loop
  
});
var cycleCount = 0;
  cycles();

function cycles() {
    setTimeout(function(){cycleCount++; console.log("CYCLE INCREASE: " + cycleCount); cycles(); }, 10000);
}

client.on("message", function(message) {
  //initialization
  //Prevents use of bot within DMs, without using the prefix, and prevents bots from feeding into each other.
  if (!message.content.startsWith(config.prefix) || message.author.bot || message.channel.type === "dm") return;
  //This just makes it easier to keep track of arguments.
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  //This variable is mainly used for housekeeping, but I don't have it applied everywhere.
  var player = message.author

  //commands are in if statements
  //Throw-away command. It's just here to make sure that everything works right.
  if (command === "ping") {
    message.channel.send("Pong ~!:ping_pong: I\'ve been alive for " + cycleCount + " 10 second cycles.")
  };
  if (command === "wl") { if (!args[0]) {
    //I know what this command does, but I have no idea how to use sqlite as a whole.
    //Since sqlite is basically just better arrays (and is also promise-based) this command is needed to fetch the updated information.
    sql.get(`SELECT * FROM score WHERE userId ="${message.author.id}"`).then(row => {
      if (!row) {
        //The fact that there's even an "if" here is unnecessary. Don't feel like cleaning it up just yet.
        return message.reply("You haven't won any games yet....")
      } else {
        message.channel.send({embed: {
          author: {
            name: "Tournament Scores for " + player.username,
            icon_url: player.avatarURL
          },
          //The "row"s are pulling from the sqlite array. It gets the person's userId and then just pulls from their row until the command is over.
          //In these instances, it's pulling from the wins, losses, etc. parts of the array and displaying them
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
      //If it catches something wrong, it'll make a sqlite array for the person that doesn't have one.
      console.error;
      sql.run("CREATE TABLE IF NOT EXISTS score (userId TEXT, wins INTEGER, losses INTEGER, percent INTEGER, matches INTEGER)").then(() => {
        sql.run("INSERT INTO score (userId, wins, losses, percent, matches) VALUES (?, ?, ?, ?, ?)", [player.id, 0, 0, 0, 0])
      });
      message.reply("You now have a stats page ~! Type '==wl' again to see it ~<3")
    }); return
  } else {
    //This is just the other form of ==wl.
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
      //It won't make a registration for someone because they might not want to be registered.
      console.error;
      message.reply(`I can't track someone who's not registered....`)
      })}
  };

  if (command === "awl") {
    //This thing is a mess.
    let member = message.mentions.members.first();
    let wl = args[1];
    sql.get(`SELECT * FROM score WHERE userId ="${member.id}"`).then(row => {
      if (wl === "w") {
        //These console logs won't be necessary when everything is done.
        //Mainly to keep track of if the calculations are firing right.
        console.log(row.wins + (args[2] * 1))
        //I've noticed that when I turned these into variables, they stacked on each other.
        console.log((row.wins + (args[2] * 1)) + (row.losses * 1))
        //When I made "args[2] * 1" a var, it added itself onto the number, not into.
        console.log((row.wins + (args[2] * 1)) / ((row.wins + (args[2] * 1)) + (row.losses * 1)))
        //If row.wins = 1 AND a = (arg[2] * 1) = 5, then row.wins + a = 15.
        sql.run(`UPDATE score SET wins = ${row.wins + (args[2] * 1)},
        matches = ${(row.wins + (args[2] * 1)) + (row.losses * 1)},
        percent = ${Math.floor((row.wins + (args[2] * 1)) / ((row.wins + (args[2] * 1)) + (row.losses * 1)) * 1000) / 10}
        WHERE userId = ${member.id}`)
        //Which obviously isn't what I want.
        //Until we can figure out a way to make it not do that and make it look neater, this is what we're working with.
      };
      if (wl === "l") {
        //See above.
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
    //This is essentially a way to reset scores in case the above starts screwing up.
    //This will be removed in the official release.
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
//Login information. Separate file to keep from bad things happening.
client.login(config.token);
