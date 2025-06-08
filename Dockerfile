FROM node:20-alpine
WORKDIR /app

ARG FRONTEND_URL
ENV FRONTEND_URL=${FRONTEND_URL}

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install

COPY . .
RUN pnpm run build

EXPOSE 3000
CMD ["node", "dist/index.js"]
