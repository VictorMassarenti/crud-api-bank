import { Button, ButtonGroup, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        }}
        >
            <Typography variant="h1" color='primary' gutterBottom> Bankademy </Typography>
            <Link to={'/gerencia'}><Button>Gerência</Button></Link>
            <Link to={'/cliente'}><Button>Cliente</Button></Link>
        </Container>
    );
}