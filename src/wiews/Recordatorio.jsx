import React from 'react';
import { Col, CardTitle, Card, CardHeader, CardBody, FormGroup, Form, Row, Input, Button } from "reactstrap";
import { useForm } from '../variables/useForm';
import axios from 'axios';
import './asistente.css'; // Asegúrate de que la ruta sea correcta

const recordatorioM = {
  fecha: '',
  hora: '',
  descripcion: '',
  medicamento: '', // Nueva propiedad para almacenar el medicamento seleccionado
  estado: 'pendiente' // Estado por defecto
};

export const Recordatorio = () => {
  const {
    fecha,
    hora,
    descripcion,
    medicamento,
    onInputChange,
    resetForm // Añadido para reiniciar el formulario
  } = useForm(recordatorioM);

  const onSubmitRecordatorio = async (e) => {
    e.preventDefault();

    // Crear el objeto del recordatorio
    const nuevoRecordatorio = {
      fecha,
      hora,
      descripcion: descripcion || (medicamento ? `Debes tomar el medicamento ${medicamento} por tu salud.` : ''),
      medicamento, // Incluye el medicamento en el recordatorio si existe
      estado: 'pendiente'
    };

    // Verificación: si no hay descripción ni medicamento, no se permite continuar
    if (!descripcion && !medicamento) {
      alert("Por favor, agrega una descripción o selecciona un medicamento.");
      return;
    }

    try {
      // Hacer la solicitud POST a la API
      const response = await axios.post('http://localhost:5000/api/recordatorios', nuevoRecordatorio);
      
      console.log('Recordatorio agregado:', response.data);

      // Mensaje de voz basado en la selección del medicamento o la descripción
      const mensajeVoz = descripcion
        ? descripcion
        : `Debes tomar el medicamento ${medicamento} por tu salud.`;

      // Reproducir el mensaje de voz
      const speech = new SpeechSynthesisUtterance(mensajeVoz);
      window.speechSynthesis.speak(speech);

      alert(mensajeVoz); // Notificación al usuario en pantalla
      resetForm(); // Limpiar el formulario después de enviar
    } catch (error) {
      console.error('Error al agregar el recordatorio:', error);
      alert("Error al agregar el recordatorio. Por favor, inténtalo de nuevo."); // Mensaje de error
    }
  };

  return (
    <div className='contendiente'>
      <Col md="12">
        <Card className="card-user">
          <CardHeader>
            <CardTitle tag="h5">Agregar Recordatorio</CardTitle>
          </CardHeader>
          <CardBody>
            <Form onSubmit={onSubmitRecordatorio}>
              <Row>
                <Col className="pr-1" md="6">
                  <FormGroup>
                    <label>Fecha</label>
                    <Input
                      value={fecha}
                      name="fecha"
                      type="date"
                      onChange={onInputChange}
                    />
                  </FormGroup>
                </Col>

                <Col className="pl-1" md="6">
                  <FormGroup>
                    <label>Hora</label>
                    <Input
                      value={hora}
                      name="hora"
                      type="time"
                      onChange={onInputChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              
              <Row>
                <Col md="12">
                  <FormGroup>
                    <label>Descripción</label>
                    <Input
                      type="textarea"
                      value={descripcion}
                      name='descripcion'
                      placeholder="Escribe una descripción o selecciona un medicamento"
                      onChange={onInputChange}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md="12">
                  <FormGroup>
                    <label>Seleccionar Medicamento</label>
                    <Input
                      type="select"
                      name="medicamento"
                      value={medicamento}
                      onChange={onInputChange}
                    >
                      <option value="">-- Selecciona un medicamento --</option>
                      <option value="Acetaminofén">Acetaminofén</option>
                      <option value="Ibuprofeno">Ibuprofeno</option>
                      <option value="Aspirina">Aspirina</option>
                      <option value="Acetaminofén">Paracetamol</option>
                      <option value="Ibuprofeno">Naproxeno</option>
                      <option value="Aspirina">Amoxicilina</option>
                      <option value="Acetaminofén">Diclofenaco</option>
                      <option value="Ibuprofeno">Loratadina</option>
                      <option value="Aspirina">Omeprazol</option>
                      <option value="Aspirina">Clonazepan</option>
                      <option value="Acetaminofén">Codeina</option>
                      <option value="Ibuprofeno">Furosemida</option>
                      <option value="Aspirina">Tramadol</option>
                      

                      {/* Agrega más medicamentos según sea necesario */}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              
              <Row>
                <div className="update ml-auto mr-auto">
                  <Button
                    className="custom-button"
                    color="primary"
                    type="submit"
                  >
                    Agregar Recordatorio
                  </Button>
                </div>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
};
