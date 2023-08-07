import { useEffect, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import api from "../services/api";

export default function ListarTodosClientes() {
  const [data, setData] = useState()

  useEffect(() => {
    api
      .get("/contas?senha_banco=Cubos123Bank")
      .then((response) => setData(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  return (
    <Box>
      {data?.map((data) => (
        <Box key={data.id}>
          <Typography>Nome: {data.usuario.nome}</Typography>
          <Typography>CPF: {data.usuario.cpf}</Typography>
          <Typography>Data de nascimento: {data.usuario.data_nascimento}</Typography>
          <Typography>Telefone: {data.usuario.telefone}</Typography>
          <Typography>Email: {data.usuario.email}</Typography>
          <Typography>Senha: {data.usuario.senha}</Typography>
          <Typography>Saldo: {data.saldo}</Typography>
          <Divider />
        </Box>
      ))}
    </Box>
  )
}