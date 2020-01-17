publish:
	npm publish --dry-run

install: install-deps
	npm install

test:
	npm test

test-coverage:
	npm test -- --coverage

lint:
	npx eslint .
