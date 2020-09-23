# base image 
FROM node:12.16.1-alpine

# set working directory 
WORKDIR /usr/src/app

# add `/app/node_modules/.bin` to $PATH 
ENV PATH /usr/src/app/node_modules/.bin:$PATH 

# ARG REACT_APP_API_BASE_URL
# ENV REACT_APP_API_BASE_URL = ${REACT_APP_API_BASE_URL}

# install and cache app dependencies 
COPY ./package*.json ./

# RUN npm cache clean --force
RUN npm install

COPY . .

EXPOSE 8080

# start app 
CMD ["npm", "run", "build"]

