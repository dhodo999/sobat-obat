import express from "express"

const app = express()

app.use(express.json())

app.get("/api/hello", (_, res) => {
  res.json({ message: "Hello from Express on Vercel 🚀" })
})

app.listen(3000, () => console.log("http://localhost:3000"))