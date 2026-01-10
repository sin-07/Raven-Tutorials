// app/api/send-email/route.ts

export const runtime = "nodejs"; // MUST be first line

export async function POST() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(
      "https://api.brevo.com/v3/smtp/email",
      {
        method: "POST",
        headers: {
          "accept": "application/json",
          "content-type": "application/json",
          "api-key": process.env.BREVO_API_KEY!,
        },
        body: JSON.stringify({
          sender: {
            name: process.env.BREVO_SENDER_NAME,
            email: process.env.BREVO_SENDER_EMAIL,
          },
          to: [{ email: "test@gmail.com" }],
          subject: "Brevo API test",
          htmlContent: "<h2>Email sent successfully</h2>",
        }),
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    const data = await response.json();
    return Response.json({ ok: true, data });
  } catch (err: any) {
    clearTimeout(timeoutId);

    return Response.json(
      {
        ok: false,
        error:
          err.name === "AbortError"
            ? "Request aborted after 8s (safe timeout)"
            : err.message,
      },
      { status: 500 }
    );
  }
}
