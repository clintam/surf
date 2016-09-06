FROM nodejs

ADD package.json .
RUN npm install

ADD . .

RUN npm run compile

EXPOSE 8080
EXPOSE 5858

CMD ["npm", "run", "dev"]