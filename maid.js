//The bot kinda needs these things to do things.
const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
//const sql = require("sqlite");
const config = require("./config.json");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//sql.open("./score.sqlite");


//Ready to go!
client.on("ready", () => {
  client.user.setGame("==help for more info");
  console.log("Chu ~!");
});

//Variables go here.
//For life cycle.
var cycleMinutes = 0;
var cycleHours = 0;
var cycleDays = 0;
var cycleTotal;
//XMLHttp.
var xhttp = new XMLHttpRequest();

//New life cycle reporter.
cycles();
function cycles() {
  //counting mechanism
    if (cycleMinutes >= 60){
      cycleHours++;
      cycleMinutes = 0;
    }
    else if (cycleHours >= 24) {
      cycleDays++;
      cycleHours = 0;
    }

    //Conditional reporting of life cycle.
    //Minutes.
    if (cycleMinutes <= 5 && cycleHours === 0 && cycleDays === 0) {
      cycleTotal = "I've been awake for " + (cycleMinutes) + " minutes.... *yawn* Not much of an early bird....";
    }
    else if (cycleHours === 0 && cycleDays === 0){
      if (cycleMinutes == 1) {
        cycleTotal = "I've been awake for " + cycleMinutes + " minute ~! Just starting my day.";
      } else {
        cycleTotal = "I've been awake for " + cycleMinutes + " minutes ~! Just starting my day.";
    }}

    //Hours.
    else if (cycleHours > 0 && cycleDays === 0) {
      //Precision.
      if (cycleHours == 1) {
        if (cycleMinutes === 0) {
          cycleTotal = "I've been awake for " + (cycleHours) + " hour ~! Ready to serve!";
        } else if (cycleMinutes == 1) {
          cycleTotal = "I've been awake for " + (cycleHours) + " hour and " + (cycleMinutes) + " minute ~! Ready to serve!";
        } else if (cycleMinutes > 1) {
          cycleTotal = "I've been awake for " + (cycleHours) + " hour and " + (cycleMinutes) + " minutes ~! Ready to serve!";
        }
      } else if (cycleHours > 1) {
        if (cycleMinutes === 0) {
          cycleTotal = "I've been awake for " + (cycleHours) + " hours ~! Ready to serve!";
        } else if (cycleMinutes == 1) {
          cycleTotal = "I've been awake for " + (cycleHours) + " hours and " + (cycleMinutes) + " minute ~! Ready to serve!";
        } else if (cycleMinutes > 1) {
          cycleTotal = "I've been awake for " + (cycleHours) + " hours and " + (cycleMinutes) + " minutes ~! Ready to serve!";
        }
      }
    }

    //Days.
    else if (cycleDays > 0) {
      if (cycleHours === 0 && cycleMinutes === 0) {
        if (cycleDays == 1) {
        cycleTotal = "I've been awake for exactly " + cycleDays + " day ~! How precise of me.";
      } else if (cycleDays > 1) {
        cycleTotal = "I've been awake for exactly " + cycleDays + " days ~! *yawn* How precise... of... me.";
      }}
      else if (cycleHours === 0 && cycleMinutes > 0) {
        if (cycleDays == 1 && cycleMinutes === 0) {
        cycleTotal = "I've been awake for " + cycleDays + " day and " + cycleMinutes + " minute ~! Ready to serve!";
      } else if (cycleDays == 1 && cycleMinutes > 1) {
        cycleTotal = "I've been awake for " + cycleDays + " day and " + cycleMinutes + " minutes ~! Ready to serve!";
      } else if (cycleDays > 1 && cycleMinutes > 1){
        cycleTotal = "I've been awake for " + cycleDays + " days and " + cycleMinutes + " minutes ~! Ready to serve!";
      }}
      else if (cycleHours > 0 && cycleMinutes === 0) {
        if (cycleDays == 1 && cycleHours == 1) {
          cycleTotal = "I've been awake for " + cycleDays + " day and " + cycleHours + " hour ~! Ready to serve! But I sure am sleepy....";
        } else if (cycleDays == 1 && cycleHours > 1) {
          cycleTotal = "I've been awake for " + cycleDays + " day and " + cycleHours + " hours ~! Ready to serve! But I sure am sleepy....";
        } else if (cycleDays > 1 && cycleMinutes > 1){
          cycleTotal = "I've been awake for " + cycleDays + " days and " + cycleHours + " hours ~! Ready to serve! But I sure am sleepy....";
      }}
      else if (cycleHours > 0 && cycleMinutes > 0) {
        if (cycleDays == 1) {
          if (cycleHours == 1 && cycleMinutes > 1) {
            cycleTotal = "I've been awake for " + cycleDays + " day, " + cycleHours + " hour, and " + (cycleMinutes) + " minutes ~! Ready to serve! But I sure am sleepy....";
          } else if (cycleHours > 1 && cycleMinutes == 1) {
            cycleTotal = "I've been awake for " + cycleDays + " day, " + cycleHours + " hours, and " + (cycleMinutes) + " minute ~! Ready to serve! But I sure am sleepy....";
          } else if (cycleHours == 1 && cycleMinutes == 1) {
            cycleTotal = "I've been awake for " + cycleDays + " day, " + cycleHours + " hour, and " + (cycleMinutes) + " minute ~! Ready to serve! But I sure am sleepy....";
          } else if (cycleHours > 1 && cycleMinutes > 1) {
            cycleTotal = "I've been awake for " + cycleDays + " day, " + cycleHours + " hours, and " + (cycleMinutes) + " minutes ~! Ready to serve! But I sure am sleepy....";
          }
        } else if (cycleDays > 1) {
          if (cycleHours == 1 && cycleMinutes > 1) {
            cycleTotal = "I've been awake for " + cycleDays + " days, " + cycleHours + " hour, and " + (cycleMinutes) + " minutes ~! Ready to serve! But I sure am sleepy....";
          } else if (cycleHours > 1 && cycleMinutes == 1) {
            cycleTotal = "I've been awake for " + cycleDays + " days, " + cycleHours + " hours, and " + (cycleMinutes) + " minute ~! Ready to serve! But I sure am sleepy....";
          } else if (cycleHours == 1 && cycleMinutes == 1) {
            cycleTotal = "I've been awake for " + cycleDays + " days, " + cycleHours + " hour, and " + (cycleMinutes) + " minute ~! Ready to serve! But I sure am sleepy....";
          } else if (cycleHours > 1 && cycleMinutes > 1) {
            cycleTotal = "I've been awake for " + cycleDays + " days, " + cycleHours + " hours, and " + (cycleMinutes) + " minutes ~! Ready to serve! But I sure am sleepy....";
          }
        }
      }
    }

    //Wait the proper amount of time before updating. This needs to be at the end, as anything below likely won't get done.
    setTimeout(function(){cycleMinutes++; console.log("Lifecycle: " + cycleDays + "d, " + cycleHours + "h, " + cycleMinutes + "m."); cycles(); }, 60000);
}

client.on("message", function(message) {
  //initialization
  //Prevents use of bot within DMs, without using the prefix, and prevents bots from feeding into each other.
  if (!message.content.startsWith(config.prefix) || message.author.bot || message.channel.type === "dm") return;
  //This just makes it easier to keep track of arguments.
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  //This variable is mainly used for housekeeping, but I don't have it applied everywhere.
  var player = message.author;

  //commands are in if statements
  //Throw-away command. It's just here to make sure that everything works right.
  if (command === "ping") {
    message.channel.send("Pong ~! :ping_pong:");
    message.channel.send(cycleTotal);
  }


  //Mute command.
  if (command === "mute") {
    let perp = message.mentions.members.first();
    let mute = message.guild.roles.find("name" , "Dunce Cap");
    if (message.member.permissions.has("MANAGE_ROLES")) {
      //If there's no extra arguments after the command or a mention, it doesn't work.
      if (!args[0] || !perp) {
        message.channel.send("I can't mute if you don't tell me who to mute. :cold_sweat:");
      } 
      //Adds the muted role to the person in question.
      else {
        let reason = args.slice(1).join(" ");
        perp.addRole(mute).catch(console.error);
        message.guild.channels.find("name" , "brawlminus").send(perp + " has been muted ~!\nI hope they learn their lesson!");
        if (reason) {
          message.guild.channels.find("name" , "brawlminus").send("Reason: " + reason);
        }
      }
    } else {
      message.channel.send("You don't have permission to mute that person....\nPlease notify someone who does.");
    }
  }

  //Unmute command.
  if (command === "unmute") {
    let perp = message.mentions.members.first();
    let mute = message.guild.roles.find("name" , "Dunce Cap");
    if (message.member.permissions.has("MANAGE_ROLES")) {
      //If there's no extra arguments after the command or a mention, it doesn't work.
      if (!args[0] || !perp) {
        message.channel.send("I can't mute if you don't tell me who to mute. :cold_sweat:");
      } 
      //Adds the muted role to the person in question.
      else {
        perp.removeRole(mute).catch(console.error);
        message.guild.channels.find("name" , "brawlminus").send(perp + " has been unmuted ~!\nBe nice, okay ~?");
      }
    } else {
      message.channel.send("You don't have permission to unmute that person....\nPlease notify someone who does.");
    }
  }

  //Kick command.
  if (command === "kick") {
    let kck = message.mentions.members.first();
    if (!message.member.permissions.has("KICK_MEMBERS")) {
      message.reply("You don’t have enough badges to tell me to do that.");
    } else if (!args[0] || !kck) {
      message.channel.send("Like you can’t play soccer without a ball, I can’t kick a person without a name.");
    } else if (!kck.kickable) {
      message.reply ("Do you understand how disrespectful it would be to kick someone so high level? :cold_sweat:");
    } else {
      let reason = args.slice(1).join(" ");
      let bm = message.guild.channels.find("name" , "brawlminus");
      if (!reason) {
        kck.kick();
        bm.send(kck + " has been temporarily kicked out.");
        bm.send("Kicked by " + player.username + ".");
      } else {
        kck.kick(reason);
        bm.send(kck + " has been temporarily kicked out.");
        bm.send("Reason: " + reason);
      }
    }
  }


  //Ban command.
  if (command === "ban") {
    let bnd = message.mentions.members.first();
    if (!message.member.permissions.has("BAN_MEMBERS")) {
      message.reply("You don’t have enough badges to tell me to do that.");
    } else if (!args[0] || !bnd) {
      message.channel.send("I can’t hammer the nail if you don’t tell me where.");
    } else if (!bnd.bannable) {
      message.reply ("They’re too high level! I can’t ban them!");
    } else {
      let bm = message.guild.channels.find("name" , "brawlminus");
      let reason = args.slice(1).join(" ");
      if (!reason) {
        bnd.ban();
        bm.send(bnd + " has been removed permanently.");
        bm.send("Banned by " + player.username + ".");
      } else {
        bnd.ban(reason);
        bm.send(bnd + " has been removed permanently.");
        bm.send("Reason: " + reason);
      }
    }
  }

  //Pat command. Obvs the best one here.
  if (command === "pat") {
    let mem = message.mentions.members.first();
    if (!args[0] || !mem) {
      let x = Math.floor(Math.random() * 10) + 1
      if (x == 1) {
        message.channel.send("Thank you ~! :heart:");
      } else if (x == 2) {
        message.channel.send("Just doing my job ~! :heart:");
      } else if (x == 3) {
        message.channel.send("You're too kind.... :heart:");
      } else if (x == 4) {
        message.channel.send("It was nothing.... :heart:");
      } else if (x == 5) {
        message.channel.send("I'll do good next time too ~! :heart:");
      } else if (x == 6) {
        message.channel.send("Glad I didn't let you down ~! :heart:");
      } else if (x == 7) {
        message.channel.send("I like being pet ~! :heart:");
      } else if (x == 8) {
        message.channel.send("Anything for you guys ~! :heart:");
      } else if (x == 9) {
        message.channel.send("Thank you for the praise ~! :heart:");
      } else if (x == 10) {
        message.channel.send("I hope I did a good job.... :heart:");
      }
    } else {
      message.channel.send(mem + ", you got a pat from " + player.username + " ~! :heart:");
    }
  }


  //F for respects command.
  if (command === "f") {
    message.channel.send(player.username + " has paid their respects.");
  }


  //Help command. Separate for people with and without moderation access.
  if (command === "help") {
    let modRole = message.guild.roles.find("name" , "Moderator");
    let masterRole = message.guild.roles.find("name" , "Minus Master");
    let devRole = message.guild.roles.find("name" , "MinusDev");
    let perm = message.member.roles;
    if (perm.has(masterRole.id) || perm.has(modRole.id)) {
      message.member.send("```==ping: It shows you how long I've been awake ~! Please make sure that I get my sleep....\n==help: That is what you're doing right now. Hehe ~\n==pat:  Pat me and give me praise ~! Ping a friend to give them a pat ~!\n==f:    Pay respects whenever a tragic thing occurs in the server.\n==mute: Gag a person on the server. Great for parties ~! (==unmute is the opposite)\n==kick: Kick a guest from the server. Provide a reason after the person you're kicking (optional).\n==ban:  Ban a guest from the server. Provide a reason after the person you're banning (optional).```");
    } else if (perm.has(devRole.id)) {
      message.member.send("```==ping: It shows you how long I've been awake ~! Please make sure that I get my sleep....\n==help: That is what you're doing right now. Hehe ~\n==pat:  Pat me and give me praise ~! Ping a friend to give them a pat ~!\n==f:    Pay respects whenever a tragic thing occurs in the server.\n==kick: Kick a guest from the server. Provide a reason after the person you're kicking (optional).```");
    } else {
      message.member.send("```==ping: It shows you how long I've been awake ~! Please make sure that I get my sleep....\n==help: That is what you're doing right now. Hehe ~\n==pat:  Pat me and give me praise ~! Ping a friend to give them a pat ~!\n==f:    Pay respects whenever a tragic thing occurs in the server.```");
    }
  }
});
//Login information. Separate file to keep from bad things happening.
client.login(config.token);
