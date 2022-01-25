const { App } = require("@slack/bolt");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const store = require("./Home");

const fs = require("fs");
let raw = fs.readFileSync("db.json");
let tips = JSON.parse(raw);
//initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  // port: process.env.PORT || 3000,
});

(async () => {
  //start your app
  const port = 3000;
  await app.start(process.env.PORT || port);
  console.log(`Bolt app is running on port ${port}`);
})();

app.message(/^(hi|hello|hey).*/, async ({ context, say }) => {
  // RegExp matches are inside of context.matches
  const greeting = context.matches[0];
  // const userId = context.user;
  console.log(context);

  await say(`${greeting}, how are you?`);
});
// if someone sends rubberDucky a DM, they'll get a randomly selected reply from teh responses array
//random responses
const responses = [
  "That sounds hard",
  "Did you read your error message?",
  "When I'm stuck, I like to take a break and drink a glass of water",
  "Why don't you try explaining it to me very slowly?",
  "Did you google your error message?",
  "did you check your terminal?",
  "Maybe you should put in a help ticket",
  "Maybe you should take a nap",
  "Are you hungry? Eat a cookie!",
  "Can you draw me a picture?",
];
//grab a random response from the responce array
const randomReply = () =>
  responses[Math.floor(Math.random() * responses.length)];

// Listens for incoming messages with any content
// app.message(/.*/, async ({ message, say }) => {
//   // say() sends a message to the channel where the event was triggered
//   try {
//     if (message) {
//       let response = randomReply();
//       say(`${response}`);
//     }
//   } catch (error) {
//     console.log("err");
//     console.error(error);
//   }
// });

//if someone uses the "/debugger" command, they'll get a list of resources with descriptions for help with debugging

app.command("/seriously", async ({ command, ack, say }) => {
  try {
    await ack();
    let message = randomReply();
    say(message);
  } catch (error) {
    console.log("err");
    console.error(error);
  }
});

//This code determines what appears on the app's home page
app.event("app_home_opened", async ({ event, client, context }) => {
  // Look up the user from DB
  try {
    const result = await client.views.publish({
      user_id: event.user,
      view: {
        type: "home",
        blocks: [
          {
            type: "header",
            text: {
              type: "plain_text",
              text: "Debugging for beginners",
              emoji: true,
            },
          },
          {
            type: "section",
            text: {
              type: "plain_text",
              text: "This is a plain text section block.",
              emoji: true,
            },
          },
          {
            type: "divider",
          },
          {
            type: "header",
            text: {
              type: "plain_text",
              text: "Debugging in the Browser",
              emoji: true,
            },
          },
          {
            type: "section",
            text: {
              type: "plain_text",
              text: "This is a plain text section block.",
              emoji: true,
            },
          },
          {
            type: "divider",
          },
          {
            type: "header",
            text: {
              type: "plain_text",
              text: "Debugging in your IDE",
              emoji: true,
            },
          },
          {
            type: "section",
            text: {
              type: "plain_text",
              text: "This is a plain text section block.",
              emoji: true,
            },
          },
          {
            type: "divider",
          },
          {
            type: "header",
            text: {
              type: "plain_text",
              text: "Debugging HTTP Requests",
              emoji: true,
            },
          },
          {
            type: "section",
            text: {
              type: "plain_text",
              text: "This is a plain text section block.",
              emoji: true,
            },
          },
          {
            type: "divider",
          },
          {
            type: "header",
            text: {
              type: "plain_text",
              text: "When to Ask for Help",
              emoji: true,
            },
          },
          {
            type: "section",
            text: {
              type: "plain_text",
              text: "This is a plain text section block.",
              emoji: true,
            },
          },
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});
