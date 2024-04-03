# SIAKAD Api Monorepo

This is SIAKAD Api repository.

## What's inside?

This repository includes the following packages and apps:

### Apps and Packages

- `docs`: api swagger documentation and postman collection
- `apps`: list of api service from SIAKAD
- `packages`: contain shared dependencies that used for express based api

### Build

To build all typescript apps and packages, run the following command:

```
npm run build
```
or

```
npx turbo build
```

### Develop

To develop all typescript apps and packages, run the following command:

```
npm run dev
```

or

```
npx turbo dev
```

# Database Migration Guide

To run the migration run this command on root project
```
docker-compose up --build migrate
```

To run the seeder run this command also

```
docker-compose up --build seed
```
