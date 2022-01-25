const { App } = require("@slack/bolt");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

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

//respond to a greeting
app.message(/^(hi|hello|hey).*/i, async ({ event, context, say }) => {
  // RegExp matches are inside of context.matches
  const greeting = context.matches[0];
  const userId = {
    user: event.user,
  };
  let user = await app.client.users.profile.get(userId);
  let name = user.profile.display_name;
  console.log(name);

  await say(`${greeting}, ${name}, how are you?`);
});

//random responses
const responses = [
  "Did you read your error message?",
  "Why don't you try explaining it to me very slowly?",
  "Did you google your error message?",
  "Did you really look at your error message?",
  "did you check your terminal?",
  "Maybe you should put in a help ticket",
  "Can you draw me a picture?",
];
//grab a random response from the responce array
const randomReply = () =>
  responses[Math.floor(Math.random() * responses.length)];

//"quack" at the rubberDucky and it will give you a debugging tip!

app.command("/quack", async ({ ack, say }) => {
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
app.event("app_home_opened", async ({ event, client }) => {
  // Look up the user from DB
  try {
    const result = await client.views.publish({
      user_id: event.user,
      view: {
        type: "home",
        blocks: [
          {
            type: "image",
            image_url:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiZo_90H2c4xtvV5qkQ9aaPsyTQb3QBXOZzw&usqp=CAU",
            alt_text: "chart",
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
              type: "mrkdwn",
              text: "<https://www.youtube.com/watch?v=JzpFsrZnNDo&t=0s|A 25-minute Postman primer>",
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
