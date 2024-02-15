package psql

// Config
type Config struct {
	Host     string `toml:"host"`
	User     string `toml:"user"`
	Password string `toml:"password"`
	Dbname   string `toml:"dbname"`
	Port     int64  `toml:"port"`
}

// NewConfig
func NewConfig() *Config {
	return &Config{}
}
