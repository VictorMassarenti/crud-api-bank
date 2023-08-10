import { Box, Button, TextField, Typography } from "@mui/material";
import api from "../services/api";
import { useState } from "react";

export default function Transferir() {
  const [valor, setValor] = useState('')
  const [idOrigem, setIdOrigem] = useState('')
  const [idDestino, setIdDestino] = useState('')
  const [senha, setSenha] = useState('')
  const [sendForm, setSendForm] = useState(true)
  const [existeErro, setExisteErro] = useState(false)
  const [respostaMensagem, setRespostaMensagem] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    api
      .post("/transacoes/transferir", {
        numero_conta_origem: idOrigem,
        numero_conta_destino: idDestino,
        valor: valor * 100,
        senha,
      })
      .then((response) => setRespostaMensagem(response.data.mensagem))
      .catch((err) => {
        setExisteErro(true)
        setRespostaMensagem(err.response.data.mensagem);
      })
    setValor('')
    setIdDestino('')
    setIdOrigem('')
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
        label="Conta de origem (ID)"
        type="text"
        onChange={e => setIdOrigem(e.target.value)}
        value={idOrigem}
      />
      <TextField
        required
        label="Conta de destino (ID)"
        type="text"
        onChange={e => setIdDestino(e.target.value)}
        value={idDestino}
      />
      <TextField
        required
        label="Valor da transferência"
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
      <Button disabled={!senha} variant="outlined" type="submit">Transferir</Button>
      <br />
        <Typography hidden={sendForm} color={existeErro ? 'error.main' : 'success.main'}>{respostaMensagem}</Typography>
    </Box>
  )
}