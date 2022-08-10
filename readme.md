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
pm2 start dist/app.js --name=api_random0 -- -p 8081 -m cluster --watch
pm2 start dist/app.js --name=api_random1 -- -p 8082 --watch
pm2 start dist/app.js --name=api_random2 -- -p 8083 --watch
pm2 start dist/app.js --name=api_random3 -- -p 8084 --watch
pm2 start dist/app.js --name=api_random4 -- -p 8085 --watch
pm2 start dist/app.js --name=app --watch
```

## forever

```bash
forever start dist/app.js --name=api_random0 -- -p 8081 -m cluster --watch
forever start dist/app.js --name=api_random1 -- -p 8082 --watch
forever start dist/app.js --name=api_random2 -- -p 8083 --watch
forever start dist/app.js --name=api_random3 -- -p 8084 --watch
forever start dist/app.js --name=api_random4 -- -p 8085 --watch
forever start dist/app.js --name=app --watch
```
