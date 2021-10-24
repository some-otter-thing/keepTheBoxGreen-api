FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install
# If you are building your code for production
RUN npm ci --only=production

# Bundle app source
COPY package.json /usr/src/app/

ENV PORT 8080
EXPOSE 8080 

# Bundle app source
COPY . .

RUN npm build

CMD [ "node", "./dist/app.js" ]