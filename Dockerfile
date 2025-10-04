FROM node:20 AS build
ARG VITE_BACKEND_URL=https://sturdy-adventure-r4r5vp47rgq7fp5w9-3001.app.github.dev/
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL  
WORKDIR /build 
COPY package.json . 
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx AS final
WORKDIR /usr/share/nginx/html
COPY --from=build /build/dist .