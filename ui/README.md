# Drift Frontend Base Template

## Setup

1. Pull the relevant git submodules
   `git submodule init && git submodule update && cd drift-common && git submodule init && git submodule update`
2. Run `./build_all_sm.sh` script in the root directory to build all submodules and dependencies.
3. Populate the `ui/.env` file using the `ui/.env.example` file as a template.

## Development

  - `yarn convert-icons` - place any new icons in `app/public/icons` and run this command to convert them to React components.
  - Adding new submodules
    1. Set up the git submodule with `git submodule add <git repo url> <path>`.
    2. Add the new package(s) to the following files:
       1. `scripts/install-vercel.sh`
       2. `scripts/build_all_sm.sh`
       3. `build_all_sm.sh`
       4. `tsconfig.json`

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
