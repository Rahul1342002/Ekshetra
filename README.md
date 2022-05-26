# EKSHETRA

**This is the production ready build for Ekshetra developed by Department of CSE Students at BITS Vizag**

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Deploy

Currently we used [`vercel`](https://vercel.com/) to deploy. All the adapters are set for vercel by default. Just link your repository in your vercel dashboard, and you should be good to go.
