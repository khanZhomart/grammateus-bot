import { Scenes, session, Telegraf } from "telegraf";
import dotenv from "dotenv";
import scenes from "./src/scenes/scenes.js";
import {
  isQuizEnded,
  getCurrentQuestion,
} from "./src/services/session.service.js";

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
  if (ctx.message.chat.type === "private") return;

  return ctx.scene.enter("GROUP_MENU_SCENE");
});

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
