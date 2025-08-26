# Usa una imagen base de node
FROM node:18 AS build

WORKDIR /app


# Definir el argumento de construcción
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Usa una imagen de menor peso para servir archivos estáticos
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html


EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
