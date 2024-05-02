package utils

import (
	"net/http"
	"strings"
)

func MediaRedirector(w http.ResponseWriter, r *http.Request) {
	requestedFile := "." + r.URL.Path

	if strings.HasSuffix(requestedFile, ".jpg") || strings.HasSuffix(requestedFile, ".png") || strings.HasSuffix(requestedFile, ".svg") {
		http.ServeFile(w, r, requestedFile)
		return
	}

	http.NotFound(w, r)
}
