import React, { Fragment } from 'react'
import { Button, Row, Stack, Container, Col } from 'react-bootstrap'

import firebaseApp from '../credenciales';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
const firestore = getFirestore(firebaseApp);

const ListadoTareas = ({ arrayTareas, correoUsuario, setArrayTareas }) => {

    async function eliminarTarea(idTarea) {

        // Nuevo array de tareas sin la tarea eliminada
        const nuevoArrayTareas = arrayTareas.filter(tarea => tarea.id !== idTarea);

        // Actualizar el array de tareas en la base de datos
        const docRef = doc(firestore, `usuarios/${correoUsuario}`);
        await updateDoc(docRef, {
            // tareas: nuevoArrayTareas
            tareas: [...nuevoArrayTareas]
        });

        // Actualizar el array de tareas en el estado
        setArrayTareas(nuevoArrayTareas);

    }

    return (
        <Container>
            <h2>Listado de tareas</h2>
            <Stack>
                {arrayTareas.map((tarea) => {
                    return (
                        <Fragment>
                            <Row>
                                <Col>
                                    {tarea.descripcion}
                                </Col>

                                <Col>
                                    <a href={tarea.url}>
                                        <Button variant="secondary">Ver archivo</Button>
                                    </a>
                                </Col>

                                <Col>
                                    <Button variant="danger" onClick={() => eliminarTarea(tarea.id)}>Eliminar</Button>
                                </Col>
                            </Row>
                            <hr />
                        </Fragment>
                    );
                })}
            </Stack>
        </Container>
    )
}

export default ListadoTareas