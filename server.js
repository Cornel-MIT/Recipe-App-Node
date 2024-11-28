import "dotenv/config"
import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(express.json())

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connection Successful")) 
  .catch((err) => console.error(err));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)
)  