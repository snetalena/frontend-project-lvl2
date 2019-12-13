publish:
	npm publish --dry-run

install: install-deps
	npm install

install-deps:
	npm install --save-dev @babel/core @babel/cli @babel/node @babel/preset-env

test:
	npm test

make lint:
	npx eslint .
