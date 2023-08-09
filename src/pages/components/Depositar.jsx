import { Box, Button, TextField, Typography } from "@mui/material";
import api from "../services/api";
import { useState } from "react";

export default function Depositar() {
  const [valor, setValor] = useState('')
  const [id, setId] = useState('')
  const [sendForm, setSendForm] = useState(true)
  const [mensagemErro, setMensagemErro] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setMensagemErro('')
    api
      .post("/transacoes/depositar", {
        numero_conta: id,
        valor: valor * 100
      })
      .then((response) => console.log(response.data))
      .catch((err) => {
        setMensagemErro(err.response.data.mensagem);
      })
    setValor('')
    setId('')
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
        label="Valor de depósito"
        type="number"
        onChange={e => setValor(e.target.value)}
        value={valor}
      />
      <br />
      <Button disabled={!valor} variant="outlined" type="submit">Depositar</Button>
      <br />
      {mensagemErro ?
        <Typography hidden={sendForm} color='error.main'>{mensagemErro}</Typography> :
        <Typography hidden={sendForm} color='success.main'>Depósito realizado com sucesso!</Typography>
      }
    </Box>
  )
}