# base image 
FROM node:12.16.1-alpine

# set working directory 
WORKDIR /react

# add `/app/node_modules/.bin` to $PATH 
ENV PATH /react/node_modules/.bin:$PATH 

# ARG REACT_APP_API_BASE_URL
# ENV REACT_APP_API_BASE_URL = ${REACT_APP_API_BASE_URL}

# install and cache app dependencies 
COPY ./package*.json ./

# RUN npm cache clean --force
RUN npm install

COPY . .

# start app 
CMD ["react-scripts", "start"]