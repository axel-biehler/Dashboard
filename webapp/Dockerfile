FROM node:16.13.0 as builder
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build

FROM nginx
EXPOSE 3000
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
