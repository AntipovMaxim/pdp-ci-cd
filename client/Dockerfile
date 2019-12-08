# Stage 1 - the build process
FROM node:9.8-slim as build

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2 - the production environment
FROM nginx:1.13-alpine
# COPY nginx-site.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
