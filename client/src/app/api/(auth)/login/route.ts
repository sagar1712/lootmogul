import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return new NextResponse('Missing required fields', { status: 400 });
        }

        const response = await axios.post('https://lootmogul-server.vercel.app/login', {
            email,
            password
        });

        console.log(response)

        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Login error:', error);

        if (axios.isAxiosError(error)) {
            const statusCode = error.response?.status || 500;
            const errorMessage = error.response?.data?.message || 'An error occurred during registration';
            return new NextResponse(errorMessage, { status: statusCode });
        }

        return new NextResponse('Internal Server Error', { status: 500 });
    }
}