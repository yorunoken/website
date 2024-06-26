package endpoint

import (
	"fmt"
	"fun-api/utils"
	"net/http"
	"os"
)

func Forum(w http.ResponseWriter, r *http.Request) {
	webhookUrl := os.Getenv("FORM_DISCORD_WEBHOOK")

	username := r.FormValue("username")
	message := r.FormValue("message")
	ip := getClientIP(r)

	content := fmt.Sprintf("# New form from `%s`\n```%s```\n## Details\n```ip: %s```", username, message, ip)

	data := map[string]string{"content": content}
	if _, err := utils.Post(webhookUrl, data); err != nil {
		fmt.Println(err)
		fmt.Fprintf(w, `There was an error: %s`, err)
		return
	}

	http.Redirect(w, r, "/", http.StatusPermanentRedirect)
}

// this is purely for catching naughty people who might spam my webhook.
// no information is stored.
func getClientIP(r *http.Request) string {
	IPAddress := r.Header.Get("X-Real-Ip")

	if IPAddress == "" {
		IPAddress = r.Header.Get("X-Forwarded-For")
	}

	if IPAddress == "" {
		IPAddress = r.RemoteAddr
	}
	return IPAddress
}
