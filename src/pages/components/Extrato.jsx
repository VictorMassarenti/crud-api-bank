import { useState } from "react"
import { Box, Button, Divider, TextField, Typography } from "@mui/material"
import api from "../services/api"
import formatMoney from "../services/formatMoney"
import parseDateForServer from "../services/parseDateForServer"
import { parseJSON } from "date-fns"
import parseDateForClient from "../services/parseDateForClient"

export default function Extrato() {
  const [id, setId] = useState('')
  const [senha, setSenha] = useState('')
  const [respostaMensagem, setRespostaMensagem] = useState('')
  const [sendForm, setSendForm] = useState(true)
  const [existeErro, setExisteErro] = useState(false)
  const [usuarioValidado, setUsuarioValidado] = useState(false)
  const [data, setData] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    api
      .get(`/contas/extrato?numero_conta=${id}&senha=${senha}`)
      .then((response) => {
        setUsuarioValidado(true)
        setData(response.data)
      })
      .catch((err) => {
        setExisteErro(true)
        setRespostaMensagem(err.response.data.mensagem);
      });
    setId('')
    setSenha('')
    setSendForm(false)
  }
  

  return (
    <>
      <Box hidden={!usuarioValidado}>
        <Typography color='primary' variant="h5">Depósitos</Typography>
        {data.depositos?.map((deposito) => {
          return (
            <Box sx={{ my: 2 }} key={deposito.id}>
              <Typography>Data: {parseDateForClient(deposito.data)}</Typography>
              <Typography>Valor: R$ {formatMoney(deposito.valor)}</Typography>
              <Divider />
            </Box>
          )
        })}
        <Typography color='primary' variant="h5">Saques</Typography>
        {data.saques?.map((saques) => {
          return (
            <Box sx={{ my: 2 }} key={saques.id}>
              <Typography>Data: {parseDateForClient(saques.data)}</Typography>
              <Typography>Valor: R$ {formatMoney(saques.valor)}</Typography>
              <Divider />
            </Box>
          )
        })}
        <Typography color='primary' variant="h5">Transferências enviadas</Typography>
        {data.transferenciasEnviadas?.map((enviadas) => {
          return (
            <Box sx={{ my: 2 }} key={enviadas.id}>
              <Typography>Data: {parseDateForClient(enviadas.data)}</Typography>
              <Typography>Valor: R$ {formatMoney(enviadas.valor)}</Typography>
              <Divider />
            </Box>
          )
        })}
        <Typography color='primary' variant="h5">Transferências recebidas</Typography>
        {data.transferenciasRecebidas?.map((recebidas) => {
          return (
            <Box sx={{ my: 2 }} key={recebidas.id}>
              <Typography>Data: {parseDateForClient(recebidas.data)}</Typography>
              <Typography>Valor: R$ {formatMoney(recebidas.valor)}</Typography>
              <Divider />
            </Box>
          )
        })}
      </Box>
      <Box hidden={usuarioValidado}>
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
            label="Senha"
            type="password"
            onChange={e => setSenha(e.target.value)}
            value={senha}
          />
          <br />
          <Button disabled={!senha} variant="outlined" type="submit">Consultar</Button>
          <br />
          <Typography hidden={sendForm} color={existeErro ? 'error.main' : 'success.main'}>{respostaMensagem}</Typography>
        </Box >
      </Box>
    </>
  )
}