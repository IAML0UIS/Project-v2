from flask import Flask, request, jsonify
import cv2
import numpy as np
import pytesseract
import base64
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/detectar_medicamento', methods=['POST'])
def detectar_medicamento_endpoint():
    data = request.json
    imagen_base64 = data['imagen']
    
    try:
        # Procesar imagen
        imagen_procesada = procesar_imagen(imagen_base64)
        if "acetaminofen" in imagen_procesada.lower():
            return jsonify({'mensaje': 'Medicamento detectado: acetaminofén'}), 200
        else:
            return jsonify({'mensaje': 'Medicamento no detectado.'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def procesar_imagen(imagen_base64):
    # Decodificar la imagen
    img_data = base64.b64decode(imagen_base64.split(',')[1])
    np_arr = np.frombuffer(img_data, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    # Aplicar pytesseract para el reconocimiento de texto
    texto = pytesseract.image_to_string(img)
    return texto

if __name__ == '__main__':
    app.run(debug=True)
