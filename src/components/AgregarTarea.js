import React from 'react'
import { Container, Form, Col, Row, Button } from 'react-bootstrap';

import firebaseApp from '../credenciales';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const AgregarTarea = ({ arrayTareas, setArrayTareas, correoUsuario }) => {

  let urlDescarga;

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
    
    console.log(urlDescarga);
  }

  async function agregarTarea(e) {
    e.preventDefault();

    const descripcion = e.target.formDescripcion.value;

    // Crear nuevo array de tareas
    const nuevoArrayTareas = [...arrayTareas, {
      id: arrayTareas.length + 1,
      descripcion: descripcion,
      // url: urlDescarga ? urlDescarga : 'https://i.postimg.cc/5yrQdq9s/Captura-de-pantalla-de-2022-11-30-23-24-42.png'
      // Esperar a que urlDescarga tenga un valor
      url: await urlDescarga ? urlDescarga : 'https://i.postimg.cc/5yrQdq9s/Captura-de-pantalla-de-2022-11-30-23-24-42.png'
    }];

    console.log(nuevoArrayTareas);

    // Actualizar la base de datos
    const docRef = doc(firestore, `usuarios/${correoUsuario}`);
    await updateDoc(docRef, {
      // tareas: [...nuevoArrayTareas]
      tareas: nuevoArrayTareas
    });

    // Actualizar el estado
    setArrayTareas(nuevoArrayTareas);

    // Limpiar el formulario
    e.target.formDescripcion.value = "";

    // Limpiar el input de archivo
    e.target.formArchivo.value = "";
  }

return (
  
  <Container>
      <h3>Agregar tarea</h3>
      <Form onSubmit={agregarTarea}>
        <Row className='d-flex justify-content-between'>
          <Col>
            <Form.Control type="text" placeholder="Descripción de la tarea..." id="formDescripcion" />
          </Col>
          <Col>
            <Form.Control type="file" placeholder="Añade tu archivo..." onChange={fileHandler} id="formArchivo" />
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