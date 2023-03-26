const { Router, response } = require("express");

const router = Router();

router.post("/", (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    if (req.session && req.session.user) {
      res.send("Already logged In!");
    } else {
      req.session.user = {
        username,
      };
      res.send(req.session);
    }
  } else {
    response.status(401).send("Authentication Failed");
  }
});

module.exports = router;
