FROM node:20.19

COPY . /app/

WORKDIR /app/

RUN npm -g i bun

RUN bun install

EXPOSE 92

ENTRYPOINT ["/usr/local/bin/bun", "run", "dev"]