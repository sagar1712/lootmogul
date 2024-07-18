import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const city = searchParams.get('city');

	if (!city) {
		return new NextResponse('City name is required', { status: 400 });
	}

	try {
		const geoResponse = await axios.get(
			'https://nominatim.openstreetmap.org/search',
			{
				params: {
					q: city,
					format: 'json',
				},
			}
		);

		if (geoResponse.data.length === 0) {
			return new NextResponse('City not found', { status: 404 });
		}

		const { lat, lon } = geoResponse.data[0];

		const weatherResponse = await axios.get(
			'https://api.open-meteo.com/v1/forecast',
			{
				params: {
					latitude: lat,
					longitude: lon,
					hourly: 'temperature_2m',
					current_weather: true,
				},
			}
		);

		return NextResponse.json(weatherResponse.data);
	} catch (error) {
		return new NextResponse('Internal Error', { status: 500 });
	}
}
