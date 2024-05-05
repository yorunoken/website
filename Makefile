.PHONY: build
build: clean
	@git pull
	go build -o yorunoken_com

.PHONY: run
run: build
	@./yorunoken_com

.PHONY: clean
clean:
	rm -rf ./yorunoken_com