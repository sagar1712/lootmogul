import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { username, email, password } = await req.json();

        if (!username || !email || !password) {
            return new NextResponse('Missing required fields', { status: 400 });
        }

        const response = await axios.post('https://lootmogul-server.vercel.app/register', {
            username,
            email,
            password
        });

        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Registration error:', error);

        if (axios.isAxiosError(error)) {
            const statusCode = error.response?.status || 500;
            const errorMessage = error.response?.data?.message || 'An error occurred during registration';
            return new NextResponse(errorMessage, { status: statusCode });
        }

        return new NextResponse('Internal Server Error', { status: 500 });
    }
}