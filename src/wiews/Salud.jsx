import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Salud.css'; // Importar el archivo CSS
import { useSpeechSynthesis } from 'react-speech-kit'; // Importar la biblioteca de síntesis de voz

export const Salud = () => {
  const { speak } = useSpeechSynthesis(); // Inicializar síntesis de voz
  const [pregunta, setPregunta] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [indicePregunta, setIndicePregunta] = useState(0);
  const [respuestaAsistente, setRespuestaAsistente] = useState(''); // Estado para respuesta del asistente
  
  // Estilos de botones para cada pregunta
  const botonesPorPregunta = [
    [{ text: 'Bien, gracias!', color: 'lightgreen' }, { text: 'No muy bien', color: 'lightcoral' }],
    [{ text: 'Sí, hice ejercicio', color: 'lightgreen' }, { text: 'No, no pude', color: 'lightcoral' }],
    [{ text: 'Sí, tomé mis medicamentos', color: 'lightgreen' }, { text: 'Olvidé tomarlos', color: 'lightcoral' }],
    [{ text: 'Sí, comí frutas', color: 'lightgreen' }, { text: 'No comí', color: 'lightgray' }],
    [{ text: 'Sí, descansé suficiente', color: 'lightgreen' }, { text: 'No descansé', color: 'lightcoral' }],
    [{ text: 'Sí, me hidraté', color: 'lightgreen' }, { text: 'No, me olvidé', color: 'lightgray' }],
    [{ text: 'Sí, me preocupa algo', color: 'lightgreen' }, { text: 'No, estoy bien', color: 'lightcoral' }],
    [{ text: 'Todo está bien', color: 'lightgreen' }, { text: 'Nada más', color: 'lightcoral' }]
  ];

  useEffect(() => {
    // Obtener la primera pregunta al cargar el componente
    const fetchPregunta = async () => {
      try {
        const response = await axios.get('http://localhost:5000/obtener_pregunta');
        setPregunta(response.data.pregunta);
      } catch (error) {
        console.error('Error al obtener la pregunta:', error);
      }
    };
    fetchPregunta();
  }, []);

  const enviarRespuesta = async (respuesta) => {
    try {
      await axios.post('http://localhost:5000/enviar_respuesta', { respuesta });
      setRespuesta(respuesta);
      setIndicePregunta(indicePregunta + 1);

      // Generar respuesta del asistente según la respuesta del usuario
      let respuestaAsistente = '';
      if (respuesta.includes('Bien')) {
        respuestaAsistente = '¡Me alegra saber que estás bien! ¿Hay algo más que quieras compartir?';
      } else if (respuesta.includes('No muy bien')) {
        respuestaAsistente = 'Lamento escuchar eso. ¿Qué te preocupa?';
      } else if (respuesta.includes('hice ejercicio')) {
        respuestaAsistente = '¡Genial! El ejercicio es muy importante para la salud.';
      } else if (respuesta.includes('no pude')) {
        respuestaAsistente = 'No te preocupes, mañana es un nuevo día para intentarlo.';
      } else if (respuesta.includes('tomé mis medicamentos')) {
        respuestaAsistente = '¡Perfecto! Es importante seguir la medicación.';
      } else if (respuesta.includes('Olvidé tomarlos')) {
        respuestaAsistente = 'Recuerda que siempre es bueno tener un recordatorio.';
      } else if (respuesta.includes('comí frutas')) {
        respuestaAsistente = 'Las frutas son muy saludables, ¡sigue así!';
      } else if (respuesta.includes('No comí')) {
        respuestaAsistente = 'Intenta incluir más frutas en tu dieta diaria.';
      } else if (respuesta.includes('descansé suficiente')) {
        respuestaAsistente = 'El descanso es fundamental para tu bienestar.';
      } else if (respuesta.includes('No descansé')) {
        respuestaAsistente = 'Recuerda que descansar es tan importante como trabajar.';
      } else if (respuesta.includes('me hidraté')) {
        respuestaAsistente = 'La hidratación es clave para mantenerte saludable.';
      } else if (respuesta.includes('me olvidé')) {
        respuestaAsistente = 'Es fácil olvidarlo, ¡pero siempre es bueno beber agua!';
      } else if (respuesta.includes('me preocupa')) {
        respuestaAsistente = 'Cuéntame más sobre lo que te preocupa.';
      } else if (respuesta.includes('estoy bien')) {
        respuestaAsistente = '¡Eso es genial! Estoy aquí si necesitas algo.';
      } else if (respuesta.includes('Todo está bien')) {
        respuestaAsistente = 'Me alegra saber que todo está en orden.';
      } else {
        respuestaAsistente = 'Gracias por tu respuesta. ¿Hay algo más que quieras compartir?';
      }
      
      setRespuestaAsistente(respuestaAsistente);
      speak({ text: respuestaAsistente }); // El asistente habla la respuesta
      
      // Obtener la siguiente pregunta
      const response = await axios.get('http://localhost:5000/obtener_pregunta');
      setPregunta(response.data.pregunta);
    } catch (error) {
      console.error('Error al enviar respuesta:', error);
    }
  };

  const botones = botonesPorPregunta[indicePregunta] || [];

  return (
    <div className="contenedor">
      <div className="contiene">
        <h5>{pregunta}</h5>
        <div className="button-container">
          {botones.map((boton, index) => (
            <button 
              key={index}
              style={{ backgroundColor: boton.color }} 
              onClick={() => enviarRespuesta(boton.text)}
              className="response-button"
            >
              {boton.text}
            </button>
          ))}
        </div>
        {respuestaAsistente && <div className="response">{respuestaAsistente}</div>}
      </div>
    </div>
  );
};
