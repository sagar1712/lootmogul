import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const query = searchParams.get('query') || 'latest';

	try {
		const response = await axios.get(
			`https://api.gdeltproject.org/api/v2/doc/doc?query=${query}&mode=ArtList&format=json`
		);

		return NextResponse.json(response.data);
	} catch (error) {
		return new NextResponse('Internal Error', { status: 500 });
	}
}
