import axios from 'axios';
import { NextResponse } from 'next/server';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(req: Request) {
	if (!OPENAI_API_KEY) {
		console.error('OPENAI_API_KEY is not set');
		return new NextResponse('Server configuration error', { status: 500 });
	}

	let prompt: string;
	try {
		const body = await req.json();
		prompt = body.prompt;
	} catch (error) {
		console.error('Error parsing request body:', error);
		return new NextResponse('Invalid request body', { status: 400 });
	}

	if (!prompt) {
		return new NextResponse('Prompt is required', { status: 400 });
	}

	try {
		const response = await axios.post(
			'https://api.openai.com/v1/chat/completions',
			{
				model: 'gpt-3.5-turbo',
				messages: [{ role: 'user', content: prompt }],
				max_tokens: 100,
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${OPENAI_API_KEY}`,
				},
			}
		);

		return NextResponse.json(response.data);
	} catch (error) {
		console.error('OpenAI API error:', error);
		if (axios.isAxiosError(error) && error.response) {
			const statusCode = error.response.status;
			let message = 'OpenAI API error';

			if (statusCode === 429) {
				message =
					'You have exceeded your current quota. Please check your plan and billing details.';
			} else if (statusCode === 403) {
				message =
					'Your API key is not authorized to perform this operation. Please check your API key and account settings.';
			}

			return new NextResponse(message, { status: statusCode });
		}
		return new NextResponse('Internal server error', { status: 500 });
	}
}
