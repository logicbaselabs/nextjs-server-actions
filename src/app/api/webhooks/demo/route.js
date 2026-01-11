const WEBHOOK_SECRET = process.env.DEMO_WEB_HOOK_SECRET || "";

export async function POST(request) {
    const signature = request.headers.get("x-demo-signature") || "";
    const rawBody = await request.text();

    if (!WEBHOOK_SECRET || signature !== WEBHOOK_SECRET) {
        return new Response("Invalid signature", { status: 401 });
    }
    console.log("Webhook received:", rawBody);
    return new Response("ok");
}

export async function GET() {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
        start(controller) {
            controller.enqueue(encoder.encode("chunk 1\\n"));
            setTimeout(() => {
                controller.enqueue(encoder.encode("chunk 2\n"));
            }, 300);
            setTimeout(() => {
                controller.enqueue(encoder.encode("chunk 3\n"));
                controller.close();
            }, 600);
        },
    });
    return new Response(stream, {
        headers: { "Content-Type": "textplain; charset=utf-8" },
    });
}
