# Shopify API App

This is my MageXo Shopify test app. Since this is my first time working properly in backend, I hope my backend approach wasn't that terrible. 

I have decided to use NextJs for frontend since it allows server side rendering and it was fairly easy to use the packcaged router for dynamic product urls.
For backend, I went the easiest route and used the Node.js Shopify storefront API client.

Testing is limited due to the size of the project. I just wanted to show that I do know how ot test individual components, but would definitely do more extensive testing on a larger scale.

## Run

### Server
Start the server app on port 3000
```
cd server;
npm install;
npm run dev;
```
If you have issues with `nodemon` permissions, try runnig `npm install` with root permissions

### Client
Start the frontend app on port 3001
Open new terminal
```
cd client;
npm install;
npm run dev;
```

## Test
You can test the client app
```
cd client;
npm install
npm run test;
```