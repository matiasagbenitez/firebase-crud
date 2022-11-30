import React from 'react'
import { Container, Button } from 'react-bootstrap';

import firebaseApp from '../credenciales'
import { getAuth, signOut } from 'firebase/auth'
const auth = getAuth(firebaseApp);

const Home = () => {
  return (
    <Container>
        <h1>Home</h1>
        <p>¡Estás logueado!</p>

        <Button variant="danger" onClick={() => signOut(auth)}>Cerrar sesión</Button>

    </Container>
  )
}

export default Home