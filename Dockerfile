FROM node:13-slim
WORKDIR /srv/app/client-mod
COPY package.json /srv/app/client-mod
RUN npm install 

COPY . /srv/app/client-mod
CMD ["npm", "start"]