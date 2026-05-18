## Usage

```bash
$ npm install # or pnpm install or yarn install
```

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the React app in development mode on [http://localhost:3000](http://localhost:3000).

### `npm run dev:api`

Runs the Stocker API in watch mode on [http://localhost:4000](http://localhost:4000).

### `npm run server`

Runs the Stocker API without watch mode.

Available API routes:

- `GET /api/health`
- `GET /api/stocks`
- `GET /api/stocks/:symbol`
- `GET /api/portfolio`
- `GET /api/news`
- `GET /api/predictions/:symbol`

### `npm run build`

Builds the React app for production to the `dist` folder.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

Learn more about deploying your application with the [documentations](https://vite.dev/guide/static-deploy.html)
