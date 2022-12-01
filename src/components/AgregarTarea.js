import React from 'react'
import { Container, Form, Col, Row, Button } from 'react-bootstrap';

import firebaseApp from '../credenciales';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const AgregarTarea = ({ arrayTareas, setArrayTareas, correoUsuario }) => {

  let urlDescarga;

  async function agregarTarea(e) {
    e.preventDefault();

    const descripcion = e.target.formDescripcion.value;

    // Crear nuevo array de tareas
    const nuevoArrayTareas = [...arrayTareas, {
      id: arrayTareas.length + 1,
      descripcion: descripcion,
      url: urlDescarga
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

  async function fileHandler(e) {
    e.preventDefault();

    // Obtener el archivo
    const file = e.target.files[0];

    // Crear referencia al archivo
    const storageRef = ref(storage, `documentos/${file.name}`);

    // Subir el archivo
    await uploadBytes(storageRef, file);

    // Obtener la URL del archivo
    urlDescarga = await getDownloadURL(storageRef);
    
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
            <Form.Control type="file" placeholder="Añade tu archivo..." onChange={fileHandler} />
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