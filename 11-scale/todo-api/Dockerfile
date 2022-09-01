# Sets the base image
FROM node:18
# Establishes the working directory for your app within the container
WORKDIR /usr/src/app
# Copies your package.json file and then installs modules
COPY package*.json ./
RUN npm install
# Copies your project files and then runs the app
COPY . .
CMD [ "node", "index.js" ]
