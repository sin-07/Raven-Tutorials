export const runtime = "nodejs";

const TIMEOUT_MS = 9000;

function timeout(ms: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`TIMEOUT_${ms}ms`)), ms);
  });
}

export async function POST() {
  try {
    const fetchPromise = fetch(
      "https://api.brevo.com/v3/smtp/email",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "api-key": process.env.BREVO_API_KEY!,
        },
        body: JSON.stringify({
          sender: {
            name: process.env.BREVO_SENDER_NAME,
            email: process.env.BREVO_SENDER_EMAIL,
          },
          to: [{ email: "test@gmail.com" }],
          subject: "Brevo email test",
          htmlContent: "<h2>Email sent successfully</h2>",
        }),
      }
    );

    const response = await Promise.race([fetchPromise, timeout(TIMEOUT_MS)]) as Response;

    if (!response.ok) {
      const errorData = await response.text();
      return Response.json(
        { success: false, error: `Brevo API error: ${response.status}`, details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return Response.json({ success: true, data });
  } catch (error: any) {
    if (error.message?.startsWith("TIMEOUT_")) {
      return Response.json(
        { success: false, error: "Request timeout after 9s" },
        { status: 504 }
      );
    }
    
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
