require("dotenv").config()

const app = require("./app")
const api = process.env.SUPABASE_API_KEY
const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`)
})