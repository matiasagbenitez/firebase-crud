import React, { useState, useEffect } from 'react'
import { Container, Button, Card } from 'react-bootstrap';
import AgregarTarea from './AgregarTarea';
import ListadoTareas from './ListadoTareas';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import firebaseApp from '../credenciales'
import { getAuth, signOut } from 'firebase/auth'

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const Home = ({ correoUsuario }) => {

    const [arrayTareas, setArrayTareas] = useState(null);

    // Datos de prueba
    const fakeData = [
        { id: 1, descripcion: 'Tarea 1', url: 'https://picsum.photos/420' },
        { id: 2, descripcion: 'Tarea 2', url: 'https://picsum.photos/420' },
        { id: 3, descripcion: 'Tarea 3', url: 'https://picsum.photos/420' },
    ];

    // Función para buscar los datos en la base de datos o crearlos si no existen
    async function buscarDocumentoOrCrearDocumento(idDocumento) {

        const docRef = doc(firestore, `usuarios/${idDocumento}`);       // Referencia al documento   
        const docSnap = await getDoc(docRef);                           // Buscar el documento

        // Revisa si el documento existe
        if (docSnap.exists()) {
            const infoDoc = docSnap.data();
            return infoDoc.tareas;
        } else {
            await setDoc(docRef, {
                tareas: [...fakeData]
            });
            const docSnap = await getDoc(docRef);
            const infoDoc = docSnap.data();
            return infoDoc.tareas;
        }
    }

    useEffect(() => {
        async function obtenerTareas() {
            const tareas = await buscarDocumentoOrCrearDocumento(correoUsuario);
            setArrayTareas(tareas);
        }
        obtenerTareas();
    }, []);

    return (
        <Container>

            <div className="d-flex justify-content-between align-items-center my-3">
                <h1>
                    ¡Hola!
                </h1>
                <p className="mb-0">
                    ¡Estás logueado como <span className='fw-bolder'>{correoUsuario}</span>!
                </p>
                <Button variant="danger" onClick={() => signOut(auth)}>Cerrar sesión</Button>
            </div>

            <Card className='p-3 mb-3 bg-light'>
                <AgregarTarea arrayTareas={arrayTareas} setArrayTareas={setArrayTareas} correoUsuario={correoUsuario} />
            </Card>


            <Card className='p-3 bg-light'>
                {arrayTareas ? <ListadoTareas arrayTareas={arrayTareas} setArrayTareas={setArrayTareas} correoUsuario={correoUsuario} /> : <p>Cargando...</p>}
            </Card>

            {/* Footer */}
            <footer className="my-5 pt-5 text-muted text-center text-small">
                <p className="mb-1">© 2022 Paradigmas y Lenguajes de Programación</p>
                <ul className="list-inline">
                    <li className="list-inline-item"><a target="blank" href="https://github.com/matiasagbenitez/firebase-crud">Código fuente (GitHub)</a></li>
                </ul>
            </footer>

        </Container>
    );
};

export default Home