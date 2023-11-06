# Source image
FROM node:18

# Working directory - where the application will be inside the container
WORKDIR /app

# Adding `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Installing and caching application dependencies
COPY package.json ./package.json
RUN npm install

COPY . .

RUN npm run build

# RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

# COPY --from=builder /app/build app/build

EXPOSE 3000
 
# Starting the application
CMD ["npm", "start"]
