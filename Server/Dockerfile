# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7


FROM node:20.9.0-alpine

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /server

# Copying all the files in our project
COPY package*.json ./

# Installing dependencies
RUN npm install

RUN npm install -g nodemon

COPY . .

# Starting our application
CMD [ "nodemon", "server.js" ]

# Exposing server port
EXPOSE 5000