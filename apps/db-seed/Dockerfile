# Stage 1: Build
FROM php:8.3-cli-alpine as builder

# Install system dependencies and PHP extensions for PostgreSQL
RUN apk add --no-cache postgresql-client libpq-dev libzip-dev zip unzip \
    && docker-php-ext-install pdo pdo_pgsql pgsql \
    && apk del postgresql-client libzip-dev zip unzip

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set working directory
WORKDIR /seeder

# Copy composer.lock and composer.json
COPY composer.lock composer.json ./

# Install dependencies
RUN composer install --no-scripts --optimize-autoloader

# Copy existing application directory contents
COPY . .

# Stage 2: Slim Image
FROM php:8.3-cli-alpine

# Install PostgreSQL client
RUN apk add --no-cache postgresql-client libpq-dev

# Copy only necessary files from the builder
COPY --from=builder /seeder /seeder
COPY --from=builder /usr/local/lib/php/extensions/no-debug-non-zts-*/ /usr/local/lib/php/extensions/no-debug-non-zts-*/

# Enable the PostgreSQL extension
RUN docker-php-ext-install pdo pdo_pgsql pgsql

WORKDIR /seeder

CMD ["php", "artisan", "db:seed", "--force"]
