import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  const { topic } = await req.json();

  // Ensure topic is provided
  if (!topic || typeof topic !== 'string') {
    return NextResponse.json({ error: 'Invalid topic' }, { status: 400 });
  }

  const apiKey = process.env.HUGGINGFACE_API_KEY;

  if (!apiKey) {
    console.error('Hugging Face API key is missing!');
    return NextResponse.json(
      { error: 'Server configuration error: Missing API key' },
      { status: 500 }
    );
  }

  try {
    // Using the GPT-Neo 2.7B model as an alternative
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-2.7B',
      {
        inputs: `Write a blog about: ${topic}`,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const blog = response.data[0]?.generated_text?.trim();

    if (blog) {
      return NextResponse.json({ blog });
    } else {
      return NextResponse.json({ error: 'Failed to generate blog' }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Hugging Face API Error:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to generate blog' },
      { status: 500 }
    );
  }
}
