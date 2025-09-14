const { createClient } = require('@supabase/supabase-js')


const userController = async (req, res) => {
  let { firstName, surname, address, addressNumber, zipCode, username, password, additionalInfo } = req.body.newUser
  console.log(req.body)
  console.log(username)
  const supabaseUrl = 'https://jakxpiuwyghcgbhtzdku.supabase.co'
  const supabaseKey = process.env.SUPABASE_KEY
  const supabase = await createClient(supabaseUrl, supabaseKey)
  let newUser = {
    first_name: firstName,
    surname: surname,
    address: address,
    address_number: addressNumber,
    zip_code: zipCode,
    additional_info: additionalInfo,
    username: username,
    password: password
  }
  console.log(`Inserindo o usuário:`)
  console.log(newUser)
  try {
    console.log("Procurando usuarios existentes")
    const { data, error } = await supabase
      .from('users')
      .select(`username`)
      .eq('username', username)
    console.log("Usuário encontrado:")
    console.log(data)

    if (data.length >= 1) {
      res.send("Esse usuário já existe")
    } else if (data.length == 0) {
      const { data, error } = await supabase.from('users').insert(newUser)
      if (error) {
        res.send(error)
      }
      res.send(`Novo usuário ${firstName} criado!`)
    }
  } catch (err) {
    console.log(err)
  }

}


module.exports = userController