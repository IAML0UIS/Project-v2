import cv2
import pytesseract
import re
import tkinter as tk
from PIL import Image, ImageTk

# Configuración de la ruta de Tesseract en tu sistema
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

class MedicamentoApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Detección de Medicamentos en Tiempo Real")
        self.root.geometry("640x560")

        self.label = tk.Label(root, text="Detección de Medicamentos", font=("Helvetica", 14))
        self.label.pack(pady=20)

        self.btn_iniciar = tk.Button(root, text="Iniciar Cámara", command=self.iniciar_camara)
        self.btn_iniciar.pack(pady=10)

        self.text_label = tk.Label(root, text="", font=("Helvetica", 12), wraplength=500)
        self.text_label.pack(pady=20)

        self.label_camara = tk.Label(root)  # Etiqueta para mostrar la cámara en la misma ventana
        self.label_camara.pack()

        self.captura = None
        self.medicamento_detectado = None  # Variable para almacenar el medicamento detectado

    # Función para iniciar la cámara
    def iniciar_camara(self):
        self.captura = cv2.VideoCapture(0)
        self.btn_iniciar.config(state=tk.DISABLED)  # Desactivar el botón después de iniciar la cámara
        self.actualizar_camara()

    # Función para actualizar el fotograma de la cámara
    def actualizar_camara(self):
        ret, frame = self.captura.read()
        if ret:
            texto_detectado = self.detectar_texto(frame)
            medicamento = self.detectar_medicamento(texto_detectado)

            # Mantener el mensaje de detección fijo
            if medicamento and self.medicamento_detectado != medicamento:
                self.medicamento_detectado = medicamento
                self.text_label.config(text=f"¡Medicamento detectado: {medicamento}!")

            # Mostrar mensaje solo si no se ha detectado antes
            elif not self.medicamento_detectado:
                self.text_label.config(text="No se reconoce ningun medicamento")

            # Mostrar el fotograma en la ventana de Tkinter
            cv2image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            imgtk = ImageTk.PhotoImage(image=Image.fromarray(cv2image))
            self.label_camara.imgtk = imgtk
            self.label_camara.config(image=imgtk)

        self.root.after(10, self.actualizar_camara)

    # Función para detectar texto en la imagen
    def detectar_texto(self, frame):
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        gray = cv2.medianBlur(gray, 5)
        gray = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)
        texto_detectado = pytesseract.image_to_string(gray, lang='spa')
        return texto_detectado

    # Función para buscar "Ibuprofeno" o "Acetaminofén" en el texto detectado
    def detectar_medicamento(self, texto):
        texto = texto.lower()  # Convertir el texto a minúsculas para una búsqueda insensible a mayúsculas
        if re.search(r'ibuprofeno', texto):
            return "Ibuprofeno"
        elif re.search(r'acetaminof[eé]n', texto):
            return "Acetaminofén"
        return None

    # Cerrar la captura de video al cerrar la ventana
    def cerrar(self):
        if self.captura is not None:
            self.captura.release()
        self.root.quit()

# Crear la ventana de Tkinter
root = tk.Tk()
app = MedicamentoApp(root)
root.protocol("WM_DELETE_WINDOW", app.cerrar)
root.mainloop()
