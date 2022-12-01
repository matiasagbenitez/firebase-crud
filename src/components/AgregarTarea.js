import React from 'react'
import { Container, Form, Col, Row, Button } from 'react-bootstrap';

import firebaseApp from '../credenciales';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
const firestore = getFirestore(firebaseApp);

const AgregarTarea = ({ arrayTareas, setArrayTareas, correoUsuario }) => {

  async function agregarTarea(e) {
    e.preventDefault();

    const descripcion = e.target.formDescripcion.value;

    // Crear nuevo array de tareas
    const nuevoArrayTareas = [...arrayTareas, {
      id: arrayTareas.length + 1,
      descripcion: descripcion,
      url: "https://picsum.photos/420"
    }];

    // Actualizar la base de datos
    const docRef = doc(firestore, `usuarios/${correoUsuario}`);
    await updateDoc(docRef, {
      tareas: [...nuevoArrayTareas]
    });

    // Actualizar el estado
    setArrayTareas(nuevoArrayTareas);

    // Limpiar el formulario
    e.target.formDescripcion.value = "";

  }

  return (

    <Container>
      <h2>Agregar tarea</h2>
      <Form onSubmit={agregarTarea}>
        <Row>
          <Col>
            <Form.Control type="text" placeholder="Descripción de la tarea..." id="formDescripcion" />
          </Col>
          <Col>
            <Form.Control type="file" placeholder="Añade tu archivo..." />
          </Col>
          <Col>
            <Button variant="success" type="submit">
              Agregar tarea
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}

export default AgregarTarea