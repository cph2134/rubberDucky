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

//random responses
const responses = [
  "That sounds hard",
  "Did you read your error message?",
  "When I'm stuck, I like to take a break and drink a glass of water",
  "Why don't you try explaining it to me very slowly?",
];
//grab a random response from the responce array
const randomReply = () =>
  responses[Math.floor(Math.random() * responses.length)];

// Listens for incoming messages with any content
app.message(/.*/, async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  let response = await randomReply();
  await say(`${response}`);
});

//s
(async () => {
  //start your app
  const port = 3000;
  await app.start(process.env.PORT || port);
  console.log(`Bolt app is running on port ${port}`);
})();
