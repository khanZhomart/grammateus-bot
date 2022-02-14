import { Scenes, session, Telegraf } from "telegraf";
import dotenv from "dotenv";
import scenes from "./src/scenes/scenes.js";
import {
  isQuizEnded,
  getCurrentQuestion,
} from "./src/services/session.service.js";
import { Scenes, session, Telegraf } from "telegraf"
import dotenv from 'dotenv'
import scenes from "./src/scenes/scenes.js"
import { sendLogs } from "./src/services/session.service.js"
import { pushChat, getChat, resetDb } from "./src/database/db.js"

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const stage = new Scenes.Stage(scenes);
const members = [];

bot.catch((e) => console.log("Something gone wrong...", e));
bot.use(session());
bot.use(stage.middleware());

bot.command("start", (ctx) => {
  if (ctx.message.chat.type !== "private") return;

  return ctx.scene.enter("PRIVATE_MENU_SCENE");
});


bot.command("menu", (ctx) => {
  if (ctx.message.chat.type === "private") 
     return;

  return ctx.scene.enter("GROUP_MENU_SCENE");
});

bot.command('quiz', (ctx) => {
  if (ctx.message.chat.type === 'private')
    return

    pushChat(ctx.message.chat.id, (quiz_started) => {
        if (quiz_started) {
            return
        }

        return ctx.scene.enter('GROUP_MENU_SCENE')  
    })
})

bot.command('/fuck_db', (ctx) => resetDb())

bot.command('cmd', (ctx) => {
    getChat(ctx.message.chat.id, (data) => {
        return ctx.reply(`<pre>${JSON.stringify(data, null, 2)}</pre>`, {
            parse_mode: 'HTML'
        })
    })
})

bot.on('poll', (ctx) => console.log(ctx.poll))

bot.on("poll_answer", (ctx) => {
  const search = (obj) => obj.name === ctx.pollAnswer.user.first_name;
  //const question = getCurrentQuestion(ctx);

  console.log(ctx.pollAnswer.option_ids);
  //console.log(question.content.answer);

  if (members.find(search) !== undefined) {
    members.find(search).score += 1;
  }

  if (members.find(search) == undefined) {
    members.push({
      name: ctx.pollAnswer.user.first_name,
      score: 0,
    });
  }

  return console.log(members, members.length);
  //return console.log(ctx.pollAnswer)
});

bot.launch({ dropPendingUpdates: true });

export default bot;