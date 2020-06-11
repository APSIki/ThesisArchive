FROM golang:1.14

WORKDIR /build

COPY go.mod .
RUN go mod download

COPY . .
RUN go build -o pkg/main .

WORKDIR /dist
RUN cp /build/main .

EXPOSE 8088
ENTRYPOINT ["/dist/main"]
