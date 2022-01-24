const express = require("express");
const router = express();
const PORT = 3000;
router.listen(PORT, () => console.log(`listening on port ${PORT}`));

module.exports = {
  router,
};
