//The bot kinda needs these things to do things.
const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const sql = require("sqlite");
const config = require("./config.json");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const economy = require("discord-eco");
sql.open("./eco.sqlite");


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
        return;
      } 
      //Adds the muted role to the person in question.
      else {
        let reason = args.slice(1).join(" ");
        perp.addRole(mute).catch(console.error);
        //The "logs" is the channel that it searches for.
        //If you have a different channel for keeping track of moderation, change that.
        message.guild.channels.find("name" , "logs").send(perp + " has been muted ~!\nI hope they learn their lesson!");
        if (reason) {
          message.guild.channels.find("name" , "logs").send("Reason: " + reason);
        }
      }
    } else {
      message.channel.send("You don't have permission to mute that person....\nPlease notify someone who does.");
      return;
    }
    message.delete();
  }

  //Unmute command.
  if (command === "unmute") {
    let perp = message.mentions.members.first();
    let mute = message.guild.roles.find("name" , "Dunce Cap");
    if (message.member.permissions.has("MANAGE_ROLES")) {
      //If there's no extra arguments after the command or a mention, it doesn't work.
      if (!args[0] || !perp) {
        message.channel.send("I can't mute if you don't tell me who to mute. :cold_sweat:");
        return;
      } 
      //Adds the muted role to the person in question.
      else {
        perp.removeRole(mute).catch(console.error);
        message.guild.channels.find("name" , "logs").send(perp + " has been unmuted ~!\nBe nice, okay ~?");
      }
    } else {
      message.channel.send("You don't have permission to unmute that person....\nPlease notify someone who does."); 
      return;
    }
    message.delete();
  }

  //Kick command.
  if (command === "kick") {
    let kck = message.mentions.members.first();
    if (!message.member.permissions.has("KICK_MEMBERS")) {
      //Flavor text.
      message.reply("You don’t have enough badges to tell me to do that.");
      return;
    } else if (!args[0] || !kck) {
      message.channel.send("Like you can’t play soccer without a ball, I can’t kick a person without a name.");
      return;
    } else if (!kck.kickable) {
      message.reply ("Do you understand how disrespectful it would be to kick someone so high level? :cold_sweat:");
      return;
    } else {
      let reason = args.slice(1).join(" ");
      //"bm" is the moderation channel for a specific Discord server.
      //Change the "logs" part if the moderation channel for you is different.
      let bm = message.guild.channels.find("name" , "logs");
      if (!reason) {
        kck.kick();
        bm.send(kck + " has been temporarily kicked out.");
        bm.send("Kicked by " + player.username + ".");
      } else {
        //kick(reason) logs within Discord what the reason for a kick was.
        kck.kick(reason);
        bm.send(kck + " has been temporarily kicked out.");
        bm.send("Reason: " + reason);
      }
    }
    message.delete();
  }


  //Ban command.
  if (command === "ban") {
    let bnd = message.mentions.members.first();
    if (!message.member.permissions.has("BAN_MEMBERS")) {
      message.reply("You don’t have enough badges to tell me to do that.");
      return;
    } else if (!args[0] || !bnd) {
      message.channel.send("I can’t hammer the nail if you don’t tell me where.");
      return;
    } else if (!bnd.bannable) {
      message.reply ("They’re too high level! I can’t ban them!");
      return;
    } else {
      let bm = message.guild.channels.find("name" , "logs");
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
    message.delete();
  }

  //Pat command. Obvs the best one here.
  if (command === "pat") {
    let mem = message.mentions.members.first();
    if (!args[0] || !mem) {
      //This picks a random number between 1 & 10 and stores it into x.
      let x = Math.floor(Math.random() * 10) + 1
      //Everything below here is just flavor text.
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


  if (command === "bal") {
    //Looks in the 'eco.sqlite' file and find the row that matches the command sender's Discord ID.
    sql.get(`SELECT * FROM eco WHERE Id ="${player.id}"`).then((row) => {
      if (!row) {
        sql.run("CREATE TABLE IF NOT EXISTS eco (Id TEXT, state INTEGER)").then(async () => {
          await sql.run("INSERT INTO eco (Id, state) VALUES (?, ?)", [player.id, 1]);
          await economy.updateBalance(player.id, 100).then((i) => {
            message.channel.send("Welcome to the PokéMaid Banking System ~!\nYou get a complimentary **100** <:mcoin:409061630710906880> for opening your first account!\nDon't spend it all in once place ~");
          });  
        });
      } else if (row.state === 1) {
        economy.fetchBalance(player.id).then((i) => {
          var embed = new Discord.RichEmbed()
            .setTitle(`PokéMaid Banking System`)
            .setThumbnail(player.avatarURL)
            .setColor(0xad28d6)
            .addField(`Balance for: ${player.username}`, `${i.money} <:mcoin:409061630710906880>`)
            .setFooter("System Handled by Maidevoir", "https://cdn.discordapp.com/attachments/383698784053362692/387317737799680003/image.jpg");
          message.channel.send(embed);
        });
      }
    }).catch(() => {
      sql.run("CREATE TABLE IF NOT EXISTS eco (Id TEXT, state INTEGER)").then(async () => {
        await sql.run("INSERT INTO eco (Id, state) VALUES (?, ?)", [player.id, 1]);
        await economy.updateBalance(player.id, 100).then((i) => {
          message.channel.send("Welcome to the PokéMaid Banking System ~!\nYou get a complimentary **100** <:mcoin:409061630710906880> for opening your first account!\nDon't spend it all in once place ~");
        });
      });
    });
    return
  }

  if (command === "bet") {
    //One of the biggest commands here.
    var mem = message.mentions.members.first();
    //'apt' is a var for people who accept bets.
    var apt = 0
    //'mun' is just a throw away variable for throwing errors
    var mun = 0
    var mco = args[1];
    //'yes and 'no' are the Unicode characters for :regional_indicator_y/n: Discord Emojis.
    const yes = "🇾";
    const no = "🇳";
    //'transactions' is a different specific moderation channel for the Discord. Change it to whatever you want.
    const trans = message.guild.channels.find("name", "transactions");
    if (!mem) {
      message.channel.send("Who do you want to bet with? I can't just message everyone...");
      return;
    } else if (mem.id === player.id) {
      //This is if they try to bet with themselves. Which is dumb.
      message.channel.send("Why would you think that would work?");
      return;
    } else if (isNaN(args[1])) {
      message.channel.send("I can't accept anything that isn't an MCoin value...");
      return;
    } else if (args[1] <= 0) {
      message.channel.send("What's the point of betting, then?");
    } else {  
      economy.fetchBalance(player.id).then(i => {
        if (i.money < mco) {
          //This catches if the person trying to bet is attempting to bet more than they have.
          mun++;
        } else return;
      }).then(() => {
        if (mun === 1) {
          message.channel.send("You don't have enough funds for that!");
          //This Error breaks the 'then' chain so that it stops continuing it.
          throw new Error("nofunds");
          return;
        }
      }).then(async() => {
        await message.channel.send("Wager sent!");
        await mem.send(`${player.username} has wagered **${Math.floor(mco)}** MCoin with you!\nDo you accept? (Please choose one option. This request will process in 30 seconds.)`).then(async function (message) {
          await message.react(yes);
          await message.react(no);
          await message.awaitReactions(reaction => reaction.emoji.name === yes || reaction.emoji.name === no, {time: 30 * 1000});
          let accept = message.reactions.find(reaction => reaction.emoji.name === yes).count-1;
          let decline = message.reactions.find(reaction => reaction.emoji.name === no).count-1;
          console.log(`Accept = ${accept} and Decline = ${decline}`);
          if (accept === 1) {
            if (decline === 0) {
              player.send(`Your wager has been accepted!`);
              message.channel.send("You have accepted their wager!");
              apt++;
              return;  
            } else if (decline === 1) {
              player.send(`Your wager has been declined due to it not being taken seriously.`);
              message.channel.send("...Didn't I say to choose only one option?");
              return;  
            }
          } else if (accept === 0) {
            if (decline === 1) {
              player.send(`Your wager has been declined.`);
              message.channel.send("You have declined their wager.");
              return;
            } else if (decline === 0) {
              player.send(`Your wager has been auto-declined.`);
              message.channel.send("You have auto-declined the wager.");
              return;  
            }
          }
        });
      }).then(() => {
        if (apt === 1) {
          trans.send(`${mem} has accepted the wager of **${Math.floor(mco)}** <:mcoin:409061630710906880> from ${player}!`);
          return
        }
      }).catch(err => {
        if (err.message === "nofunds") {
          return
        }
      });
    }
  }

  if (command === "pay") {
    var mem = message.mentions.members.first();
    var mun = 0;
    var mco = args[1];
    const trans = message.guild.channels.find("name", "transactions");
    if (!mem) {  
      message.channel.send("Who are you planning on paying? I can't read your mind.");  
      return;  
    } else if (mem.id === player.id) {
      message.channel.send("Paying yourself isn't funny. It's just sad.");
      return;
    } else if (isNaN(mco)) {
      message.channel.send("You haven't provided a valid MCoin value.");
      return;
    } else if (mco <= 0) {
      message.channel.send("Those kind of jokes aren't funny.");
      return;
    } else {
      economy.fetchBalance(player.id).then(i => {
        if (i.money < mco) {
          mun++;
        }
      }).then(() => {
        if (mun === 1) {
          message.channel.send("You don't have enough money to pay!");
          throw new Error("nofunds");
        } else return;
      }).then(async () => {
        await economy.updateBalance(mem.id, mco);
        await economy.updateBalance(player.id, -mco);
        await message.channel.send("Transaction complete!"); 
        await trans.send(`${player} payed ${mem} **${Math.floor(mco)}** MCoin!`);
      }).catch(err => {
        if (err.message === "nofunds") {
          return;
        } else return;
      });
    }  
  }

  if (command === "roll") {
    var mco = args[0];
    var mun = 0
    if (!mco) {
      message.channel.send("Rolling nothing isn't an option...");
      return;
    } else if (isNaN(mco)) {
      message.channel.send("That wasn't a proper amount of MCoin.");
      return;
    } else if (mco <= 0) {
      message.channel.send("How about I roll *your* money into the negatives?");
    } else {
      message.channel.startTyping(1);
      economy.fetchBalance(player.id).then(i => {
        if (i.money < mco) {
          mun++;
        } else return;
      }).then(() => {
        if (mun === 1) {
          message.channel.send("You can't bet more than you have!");
          message.channel.stopTyping(true);
          throw new Error("nofunds");
        } else return;
      }).then(async() => {
        let x = Math.floor(Math.random() * 100) + 1
        if (x >= 1 && x <= 75) {
          await economy.updateBalance(player.id, -mco)
          await message.channel.send(`Your roll was unsuccessful....\n**-${Math.floor(mco)}** <:mcoin:409061630710906880>`);
          await message.channel.stopTyping(true);
          return;
        } else if (x >= 76 && x <= 90) {
          await message.channel.send(`You lost nothing. Could've been worse.\n**+0** <:mcoin:409061630710906880>`);
          await message.channel.stopTyping(true);
          return;
        } else if (x >= 91 && x <= 98) {
          await economy.updateBalance(player.id, mco);
          await message.channel.send(`You got **2x** your roll back! Nice one!\n**+${Math.floor(mco)}** <:mcoin:409061630710906880>`);
          await message.channel.stopTyping(true);
          return;
        } else if (x >= 99 && x <= 100) {
          await economy.updateBalance(player.id, mco * 2);
          await message.channel.send(`You got **3x** your roll back! Incredible!!!\n**+${Math.floor(mco) * 2}** <:mcoin:409061630710906880>`);
          await message.channel.stopTyping(true);
          return;
        }
      }).catch((err) => {
        if (err.message === "nofunds") {
          return;
        }
      });
    }
  }

  if (command === "give") {
    const god = "169222386275581953"
    const trans = message.guild.channels.find("name", "transactions");
    var mem = message.mentions.members.first();
    var mco = args[1];
    if (player.id !== god) {
      message.channel.send("I only answer that request to the true god of the economy.");
      return;
    } else if (!mem) {
      message.channel.send("Who's the lucky person getting the present?");
      return;
    } else if (isNaN(mco)) {
      message.channel.send("I need a number to give someone anything!");
      return;
    } else if (mco === 0) {
      message.channel.send("I would rather not joke about this sort of thing.");
      return;
    } else if (mco < 0) {
      economy.updateBalance(mem.id, mco).then(i => {
        trans.send(`The Grand Master Econimal, ${player}, has taken away **${mco}** from ${mem}!`);
      });
    } else {
      economy.updateBalance(mem.id, mco).then(i => {
        trans.send(`The Grand Master Econimal, ${player}, has given **${mco}** to ${mem}!`);
      });
    }
  }



  //Help command. Separate for people with and without moderation 
  if (command === "help") {
    let modRole = message.guild.roles.find("name" , "Moderator");
    let masterRole = message.guild.roles.find("name" , "Minus Master");
    let devRole = message.guild.roles.find("name" , "MinusDev");
    if (!player.roles) {
      player.send("```==ping: It shows you how long I've been awake ~! Please make sure that I get my sleep....\n==help: That is what you're doing right now. Hehe ~\n==pat:  Pat me and give me praise ~! Ping a friend to give them a pat ~!\n==f:    Pay respects whenever a tragic thing occurs in the server.\n==bal:  Check how much MCoin you have ~! Never hurts to look.\n==bet:  Wager with another person for their MCoin! Usage: ==bet [mention] [amount]\n==pay:  Be a kind soul and give away your MCoin! Usage: ==pay [mention] [amount]\n==roll: Use your accumulated MCoin to wager on a chance to win big money ~! Usage: ==roll [amount]```");
    } else if (player.roles.has(masterRole.id) || perm.has(modRole.id)) {
      player.send("```==ping: It shows you how long I've been awake ~! Please make sure that I get my sleep....\n==help: That is what you're doing right now. Hehe ~\n==pat:  Pat me and give me praise ~! Ping a friend to give them a pat ~!\n==f:    Pay respects whenever a tragic thing occurs in the server.\n==bal:  Check how much MCoin you have ~! Never hurts to look.\n==bet:  Wager with another person for their MCoin! Usage: ==bet [mention] [amount]\n==pay:  Be a kind soul and give away your MCoin! Usage: ==pay [mention] [amount]\n==roll: Use your accumulated MCoin to wager on a chance to win big money ~! Usage: ==roll [amount]\n==mute: Gag a person on the server. Great for parties ~! (==unmute is the opposite)\n==kick: Kick a guest from the server. Provide a reason after the person you're kicking (optional).\n==ban:  Ban a guest from the server. Provide a reason after the person you're banning (optional).```");
    } else if (player.roles.has(devRole.id)) {
      player.send("```==ping: It shows you how long I've been awake ~! Please make sure that I get my sleep....\n==help: That is what you're doing right now. Hehe ~\n==pat:  Pat me and give me praise ~! Ping a friend to give them a pat ~!\n==f:    Pay respects whenever a tragic thing occurs in the server.\n==bal:  Check how much MCoin you have ~! Never hurts to look.\n==bet:  Wager with another person for their MCoin! Usage: ==bet [mention] [amount]\n==pay:  Be a kind soul and give away your MCoin! Usage: ==pay [mention] [amount]\n==roll: Use your accumulated MCoin to wager on a chance to win big money ~! Usage: ==roll [amount]\n==kick: Kick a guest from the server. Provide a reason after the person you're kicking (optional).```");
    } else {
      player.send("```==ping: It shows you how long I've been awake ~! Please make sure that I get my sleep....\n==help: That is what you're doing right now. Hehe ~\n==pat:  Pat me and give me praise ~! Ping a friend to give them a pat ~!\n==f:    Pay respects whenever a tragic thing occurs in the server.\n==bal:  Check how much MCoin you have ~! Never hurts to look.\n==bet:  Wager with another person for their MCoin! Usage: ==bet [mention] [amount]\n==pay:  Be a kind soul and give away your MCoin! Usage: ==pay [mention] [amount]\n==roll: Use your accumulated MCoin to wager on a chance to win big money ~! Usage: ==roll [amount]```");
    }
    player.send("Credits to Survivian and ThePwnzr for teaching me and Glitch for hosting me here ~!")
    player.send("Ver. 1.2.3");
  }
});
//Login information. Separate file to keep from bad things happening.
client.login(config.token);
