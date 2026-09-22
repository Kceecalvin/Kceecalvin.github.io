import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { enquirySchema, enquiryHtml, enquiryText } from "@/lib/enquiry";
export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin)
    return NextResponse.json(
      { error: "Please send your enquiry from this website." },
      { status: 403 },
    );
  if (!request.headers.get("content-type")?.includes("application/json"))
    return NextResponse.json(
      { error: "Please send a JSON request." },
      { status: 415 },
    );
  if (Number(request.headers.get("content-length") || 0) > 20000)
    return NextResponse.json(
      { error: "Your enquiry is too long." },
      { status: 413 },
    );
  let input: unknown;
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).length > 20000)
      return NextResponse.json(
        { error: "Your enquiry is too long." },
        { status: 413 },
      );
    input = JSON.parse(body);
  } catch {
    return NextResponse.json(
      { error: "Please check your enquiry and try again." },
      { status: 400 },
    );
  }
  const result = enquirySchema.safeParse(input);
  if (!result.success)
    return NextResponse.json(
      { error: "Please check the details in your enquiry." },
      { status: 400 },
    );
  const user = process.env.EMAIL_USER,
    password = process.env.EMAIL_PASS;
  if (!user || !password)
    return NextResponse.json(
      {
        error:
          "Direct sending is not configured. Please use the email draft option.",
      },
      { status: 503 },
    );
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.zoho.com",
    port: Number(process.env.SMTP_PORT || 465),
    secure: (process.env.SMTP_PORT || "465") === "465",
    auth: { user, pass: password },
    connectionTimeout: 10000,
    socketTimeout: 15000,
  });
  try {
    await transport.sendMail({
      from: { name: "CALDEV Portfolio", address: user },
      to: process.env.CONTACT_TO_EMAIL || user,
      replyTo: { name: result.data.name, address: result.data.email },
      subject: `New project enquiry: ${result.data.type}`,
      text: enquiryText(result.data),
      html: enquiryHtml(result.data),
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        error:
          "The message could not be delivered. Your details are still here — please use the email draft option.",
      },
      { status: 502 },
    );
  } finally {
    transport.close();
  }
}
