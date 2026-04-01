import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { contact, message, designTitle, type } = await request.json();

    if (!contact) {
      return NextResponse.json(
        { error: "Falta el contacto" },
        { status: 400 }
      );
    }

    // Configurar transportador de email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    let mailOptions;

    if (type === "design-request") {
      // Email para solicitud de diseño
      mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.OWNER_EMAIL,
        subject: `Cliente quiere un diseño como: ${designTitle}`,
        html: `
          <h2>Nueva solicitud de diseño</h2>
          <p><strong>Diseño elegido:</strong> ${designTitle}</p>
          <p><strong>Email del cliente:</strong> ${contact}</p>
          <hr>
          <p><em>El cliente quiere un diseño como: ${designTitle}</em></p>
        `,
      };
    } else {
      // Email para solicitud de demo (por defecto)
      if (!message) {
        return NextResponse.json(
          { error: "Faltan campos requeridos" },
          { status: 400 }
        );
      }
      mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.OWNER_EMAIL,
        subject: `Nueva solicitud de demo - ${contact}`,
        html: `
          <h2>Nueva solicitud de demo</h2>
          <p><strong>Contacto:</strong> ${contact}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      };
    }

    // Enviar email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Email enviado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al enviar email:", error);
    return NextResponse.json(
      { error: "Error al enviar el email" },
      { status: 500 }
    );
  }
}
