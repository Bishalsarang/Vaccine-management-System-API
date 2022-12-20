FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json yarn.lock ./
RUN yarn install

# Install pm2
RUN npm install pm2 -g

# Bundle app source
COPY . .

# Build the app
RUN yarn build

EXPOSE 3000
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
