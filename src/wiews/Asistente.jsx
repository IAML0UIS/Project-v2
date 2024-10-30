import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './asistente.css'; // Asegúrate de que la ruta sea correcta

export const Asistente = () => {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');

  const API_KEY = 'AIzaSyDxVl7_p0simC2QX1o-f0VCpAnktjw6ZU0';
  const genAI = new GoogleGenerativeAI(API_KEY);

  const handleGenerate = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
    const prompt = inputText;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      setResponseText(response.text());
    } catch (error) {
      console.error('Error al generar contenido:', error);
      setResponseText('Error al generar contenido');
    }
  };

  return (
    <div className='contenedores'>
      <h1>Asistente</h1>
      <input
        type="text"
        id="inputText"
        placeholder="Escribe algo aquí..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={handleGenerate}>Generar</button>
      <p className="responseText">{responseText}</p>
    </div>
  );
};
