import { type NextRequest } from "next/server"
import { corsHeaders, jsonResponse, optionsResponse } from "@/lib/cors"
import { addMessage } from "@/lib/messages"

export async function OPTIONS() {
  return optionsResponse()
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return jsonResponse({ error: "All fields are required" }, 400)
    }

    const whatsappPhoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
    const whatsappAccessToken = process.env.WHATSAPP_ACCESS_TOKEN
    const recipientPhoneNumber = process.env.RECIPIENT_PHONE_NUMBER

    if (whatsappPhoneNumberId && whatsappAccessToken && recipientPhoneNumber) {
      const whatsappMessage = `
*New Contact Form Submission*

*Name:* ${name}
*Email:* ${email}
*Subject:* ${subject}

*Message:*
${message}
      `.trim()

      const whatsappResponse = await fetch(
        `https://graph.facebook.com/v18.0/${whatsappPhoneNumberId}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${whatsappAccessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: recipientPhoneNumber,
            type: "text",
            text: { body: whatsappMessage },
          }),
        },
      )

      if (!whatsappResponse.ok) {
        console.error("WhatsApp API error:", await whatsappResponse.json())
      }
    }

    const saved = await addMessage({ name, email, subject, message })
    return jsonResponse({ success: true, message: "Message sent successfully", id: saved.id })
  } catch (error) {
    console.error("Contact form error:", error)
    return jsonResponse({ error: "Failed to send message. Check DATABASE_URL is configured." }, 500)
  }
}

export async function GET() {
    return new Response(JSON.stringify({ status: "ok", service: "Mohamed Barre Portfolio API" }), {
    headers: { "Content-Type": "application/json", ...corsHeaders() },
  })
}
