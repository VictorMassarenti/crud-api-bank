import { Box, Button, TextField, Typography } from "@mui/material";
import api from "../services/api";
import { useState } from "react";

export default function Sacar() {
  const [valor, setValor] = useState('')
  const [id, setId] = useState('')
  const [senha, setSenha] = useState('')
  const [sendForm, setSendForm] = useState(true)
  const [existeErro, setExisteErro] = useState(false)
  const [respostaMensagem, setRespostaMensagem] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    api
      .post("/transacoes/sacar", {
        numero_conta: id,
        valor: valor * 100,
        senha,
      })
      .then((response) => setRespostaMensagem(response.data.mensagem))
      .catch((err) => {
        setExisteErro(true)
        setRespostaMensagem(err.response.data.mensagem);
      })
    setValor('')
    setId('')
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
        label="Número da conta (ID)"
        type="text"
        onChange={e => setId(e.target.value)}
        value={id}
      />
      <TextField
        required
        label="Valor de saque"
        type="number"
        onChange={e => setValor(e.target.value)}
        value={valor}
      />
      <TextField
        required
        label="Senha"
        type="password"
        onChange={e => setSenha(e.target.value)}
        value={senha}
      />
      <br />
      <Button disabled={!senha} variant="outlined" type="submit">Sacar</Button>
      <br />
        <Typography hidden={sendForm} color={existeErro ? 'error.main' : 'success.main'}>{respostaMensagem}</Typography>
    </Box>
  )
}