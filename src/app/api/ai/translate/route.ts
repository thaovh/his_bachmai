import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { term } = await req.json();

    if (!term) {
      return NextResponse.json({ error: 'Term is required' }, { status: 400 });
    }

    const aiEndpoint = 'http://192.168.89.38:8765/v1/chat/completions';

    const payload = {
      model: "gemma-3-4b-it",
      messages: [
        {
          role: "system",
          content: "Bạn là chuyên gia dịch thuật y khoa. BẮT BUỘC dịch toàn bộ thuật ngữ sang tiếng Việt. KHÔNG lặp lại từ tiếng Anh. CHỈ trả về duy nhất tên tiếng Việt, không giải thích gì thêm."
        },
        {
          role: "user",
          content: "Paracetamol (product)"
        },
        {
          role: "assistant",
          content: "Thuốc Paracetamol - Thuốc dùng để giảm đau và hạ sốt."
        },
        {
          role: "user",
          content: term
        }
      ],
      temperature: 0.0,
      max_tokens: 100,
      stop: ["\n"]
    };

    console.log(`[AI Proxy] Translating: ${term}`);

    const response = await fetch(aiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[AI Proxy] Error: ${response.status} - ${errorText}`);
      return NextResponse.json({ error: 'AI server error', details: errorText }, { status: response.status });
    }

    const result = await response.json();
    const content = result.choices?.[0]?.message?.content || '';

    console.log(`[AI Proxy] Result: ${content}`);

    return NextResponse.json({ translation: content });
  } catch (error: any) {
    console.error(`[AI Proxy] Fatal Error: ${error.message}`);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}
