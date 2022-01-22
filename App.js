const { App } = require("@slack/bolt");

//a collection of responses
const response = [
  "That sounds hard",
  "Did you read your error message?",
  "When I'm stuck, I like to take a break and drink a glass of water",
  "Why don't you try explaining it to me very slowly?",
];
//grab a random response from the responce array
const randomReply = () => {
  response[Math.floor(Math.random() * response.length)];
};

//initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  port: process.env.PORT || 3000,
});

// Listens to incoming messages that contain "hello"
app.message("hello", async ({ message, say }) => {
  let sayThis = randomReply();
  // say() sends a message to the channel where the event was triggered
  await say(`${sayThis}`);
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
