const { errorHandler } = require("./error.js")
const jwt = require("jsonwebtoken")

 const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token
console.log(req)
  if (!token) {
    return next(errorHandler(401, "Unauthorized"))
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized"))
    }

    req.user = user

    next()
  })
}

module.exports = {verifyToken};