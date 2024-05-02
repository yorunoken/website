package utils

import (
	"io"
	"net/http"
)

func Get(url string, headers ...map[string]string) ([]byte, error) {
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}

	if len(headers) > 0 {
		for key, value := range headers[0] {
			req.Header.Add(key, value)
		}
	}

	client := http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	return body, nil
}

func Post(url string, payload io.Reader) ([]byte, error) {

	resp, err := http.Post(url, "application/json", payload)

	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	return body, nil
}
