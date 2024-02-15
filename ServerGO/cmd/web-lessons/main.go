package main

import (
	"flag"
	"github.com/BurntSushi/toml"
	"github.com/xlab/closer"
	"log"
	api_ "web-lessons/internal/app/api"
	psql_ "web-lessons/internal/app/database/psql"
)

var (
	databaseConfigPath string
	apiConfigPath      string
	serverType         string
)

func init() {
	flag.StringVar(&databaseConfigPath, "database-config-path", "configs/database.toml", "path to database config file")
	flag.StringVar(&apiConfigPath, "api-config-path", "configs/api.toml", "path to api config file")
	flag.StringVar(&serverType, "server-type", "http", "server type")
}

func main() {
	//configure store
	databaseConfig := psql_.NewConfig()
	_, err := toml.DecodeFile(databaseConfigPath, databaseConfig)
	if err != nil {
		log.Fatal("DATABASE CONFIG:", err)
	}

	database := psql_.New(databaseConfig)
	if err := database.Open(); err != nil {
		log.Fatal("DATABASE OPEN:", err)
	}

	defer database.Close()

	//configure api
	apiError := make(chan error)
	apiConfig := api_.NewConfig()
	_, err = toml.DecodeFile(apiConfigPath, &apiConfig)
	if err != nil {
		log.Fatal("API CONFIG:", err)
	}

	api := api_.New(apiConfig, database)
	if err := api.Configure(); err != nil {
		log.Fatal("API CONFIGURE:", err)
	}

	// run rest api server
	switch serverType {
	case "http":
		go api.Start(apiError)
	case "https":
		//go api.StartTLS(apiError)
	default:
		log.Fatal("Incorrect server type parameter")
	}

	closer.Bind(api.Stop)

	apiErr := <-apiError
	log.Fatal("api server error: ", apiErr)
}
