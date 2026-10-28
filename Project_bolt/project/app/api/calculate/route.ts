import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const jahn = body.jahn ?? body.jahnSymbol ?? "";
    const payload = {
      ...body,
      jahn,
    };
    delete payload.jahnSymbol;

    const response = await fetch("http://127.0.0.1:8000/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "Cannot reach backend server.",
      },
      {
        status: 500,
      }
    );
  }
}
