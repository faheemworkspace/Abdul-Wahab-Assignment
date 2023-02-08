FROM node:18-alpine
 
WORKDIR /app/  
# Bundle app source
COPY . .

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json .
 
# Install any needed packages
RUN npm i
 
EXPOSE 4200
 
ENTRYPOINT npm run start