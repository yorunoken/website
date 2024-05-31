package endpoint

import (
	"encoding/json"
	"fun-api/utils"
	"net/http"
	"os"
)

func Playlist(w http.ResponseWriter, r *http.Request) {
	entries, err := os.ReadDir("./music")

	if err != nil {
		utils.WriteError(w, "couldn't find folder `music`")
		return
	}

	var songs []string

	for _, entry := range entries {
		if !entry.IsDir() {
			songs = append(songs, entry.Name())
		}
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(songs); err != nil {
		utils.WriteError(w, "failed to encode songs to JSON")
		return
	}
}
