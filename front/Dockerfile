FROM node:20-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install
COPY . .
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
RUN pnpm run build
EXPOSE 4173
CMD ["pnpm", "exec", "vite", "preview", "--host", "0.0.0.0", "--port", "4173"]