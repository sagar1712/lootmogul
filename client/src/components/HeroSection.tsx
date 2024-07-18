'use client';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardDescription, CardFooter, CardHeader } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface WeatherData {
	current_weather: {
		temperature: number;
		windspeed: number;
		winddirection: number;
	};
}

interface NewsData {
	articles: Array<{
		title: string;
		url: string;
	}>;
}

interface OpenAIData {
	choices: Array<{
		text: string;
	}>;
}

type ApiResponse = WeatherData | NewsData | OpenAIData | null;

const HeroSection = () => {
	const [weatherCity, setWeatherCity] = useState('');
	const [newsQuery, setNewsQuery] = useState('');
	const [openAIPrompt, setOpenAIPrompt] = useState('');
	const [apiResponse, setApiResponse] = useState<ApiResponse>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [activeApi, setActiveApi] = useState<
		'weather' | 'news' | 'openai' | null
	>(null);

	const fetchWeatherData = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch(
				`/api/weather-info?city=${encodeURIComponent(weatherCity)}`
			);
			if (!response.ok) {
				throw new Error('Failed to fetch weather data');
			}
			const data: WeatherData = await response.json();
			setApiResponse(data);
			setActiveApi('weather');
		} catch (err) {
			setError(
				err instanceof Error ? err.message : 'An unknown error occurred'
			);
		} finally {
			setLoading(false);
		}
	};

	const fetchNewsData = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch(
				`/api/news?query=${encodeURIComponent(newsQuery)}`
			);
			if (!response.ok) {
				throw new Error('Failed to fetch news data');
			}
			const data: NewsData = await response.json();
			setApiResponse(data);
			setActiveApi('news');
		} catch (err) {
			setError(
				err instanceof Error ? err.message : 'An unknown error occurred'
			);
		} finally {
			setLoading(false);
		}
	};

	const fetchOpenAIData = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch('/api/openai', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ prompt: openAIPrompt }),
			});
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Failed to fetch OpenAI data');
			}
			const data: OpenAIData = await response.json();
			setApiResponse(data);
			setActiveApi('openai');
		} catch (err) {
			setError(
				err instanceof Error ? err.message : 'An unknown error occurred'
			);
		} finally {
			setLoading(false);
		}
	};

	const renderApiResponse = () => {
		if (!apiResponse) return null;

		switch (activeApi) {
			case 'weather':
				const weatherData = apiResponse as WeatherData;
				return (
					<div>
						<h3 className="text-xl mb-2">Weather Information</h3>
						<p>
							Temperature: {weatherData.current_weather.temperature.toFixed(1)}
							°C
						</p>
						<p>
							Wind Speed: {weatherData.current_weather.windspeed.toFixed(1)}{' '}
							km/h
						</p>
						<p>
							Wind Direction:{' '}
							{weatherData.current_weather.winddirection.toFixed(1)}°
						</p>
					</div>
				);
			case 'news':
				const newsData = apiResponse as NewsData;
				return (
					<div>
						<h3 className="text-xl mb-2">News Articles</h3>
						<ul>
							{newsData.articles.slice(0, 5).map((article, index) => (
								<li key={index}>
									<a
										href={article.url}
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue-300 hover:underline"
									>
										{article.title}
									</a>
								</li>
							))}
						</ul>
					</div>
				);
			case 'openai':
				const openAIData = apiResponse as OpenAIData;
				return (
					<div>
						<h3 className="text-xl mb-2">OpenAI Response</h3>
						<p>{openAIData.choices[0].text}</p>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<div className="flex flex-col justify-center text-center text-white">
			<h1 className="pt-16 text-6xl">
				LootMogul External API <br />
				Integration
			</h1>
			<p className="pt-8 text-xl pb-16">
				Bring blockchain to the people. Solana supports experiences <br />
				for power users, new consumers, and everyone in between.
			</p>
			<div className="flex justify-center gap-x-4">
				<Button variant="custom" className="bg-transparent">
					LOG IN
				</Button>
				<Button variant="custom">SIGN UP</Button>
			</div>

			<div className="flex justify-center gap-x-4 mt-16">
				<Card className="w-80 bg-transparent backdrop-blur-md text-white">
					<CardHeader>Weather API</CardHeader>
					<CardDescription className="flex justify-center">
						<Label htmlFor="weather-city">City Name</Label>
						<Input
							id="weather-city"
							type="text"
							placeholder="Enter city name"
							className="mx-2"
							value={weatherCity}
							onChange={(e) => setWeatherCity(e.target.value)}
						/>
					</CardDescription>
					<CardFooter className="flex justify-center my-4">
						<Button
							variant="custom"
							className="hover:bg-transparent"
							onClick={fetchWeatherData}
							disabled={loading}
						>
							{loading && activeApi === 'weather' ? 'Loading...' : 'Call'}
						</Button>
					</CardFooter>
				</Card>

				<Card className="w-80 bg-transparent backdrop-blur-md text-white">
					<CardHeader>News API</CardHeader>
					<CardDescription className="flex justify-center">
						<Label htmlFor="news-query">Search Query</Label>
						<Input
							id="news-query"
							type="text"
							placeholder="Enter search query"
							className="mx-2"
							value={newsQuery}
							onChange={(e) => setNewsQuery(e.target.value)}
						/>
					</CardDescription>
					<CardFooter className="flex justify-center my-4">
						<Button
							variant="custom"
							className="hover:bg-transparent"
							onClick={fetchNewsData}
							disabled={loading}
						>
							{loading && activeApi === 'news' ? 'Loading...' : 'Call'}
						</Button>
					</CardFooter>
				</Card>

				<Card className="w-80 bg-transparent backdrop-blur-md text-white">
					<CardHeader>OpenAI API</CardHeader>
					<CardDescription className="flex justify-center">
						<Label htmlFor="openai-prompt">Prompt</Label>
						<Input
							id="openai-prompt"
							type="text"
							placeholder="Enter prompt"
							className="mx-2"
							value={openAIPrompt}
							onChange={(e) => setOpenAIPrompt(e.target.value)}
						/>
					</CardDescription>
					<CardFooter className="flex justify-center my-4">
						<Button
							variant="custom"
							className="hover:bg-transparent"
							onClick={fetchOpenAIData}
							disabled={loading}
						>
							{loading && activeApi === 'openai' ? 'Loading...' : 'Call'}
						</Button>
					</CardFooter>
				</Card>
			</div>

			{/* API Response Display */}
			{(apiResponse || error) && (
				<div className="mt-8 p-4 bg-white bg-opacity-10 backdrop-blur-md rounded-lg text-white">
					<h2 className="text-2xl mb-4">API Response</h2>
					{error ? (
						<p className="text-red-500">{error}</p>
					) : (
						renderApiResponse()
					)}
				</div>
			)}
		</div>
	);
};

export default HeroSection;
