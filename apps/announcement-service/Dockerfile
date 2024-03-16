# Stage 1: PHP with required extensions
FROM php:8.2-cli-alpine3.17 AS backend

# Install PHP extensions including PostgreSQL
RUN --mount=type=bind,from=mlocati/php-extension-installer:1.5,source=/usr/bin/install-php-extensions,target=/usr/local/bin/install-php-extensions \
    install-php-extensions opcache zip xsl dom exif intl pcntl bcmath sockets pdo_pgsql \
    && apk del --no-cache ${PHPIZE_DEPS} ${BUILD_DEPENDS}

# Set working directory
WORKDIR /app

# Set Composer environment variables
ENV COMPOSER_ALLOW_SUPERUSER=1

# Install Composer
COPY --from=composer:2.3 /usr/bin/composer /usr/bin/composer

# Copy composer files from app directory to install dependencies
COPY ./composer.* ./

RUN composer install --optimize-autoloader --no-dev

# Stage 2: RoadRunner
FROM ghcr.io/roadrunner-server/roadrunner:2023.1.1 AS roadrunner

# Stage 3: Final image
FROM backend

# Copy RoadRunner binary from the roadrunner stage
COPY --from=roadrunner /usr/bin/rr /app

# Expose RoadRunner port
EXPOSE 5005/tcp

# Copy application files
COPY . .

# Run RoadRunner server
CMD ["./rr", "serve", "-c", ".rr.yaml"]
