import React, { useState } from 'react'
import { Stack, Container, Form, Button } from 'react-bootstrap';

// Importamos servicios y funciones de Firebase
import firebaseApp from '../credenciales';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const Logueo = () => {

    const [estaRegistrandose, setEstaRegistrandose] = useState(false);

    async function submitHandler(e) {
        e.preventDefault();

        const email = e.target.formBasicEmail.value;
        const password = e.target.formBasicPassword.value;

        if (estaRegistrandose) {
            try {
                const usuario = await createUserWithEmailAndPassword(auth, email, password);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const usuario = await signInWithEmailAndPassword(auth, email, password);
            } catch (error) {
                console.log(error);
            }
        }

    }

    return (

        <Container>
            <Stack gap={3}>

                <h1>{estaRegistrandose ? 'Registrarse' : 'Iniciar sesión'}</h1>

                <Form onSubmit={ submitHandler }>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Button variant="secondary" type="submit" style={{ width: "300px"}}>
                        {estaRegistrandose ? 'Registrarse' : 'Ingresar'}
                    </Button>
                </Form>

                <Button variant="warning" onClick={() => setEstaRegistrandose(!estaRegistrandose)} style={{ width: "300px"}}>
                    {estaRegistrandose ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
                </Button>
                
                <Button variant="success" type="submit" style={{ width: "300px"}} onClick={() => signInWithRedirect(auth, googleProvider)}>
                    Acceder con Google
                </Button>

            </Stack>
        </Container>

    )
}

export default Logueo