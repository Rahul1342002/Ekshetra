# EKSHETRA

**This is the production ready build for Ekshetra developed by Department of CSE Students at [`BITS Vizag`](https://bitsvizag.com/)**

## Configuration

All configuration can be done from this file [`config.json`](https://github.com/SandeepDev1/Ekshetra/blob/main/config.json)

We use mongodb as the database.

-   `dbName` - The database name where the data need to be stored

-   `dbURL` - MongoDB URL to connect and perform operations

-   `botToken` - Telegram bot token. We use telegram to let our team know any new payment and they can verify it. There is a bot where we approve it via a command. I'll create a new repo and link that bot here.

-   `chatId` - Its the group id / personal ID. There are many bots which they can provide you the id.

-   `secret` - The JWT secret key to verify / create JWT token. we recommend to use greater than 512 Bits.

## Installing

```bash
# to install all necessary packages
npm install
```

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

## Preview

```bash
# to preview the build
npm run preview
```

## Deploy

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

Currently we use [`vercel`](https://vercel.com/) to deploy. All the adapters are set for vercel by default. Just link your repository in your vercel dashboard, and you should be good to go.

## Verify and Approve Payments

you can check this repo on how to approve those payments from event ID. [Click here to visit the repo](https://github.com/SandeepDev1/EventVerify)
