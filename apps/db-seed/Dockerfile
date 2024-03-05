# Use the official PHP image as base
FROM php:8.1-fpm

# Install system dependencies and PHP extensions POSTGRES
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl \
    libzip-dev \
    libonig-dev \
    libxml2-dev \
    libxslt-dev \
    libwebp-dev \
    libpng-dev \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libxpm-dev \
    libvpx-dev \
    libgd-dev \
    libexif-dev \
    libxslt1-dev \
    libzip-dev \
    libssl-dev \
    libcurl4-openssl-dev \
    postgresql-client \
    libpq-dev


# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
# Install Postgre PDO
RUN apt-get install -y libpq-dev \
    && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install pdo pdo_pgsql pgsql

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set working directory
WORKDIR /seeder

# Copy composer.lock and composer.json
COPY composer.lock composer.json ./

# Install dependencies
RUN composer install --no-autoloader --no-scripts

# Copy existing application directory contents
COPY . .

CMD ["php-fpm", "&&", "php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
