install:
	npm install

start:
	npx gulp dev

build:
	NODE_ENV=production npx gulp prod

start-production: build
	NODE_ENV=test node dist/bin/server.js

webpack-bundle:
	NODE_ENV=production npx wp

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .
