# Aplicación Generadora de PDFs

Este proyecto es una aplicación web desarrollada con FastAPI (backend) y React (frontend) que permite a los usuarios llenar un formulario y generar un archivo PDF descargable con los datos proporcionados.

## Características
- Formulario fácil de usar para ingresar datos.
- Procesamiento en el backend para generar documentos PDF dinámicamente.
- Descarga automática de los archivos PDF generados al dispositivo del usuario.

---

## Requisitos Previos

### Backend
- Python 3.8 o superior.
- pip (Administrador de paquetes de Python).

### Frontend
- Node.js 14 o superior.
- npm o yarn.

---

## Instrucciones de Instalación

### Clonar el Repositorio
```bash
git clone <url-del-repositorio>
cd pdf-generator

###Crear un entorno virtual y activarlo
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate

###Instalar las dependencias necesarias
pip install -r requirements.txt

###Crear el archivo requirements.txt
fastapi
uvicorn
pydantic
reportlab

###Ejecutar el servidor backend
uvicorn main:app --reload




