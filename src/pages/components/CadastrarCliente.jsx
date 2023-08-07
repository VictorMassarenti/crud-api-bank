/* "nome": "Gabriel",
  "cpf": "000152234",
  "data_nascimento": "01/11/1997",
  "telefone": "71999888",
  "email": "email@emarcom",
  "senha": "12345" */

import { Box, TextField } from "@mui/material";

export default function CadastrarCliente() {

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
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="Nome"
          defaultValue="Hello World"
        />
      </div>
    </Box>
  )
}