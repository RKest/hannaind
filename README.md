# Hannaind
This is a jewelry store however I don't have the rights for images and it's not quite done yet soo
# Bears, birds and buildozers
## Store for all your bear, bird, and buildozer related needs

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

In order to repurpouse this for your own store, place your own images into /public/images folder, each folder is a single store item and each image is that item's image

Then just run 
```
python3 main.py
```
from the root directory to get your new `data.json` file and change its values to fit your needs

You will also need to change values in the `config.ts` file to fit your needs, however the comments should make this process simple

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```