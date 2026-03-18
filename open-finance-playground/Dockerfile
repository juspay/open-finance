# Use Node.js 20 as the builder stage
FROM node:20 AS builder
WORKDIR /app
# Copy package.json and package-lock.json
COPY package.json package-lock.json ./
# Install dependencies using NPM
RUN npm ci --prefer-offline --no-audit --no-fund
# Copy the rest of the application
COPY . .
# Build the Next.js app in standalone mode
RUN npm run build && \
    mkdir -p /app/.next/standalone && \
    cp -r public /app/.next/standalone/ && \
    cp -r .next/static /app/.next/standalone/.next/

# Production image
FROM node:20-alpine AS runner
WORKDIR /app
# Copy only necessary files
COPY --from=builder /app/.next/standalone /app/
COPY --from=builder /app/public /app/public
COPY --from=builder /app/.next/static /app/.next/static

# Expose Next.js port
EXPOSE 3000
# Start the Next.js app
CMD ["node", "server.js"]