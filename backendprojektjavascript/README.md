This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Instruktioner för Applikation Javascript som Backend språk.

## - Koncept -

En applikation för att spara "Items" för ett lager eller liknande, endast inloggade "medarbetare" kan se över lagerstatus samt lägga till eller ändra. Applikationen
bygger på Next JS och använder sig av Prisma, Docker och en SQL databas via PgAdmin för att hantera Backend. Utöver det är det skrivet i JSX eller vanlig Javascript. Bcrypt används för att kryptera lösenord så dessa inte ska hackas lika lätt. Jose tillägg används för att sköta JWT token hantering, detta innefattar både skapandet och verifieringen av JWT.

## - Struktur -

Applikationen använder sig av en normal mapp struktur och App router. Innanför "app" mappen så ligger alla paths samt CRUD-operationer som används vid ändring eller tillägg av data. De paths som är skyddade, dvs måste ha autentisering ligger innanför en "auth" mapp för att kunna begränsa åtkomst för en användare. Utöver det ligger de komponenter som bygger upp frontend innanför en "components" mapp i vanlig React. Applikationen använder sig av en middleware fil som skyddar vissa api anrop för att säkerställa säkerheten i applikationen.

För att kunna se till att listan uppdaterar dynamiskt när en ändring skett, tillägg eller edit, så har en custom hook skapatas för att kunna hämta om Items när en förändring sker.

## - How to -

En användare kan skapas för att komma åt de "items" eller funktioner som applikationen ger. Har man redan en användare kan den användas. När en användare tillåts komma in har den valet att lägga in ett nytt item eller ändra befintliga items. Den kan aäven sortera på olika sätt, såsom kategori eller på om Item finns just nu, dvs har en kvantitet som är över 0. Efter användaren är klar kan den logga ut. Även om användaren uppdatearr sidan är den fortfarande inloggad genom ett JWT tokens används för autentisering och dessa sparas via local storage.

## - Dev Dependecies -

- React
- React-dom
- Next Js
- Prisma
- Bcrypt
- Jose
