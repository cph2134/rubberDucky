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

app.message("hello", async ({ message, say }) => {
  const sayThis = randomReply();
  console.log(sayThis);
  try {
    await say(sayThis);
  } catch (err) {
    console.log(err);
  }
});

(async () => {
  //start your app
  await app.start();
  console.log(`Bolt app is running`);
})();
