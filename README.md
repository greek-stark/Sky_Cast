# WeatherIQ — clean 5-page React source

This version rewrites the uploaded weather project into one connected React app.

## Pages
1. Home — `/`
2. Forecast — `/forecast`
3. Details — `/details`
4. Weather Map / Favorites — `/map`
5. Alerts — `/alerts`

## Setup
```bash
npm install
```

Copy `.env.example` to `.env` and add your OpenWeather API key:
```env
REACT_APP_WEATHER_API_KEY=your_key_here
```

Then:
```bash
npm start
```

## Important
The original pasted source contained escaped JSX (`\<div>`), Markdown hyperlinks embedded in JavaScript URLs, repeated page declarations, and inconsistent filenames. This rewrite removes those issues and uses one shared `WeatherContext` so all five pages use the same weather data and API connection.
