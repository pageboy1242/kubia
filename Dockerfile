FROM arm64v8/node:7
ADD app.js /app.js
ENTRYPOINT [ "node", "app.js" ]