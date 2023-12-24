# Development stage
FROM node:20-alpine as development

# Build main folder
WORKDIR /app

# Copy necessary files for compilation
COPY package*.json .

RUN npm install

COPY . .

# Compile TypeScript code
RUN npm run build

# Production stage
FROM node:20-alpine as production

ARG  NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production

# Copy built files from the builder stage
COPY --from=development /app/build ./build

# Define the command to run the application (adjust as per your application)
CMD ["node", "build/index.js"]
