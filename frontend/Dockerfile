FROM node:14.18.1-alpine

EXPOSE 3000
RUN mkdir -p /app/public /app/src
WORKDIR /app
COPY .eslintignore /app/.eslintignore
COPY .eslintrc.js /app/.eslintrc.js
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
## install only the packages defined in the package-lock.json (faster than the normal npm install)
RUN npm install
CMD ["npm", "start"]