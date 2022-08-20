# Usage

Ensure you copied the folders 'public' and 'views' to the 'dist' folder.

Then run the following command:

```bash
npm run build && npm run build:css
```

Then to start the server.

```bash
npm start
```

## nodemon

```bash
nodemon dist/app.js -m cluster
```

```bash
nodemon dist/app.js
```

## pm2

```bash
pm2 start dist/app.js --watch --name=api_random0 -- -p 8081 -m cluster
pm2 start dist/app.js --watch --name=api_random1 -- -p 8082
pm2 start dist/app.js --watch --name=api_random2 -- -p 8083
pm2 start dist/app.js --watch --name=api_random3 -- -p 8084
pm2 start dist/app.js --watch --name=api_random4 -- -p 8085
pm2 start dist/app.js --watch --name=app
```

## forever

```bash
forever start dist/app.js --watch --name=api_random0 -- -p 8081 -m cluster
forever start dist/app.js --watch --name=api_random1 -- -p 8082
forever start dist/app.js --watch --name=api_random2 -- -p 8083
forever start dist/app.js --watch --name=api_random3 -- -p 8084
forever start dist/app.js --watch --name=api_random4 -- -p 8085
forever start dist/app.js --watch --name=app
```
