// pages/index.js
import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    fecha: '',
    detalles: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('http://127.0.0.1:8000/generate_pdf/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.blob();  // Recibir el archivo PDF como Blob
        const url = URL.createObjectURL(data);
        setPdfUrl(url);  // Guardamos la URL del PDF generado
      } else {
        console.error('Error al generar el PDF');
      }
    } catch (error) {
      console.error('Error al enviar los datos', error);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Dirección</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha</label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Detalles</label>
          <textarea
            name="detalles"
            value={formData.detalles}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full p-2 bg-blue-500 text-white rounded ${isSubmitting && 'opacity-50'}`}
        >
          {isSubmitting ? 'Generando PDF...' : 'Generar PDF'}
        </button>
      </form>

      {pdfUrl && (
        <div className="mt-4">
          <a
            href={pdfUrl}
            download="documento_generado.pdf"
            className="text-blue-500 underline"
          >
            Descargar PDF
          </a>
        </div>
      )}
    </div>
  );
}
