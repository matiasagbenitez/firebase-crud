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

                <h1 className='text-center mt-3'>{estaRegistrandose ? 'Registrarse' : 'Iniciar sesión'}</h1>

                <div className='d-grid justify-content-center'>
                    <Form onSubmit={submitHandler} style={{ width: "600px" }}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Correo electrónico</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>

                        <div className='d-flex justify-content-center mb-2'>
                            <Button variant="secondary" type="submit" style={{ width: "400px" }}>
                                {estaRegistrandose ? 'Registrarse' : 'Ingresar'}
                            </Button>
                        </div>
                    </Form>

                    <div className='d-grid justify-content-center gap-2'>
                        <Button variant="dark" onClick={() => setEstaRegistrandose(!estaRegistrandose)} style={{ width: "400px" }}>
                            {estaRegistrandose ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
                        </Button>

                        <Button variant="success" type="submit" style={{ width: "400px" }} onClick={() => signInWithRedirect(auth, googleProvider)}>
                            Acceder con Google
                        </Button>
                    </div>
                </div>

                {/* Footer */}
                <footer className="my-5 pt-5 text-muted text-center text-small">
                    <p className="mb-1">© 2022 Paradigmas y Lenguajes de Programación</p>
                    <ul className="list-inline">
                        <li className="list-inline-item"><a target="blank" href="https://github.com/matiasagbenitez/firebase-crud">Código fuente (GitHub)</a></li>
                    </ul>
                </footer>

            </Stack>
        </Container>

    )
}

export default Logueo