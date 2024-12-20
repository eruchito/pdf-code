from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from io import BytesIO
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas


app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model
class FormData(BaseModel):
    name: str
    email: str
    message: str

@app.post("/generate-pdf")
async def generate_pdf(data: FormData):
    try:
        # Create a PDF in memory
        buffer = BytesIO()
        pdf = canvas.Canvas(buffer, pagesize=letter)
        pdf.drawString(100, 750, f"Name: {data.name}")
        pdf.drawString(100, 730, f"Email: {data.email}")
        pdf.drawString(100, 710, f"Message: {data.message}")
        pdf.save()
        
        # Return the PDF as a response
        buffer.seek(0)
        return Response(content=buffer.read(), media_type="application/pdf", headers={
            "Content-Disposition": f"attachment; filename={data.name}_form.pdf"
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
