const express = require('express')
const cors = require ('cors')
const axios = require('axios')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express()
app.use(cors())

app.get('/', async (req, res) => {
  try {
    const data = await prisma.data.findMany()
    res.json(data)
  } catch (e) {
    console.error("Error retrieving data: ", e)
    res.status(500).json({ error: "Error retrieving data" })
  }
})

app.listen(3000, async () => {
  console.log("Server started on port 3000")

  try {
    const result = await axios.get("https://api.wazirx.com/api/v2/tickers")
    const allData = Object.values(result.data)
    const data = allData.slice(0, 10)
await prisma.data.deleteMany()
    await Promise.all(
      data.map(d => 
        prisma.data.create({
          data: {
            name: d.name,
            last: d.last,
            buy: d.buy,
            sell: d.sell,
            volume: d.volume,
            base_unit: d.base_unit
          }
        })
      )
    )
    console.log("Data saved successfully")
  } catch (e) {
    console.error("Error while saving the data in db:", e)
  }
})
