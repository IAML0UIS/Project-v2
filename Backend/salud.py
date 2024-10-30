from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Configuración de la base de datos
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'software_vitalsave'
}

# Ruta para agregar datos de salud
@app.route('/api/salud', methods=['POST'])
def agregar_salud():
    try:
        data = request.json
        presion_arterial = data['presion_arterial']
        glucosa = data['glucosa']
        actividad_fisica = data['actividad_fisica']

        # Conectar a la base de datos
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Insertar datos en la tabla salud
        query = "INSERT INTO salud (presion_arterial, glucosa, actividad_fisica) VALUES (%s, %s, %s)"
        cursor.execute(query, (presion_arterial, glucosa, actividad_fisica))
        conn.commit()

        # Cerrar conexión
        cursor.close()
        conn.close()

        return jsonify({'message': 'Datos de salud agregados exitosamente.'}), 201

    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)


