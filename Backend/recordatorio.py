from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import pyttsx3
import threading
import time
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Configura la conexión a la base de datos
def get_db_connection():
    return mysql.connector.connect(
        host='localhost',  
        user='root',  
        password='',  
        database='software_vitalsave' 
    )

# Función para emitir el recordatorio
def emitir_recordatorio(descripcion):
    engine = pyttsx3.init()
    engine.say(f"Recordatorio: {descripcion}")
    engine.runAndWait()

# Función para verificar recordatorios pendientes
def verificar_recordatorios():
    while True:
        ahora = datetime.now()
        hora_actual = ahora.strftime("%H:%M")
        fecha_actual = ahora.strftime("%Y-%m-%d")

        # Conectar a la base de datos
        conn = get_db_connection()
        cursor = conn.cursor()

        # Obtener recordatorios que coincidan con la fecha y hora actuales
        cursor.execute(
            "SELECT descripcion FROM recordatorio WHERE fecha = %s AND hora = %s AND estado = 'pendiente'",
            (fecha_actual, hora_actual)
        )
        recordatorios = cursor.fetchall()

        for recordatorio in recordatorios:
            emitir_recordatorio(recordatorio[0])
            # Aquí podrías actualizar el estado del recordatorio a 'emitido' si lo deseas
            cursor.execute(
                "UPDATE recordatorio SET estado = 'emitido' WHERE descripcion = %s",
                (recordatorio[0],)
            )
            conn.commit()

        cursor.close()
        conn.close()

        # Esperar un minuto antes de volver a comprobar
        time.sleep(60)

@app.route('/api/recordatorios', methods=['POST'])
def agregar_recordatorio():
    data = request.json  # Obtiene los datos de la solicitud

    # Obtiene los campos necesarios
    fecha = data.get('fecha')
    hora = data.get('hora')
    descripcion = data.get('descripcion')
    estado = data.get('estado', 'pendiente')  # Valor por defecto

    # Conectar a la base de datos y agregar el recordatorio
    conn = get_db_connection()
    cursor = conn.cursor()

    # Inserta el recordatorio en la base de datos
    cursor.execute(
        "INSERT INTO recordatorio (fecha, hora, descripcion, estado) VALUES (%s, %s, %s, %s)",
        (fecha, hora, descripcion, estado)
    )
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"message": "Recordatorio agregado con éxito"}), 201

if __name__ == '__main__':
    # Iniciar el hilo de verificación de recordatorios
    threading.Thread(target=verificar_recordatorios, daemon=True).start()
    app.run(debug=True)
