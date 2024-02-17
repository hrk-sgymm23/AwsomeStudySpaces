.PHONY: build
build:
	@docker compsoe build

.PHONY: up
up:
	@docker compose up -d

.PHONY: down
up:
	@docker compose down

.PHONY: exec front
exec-front:
	@docker-compose exec ass_front /bin/bash

.PHONY: exec api
exec-front:
	@docker-compose exec ass_api /bin/bash

.PHONY: exec db
exec-front:
	@docker-compose exec ass_sb /bin/bash
