/* "nome": "Gabriel",
  "cpf": "000152234",
  "data_nascimento": "01/11/1997",
  "telefone": "71999888",
  "email": "email@emarcom",
  "senha": "12345" */

import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import api from "../services/api";
import parseDateForServer from "../services/parseDateForServer";

export default function CadastrarCliente() {
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [data_nascimento, setData_nascimento] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [sendForm, setSendForm] = useState(true)

  function handleSubmit(event) {
    event.preventDefault()
    api
      .post("/contas", {
        nome,
        cpf,
        data_nascimento: parseDateForServer(data_nascimento),
        telefone,
        email,
        senha
      })
      .then((response) => console.log(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
    setNome('')
    setCpf('')
    setData_nascimento('')
    setTelefone('')
    setEmail('')
    setSenha('')
    setSendForm(false)
  }
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        required
        label="Nome"
        type="text"
        onChange={e => setNome(e.target.value)}
        value={nome}
      />
      <TextField
        required
        label="CPF"
        type="text"
        onChange={e => setCpf(e.target.value)}
        value={cpf}
      />
      <TextField
        required
        type="date"
        onChange={e => setData_nascimento(e.target.value)}
        value={data_nascimento}
      />
      <TextField
        required
        label="Telefone"
        type="text"
        onChange={e => setTelefone(e.target.value)}
        value={telefone}
      />
      <TextField
        required
        label="Email"
        type="email"
        onChange={e => setEmail(e.target.value)}
        value={email}
      />
      <TextField
        required
        label="Senha"
        type="password"
        onChange={e => setSenha(e.target.value)}
        value={senha}
      />
      <br />
      <Button disabled={!senha} variant="outlined" type="submit">Cadastrar</Button>
      <br />
      <Typography hidden={sendForm} color='secondary'>Cliente cadastrado com sucesso!</Typography>
    </Box>
  )
}