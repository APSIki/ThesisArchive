package db

import (
	"database/sql"
	"fmt"
	"github.com/spf13/viper"
)

type Service struct {
	db            *sql.DB
}

func NewServiceFromConfig() (*Service, error) {
	sqlDB, err := ConnectDB()
	if err != nil {
		return nil, fmt.Errorf("init DB failed: %v", err)
	}
	return &Service{
		db: sqlDB,
	}, nil
}

func ConnectDB() (*sql.DB, error) {
	host := viper.GetString("database.host")
	port := viper.GetInt("database.port")
	user := viper.GetString("database.user_name")
	password := viper.GetString("database.password")
	dbName := viper.GetString("database.db_name")
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbName)
	fmt.Println(psqlInfo)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		return nil, err
	}
	defer db.Close() //TODO remove since it will be used elsewhere

	err = db.Ping()
	if err != nil {
		return nil, err //TODO add retry
	}
	return db, nil
}