package api

import (
	"github.com/sirupsen/logrus"
)

// Config
type Config struct {
	Port       string `toml:"port"`
	SessionKey string `toml:"session_key"`
	LogLevel   string `toml:"log_level"`
	Domain     string `toml:"domain"`
}

// NewConfig
func NewConfig() *Config {
	return &Config{
		Port:     ":13374",
		LogLevel: logrus.DebugLevel.String(),
	}
}
