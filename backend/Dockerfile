FROM node:latest

#Creating the work directory for backend
WORKDIR /usr/src/app 

#Adding dependencies
COPY ./package*.json ./
RUN npm install

#Copying project's files
COPY . .

# Expose port
EXPOSE 4000

# Executable
CMD ["npm", "run", "dev"]


