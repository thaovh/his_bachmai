import { NextRequest, NextResponse } from "next/server";

const SNOWSTORM_API_URL = process.env.SNOWSTORM_API_URL || "http://192.168.7.234:18080";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  try {
    const { path } = await params;
    const searchParams = request.nextUrl.searchParams.toString();
    const subPath = path ? path.join("/") : "";
    
    const url = `${SNOWSTORM_API_URL}/${subPath}${searchParams ? `?${searchParams}` : ""}`;
    
    console.log(`[Snomed Proxy] IN: ${request.nextUrl.pathname}`);
    console.log(`[Snomed Proxy] TARGET: ${url}`);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Accept-Language": "en",
      },
      cache: "no-store" 
    });

    console.log(`[Snomed Proxy] STATUS: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[Snomed Proxy] Snowstorm Error: ${response.status} - ${errorText}`);
      return NextResponse.json(
        { error: `Snowstorm error: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log(`[Snomed Proxy] SUCCESS: Found ${data.items?.length || 0} items`);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("[Snomed Proxy] CRITICAL ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
