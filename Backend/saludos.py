from flask import Flask, jsonify, request
from flask_cors import CORS
import pyttsx3
import threading
import pythoncom

app = Flask(__name__)
CORS(app)

# Lista de preguntas
preguntas = [
    "¡Hola! Bienvenido a tu asistente de salud. ¿Cómo te sientes hoy?",
    "¿Hiciste ejercicio hoy?",
    "¿Tomaste tus medicamentos hoy?",
    "¿Comiste frutas o verduras recientemente?",
    "¿Tuviste suficiente tiempo para descansar?",
    "¿Te has hidratado bien hoy?",
    "¿Tienes algún síntoma que te preocupe?",
    "Gracias por compartir. ¿Hay algo más que te gustaría comentar?"
]
indice_pregunta = 0

# Función para hablar en un hilo separado, inicializando `pyttsx3` en cada llamada
def hablar(texto):
    def reproducir():
        pythoncom.CoInitialize()
        engine_local = pyttsx3.init()
        engine_local.setProperty("rate", 150)
        engine_local.say(texto)
        engine_local.runAndWait()
        engine_local.stop()
        pythoncom.CoUninitialize()
    thread = threading.Thread(target=reproducir)
    thread.start()

# Ruta para obtener la pregunta actual y hacer que el asistente hable
@app.route("/obtener_pregunta", methods=["GET"])
def obtener_pregunta():
    global indice_pregunta
    if indice_pregunta == 0:
        hablar(preguntas[indice_pregunta])  # Bienvenida al iniciar
    elif indice_pregunta < len(preguntas):
        hablar(preguntas[indice_pregunta])  # Hablar la pregunta actual
    else:
        hablar("Gracias por compartir tu día. Recuerda cuidar de ti mismo. ¡Hasta luego!")  # Mensaje de despedida
    if indice_pregunta < len(preguntas):
        pregunta_actual = preguntas[indice_pregunta]
        return jsonify({"pregunta": pregunta_actual})
    else:
        return jsonify({"pregunta": None})  # No hay más preguntas

# Ruta para recibir la respuesta y avanzar a la siguiente pregunta
@app.route("/enviar_respuesta", methods=["POST"])
def enviar_respuesta():
    global indice_pregunta
    data = request.json
    respuesta_usuario = data.get("respuesta")
    
    if respuesta_usuario:
        indice_pregunta += 1
        return jsonify({"mensaje": "Respuesta recibida"})
    else:
        return jsonify({"error": "No se recibió una respuesta válida"}), 400

if __name__ == "__main__":
    app.run(debug=True)
