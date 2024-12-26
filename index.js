const express = require("express");
const mongoose  = require("mongoose");
const dotenv  = require("dotenv");
const cors = require('cors');
const cookieParser  = require("cookie-parser")
const authRoutes  = require("./routes/auth.route.js")
const userRoutes  = require("./routes/user.route.js")
const postRoutes  = require("./routes/post.route.js")
const commentRoutes  = require("./routes/comment.route.js")

dotenv.config()

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database is connected")
  })
  .catch((err) => {
    console.log(err)
  })

const app = express()


const corsOptions = {
  origin:"https://daily-updates-nine.vercel.app"|| "http://localhost:5173", 
  credentials: true, 
};
app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser())




app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/post", postRoutes)
app.use("/api/comment", commentRoutes)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500

  const message = err.message || "Internal Server Error"

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})

const port=4000

app.listen(port, () => {
    console.log(`Server is running on port ${port} `)
  })
