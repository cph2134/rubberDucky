const { App } = require("@slack/bolt");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//a collection of responses

//initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  port: process.env.PORT || 3000,
});

const responses = [
  "That sounds hard",
  "Did you read your error message?",
  "When I'm stuck, I like to take a break and drink a glass of water",
  "Why don't you try explaining it to me very slowly?",
];
//grab a random response from the responce array
const randomReply = () => {
  responses[Math.floor(Math.random() * responses.length)];
};

// Listens to incoming messages that contain "hello"
app.message("hello", async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  let response = randomReply();
  await say(`${response}`);
});

// subscribe to 'app_mention' event in your App config
// need app_mentions:read and chat:write scopes
// app.event("app_mention", async ({ event, context, client, say }) => {
//   try {
//     let sayThis = randomReply();
//     await say({
//       blocks: [
//         {
//           type: "section",
//           text: {
//             type: "mrkdwn",
//             text: sayThis,
//           },
// accessory: {
//   type: "button",
//   text: {
//     type: "plain_text",
//     text: "Button",
//     emoji: true,
//   },
//   value: "click_me_123",
//   action_id: "first_button",
// },
//         },
//       ],
//     });
//   } catch (error) {
//     console.error(error);
//   }
// });

(async () => {
  //start your app
  await app.start();
  console.log(`Bolt app is running`);
})();
