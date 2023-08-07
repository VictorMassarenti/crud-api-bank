import { Box, Container, Paper, Tab, Tabs, Typography } from "@mui/material";
import * as React from 'react';
import ListarTodosClientes from "./components/ListarTodosClientes";
import CadastrarCliente from "./components/CadastrarCliente";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Gerencia() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100vh',
      marginTop: '20px'
    }}>
      <Typography variant="h1" color='primary' gutterBottom> Painel Gerencial </Typography>
      <Paper elevation={6} sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6E8898',
        width: '450px',
        borderRadius: '10px',
      }}>
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'center',
          my: '20px',
          }}>
        <Typography variant="h4" color='primary' gutterBottom> Clientes </Typography>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs textColor="inherit" indicatorColor="primary" value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Listar todos" {...a11yProps(0)} />
              <Tab label="Cadastrar" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <ListarTodosClientes />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <CadastrarCliente />
          </CustomTabPanel>
        </Box>
      </Paper>
    </Container>
  );
}