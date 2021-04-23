# pull official base image
FROM node:15

# set working directory
WORKDIR /usr/src/access-management

# install app dependencies
COPY package.json ./

RUN npm install --only=prod
COPY . ./

EXPOSE 5050

RUN npm cache clean --force
RUN npm run build

CMD ["yarn", "start"]
