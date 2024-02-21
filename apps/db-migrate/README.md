## Installation

Install go-migrate using scoop package manager if you are using windows

```bash
 $ scoop install migrate
```

If you are using mac

```bash
 $ brew install golang-migrate
```

After that if you are using windows make sure to install make using chocolatey package manager

```bash
choco install make
```

Rename the .env.example to .env and adjust the database url based on your database url

You can freely edit the command by making changes in the Makefile, but by default it runs like this

Run the following command from the project directory which is 'db-migrate' if you want to create a new migration

```bash
make migrate-create=${MIGRATION_NAME}
```

To run all migration

```bash
make migrate-up
```

To drop all migration

```bash
make migrate-down
```

Further information about the docs please refer to
https://github.com/golang-migrate/migrate/blob/master/GETTING_STARTED.md
