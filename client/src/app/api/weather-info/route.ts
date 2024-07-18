import axios from 'axios';
import { NextResponse } from 'next/server';

const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY 

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get('city');

  if (!city) {
    return new NextResponse('City name is required', { status: 400 });
  }

  try {
    const geoResponse = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: city,
        format: 'json',
      },
    });

    if (geoResponse.data.length === 0) {
      return new NextResponse('City not found', { status: 404 });
    }

    const { lat, lon } = geoResponse.data[0];

    const weatherResponse = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat,
        lon,
        appid: OPENWEATHERMAP_API_KEY,
        units: 'metric', 
      },
    });

    return NextResponse.json(weatherResponse.data);
  } catch (error) {
	console.log(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
