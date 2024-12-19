# Welcome!

## Decisions

- React Flavor: **Remix**: Recency bias at play for how I think about data fetching in React.
- Styling: **TailwindCSS + shadcn/ui**: Collection of re-usable atomic components that are easily copy pasted into your app.

## Obvious Improvements

- Local Data Caching to avoid api thrashing (tanstack query)
- Log errors to Sentry or other log dump
- Display:
  - pagination
  - name search
  - field filtering

## Note

Commiting `.env` for simplicity, would never otherwise do that.

## Development

Install dependencies and run the dev server:

```shellscript
npm install
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
