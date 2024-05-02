package utils

import "os"

func GetPort(port string) string {
	if envPort := os.Getenv("PORT"); envPort != "" {
		return ":" + envPort
	}
	return ":" + port
}
