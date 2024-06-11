# syntax=docker/dockerfile:1


FROM node:alpine AS development

WORKDIR /app
COPY package.json /app/package.json
RUN npm install --only=prod
COPY . .
EXPOSE 3000
CMD [“npm”, “start”]