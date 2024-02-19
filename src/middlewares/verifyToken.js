const User = require("../models/userModels");
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers["token"];
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        res.status(401).send({ message: "Não autorizado token!" });
        return;
      } else {
        const userExist = await User.findOne({ _id: decoded.userid });
        if (userExist);
        {
          next();
        }
      }
    });
  } else {
    res.status(401).send({ message: "Não autorizado!" });
  }
}

/* `module.exports = verifyToken;` is exporting the `verifyToken` function so that it can be used in
other files. When another file imports this module, they will have access to the `verifyToken`
function. */
module.exports = verifyToken;
