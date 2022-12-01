import React, { useState, useEffect } from 'react'
import { Container, Button } from 'react-bootstrap';
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

            <h1>Home</h1>
            <p>¡Estás logueado!</p>
            <Button variant="danger" onClick={() => signOut(auth)}>Cerrar sesión</Button>

            <hr />

            <AgregarTarea arrayTareas={arrayTareas} setArrayTareas={setArrayTareas} correoUsuario={correoUsuario} />
            {arrayTareas ? <ListadoTareas arrayTareas={arrayTareas} setArrayTareas={setArrayTareas} correoUsuario={correoUsuario} /> : null}

        </Container>
    );
};

export default Home