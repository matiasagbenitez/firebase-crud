import React, { Fragment } from 'react'
import { Button, Row, Stack, Container, Col, Card } from 'react-bootstrap'

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
            <h3>Listado de tareas</h3>
            <Stack>

                {arrayTareas.map((tarea) => {
                    return (
                        <Fragment>
                            <Card className='p-3 my-2'>
                                <Row className='align-items-center'>
                                    <Col>
                                        {tarea.descripcion}
                                    </Col>

                                    <Col className='d-flex justify-content-center'>
                                        <a href={tarea.url} target="blank">
                                            <Button variant="secondary">Ver archivo</Button>
                                        </a>
                                    </Col>

                                    <Col className='d-flex justify-content-center'>
                                        <Button variant="danger" onClick={() => eliminarTarea(tarea.id)}>Eliminar tarea</Button>
                                    </Col>
                                </Row>
                            </Card>
                        </Fragment>
                    );
                })}


            </Stack>
        </Container>
    )
}

export default ListadoTareas