import * as React from 'react';
import { Box, Container, Paper, Tab, Tabs, Typography } from "@mui/material";
import Depositar from './components/Depositar';

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

export default function Cliente() {
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
      <Typography variant="h1" color='primary' gutterBottom> Painel de serviços </Typography>
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
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs textColor="inherit" indicatorColor="primary" value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Depositar" {...a11yProps(0)} />
              <Tab label="Sacar" {...a11yProps(1)} />
              <Tab label="Transferir" {...a11yProps(2)} />
              <Tab label="Extrato" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Depositar />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Sacar
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            Transferir
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            Extrato
          </CustomTabPanel>
        </Box>
      </Paper>
    </Container>
  );
}