FROM nodejs

ADD package.json .
RUN npm install

ADD . .

EXPOSE 8080
EXPOSE 5858

CMD ["npm", "start"]