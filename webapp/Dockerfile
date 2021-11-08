FROM node:16.13.0
ENV NODE_ENV=production

COPY package.json ./
COPY package-lock.json ./
RUN npm install --production
RUN npm install react-scripts@3.4.1 -g

COPY . ./

CMD ["npm", "start"]