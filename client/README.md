
## Client Directory

### Configuration

Create a `.env` file in the client directory and add the following configuration:

```
OPENAI_API_KEY=YOUR_OPENAI_API_KEY
OPENWEATHERMAP_API_KEY=YOUR_OPENWEATHERMAP_API_KEY
LOCATIONIQ_API_KEY=YOUR_LOCATIONIQ_API_KEY
```

### Starting the Client

To start the client in development mode:

```bash
npm run dev
```

To build and start the client for production:

```bash
npm run build
npm run start
```