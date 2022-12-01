import React, { Fragment } from 'react'
import { Button, Row, Stack, Container, Col } from 'react-bootstrap'

const ListadoTareas = ({ arrayTareas }) => {
    return (
        <Container>
            <Stack>
                {arrayTareas.map((tarea) => {
                    return (
                        <Fragment>
                            <Row>
                                <Col>
                                    {tarea.descripcion}
                                </Col>

                                <Col>
                                    <Button variant="secondary">Ver archivo</Button>
                                </Col>

                                <Col>
                                    <Button variant="danger">Eliminar</Button>
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