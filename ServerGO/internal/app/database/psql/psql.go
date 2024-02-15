package psql

import (
	"context"
	"fmt"
	"github.com/jackc/pgx/v5/pgxpool"
	"web-lessons/internal/app/database"
)

// Database
type Database struct {
	config *Config
	Pool   *pgxpool.Pool

	favouriteCoursesR *favouredCoursesRepository
	doneCoursesR      *doneCoursesRepository
	activeCoursesR    *activeCoursesRepository
	moduleLessonsR    *moduleLessonsRepository
	courseInfoR       *courseInfoRepository
}

// New
func New(config *Config) *Database {
	return &Database{
		config: config,
	}
}

// Open
func (db *Database) Open() error {
	pool, err := pgxpool.New(context.Background(), fmt.Sprintf("postgresql://%s:%s@%s:%d/%s", db.config.User,
		db.config.Password, db.config.Host, db.config.Port, db.config.Dbname))
	if err != nil {
		return err
	}

	if err := pool.Ping(context.Background()); err != nil {
		return err
	}

	db.Pool = pool

	/*if err := db.loadData(); err != nil {
		return err
	}*/

	return nil
}

// Close
func (db *Database) Close() {
	db.Pool.Close()
}

// FavouriteCourses
func (db *Database) FavouriteCourses() database.FavouriteCoursesRepositoryInterface {
	if db.favouriteCoursesR != nil {
		return db.favouriteCoursesR
	}

	db.favouriteCoursesR = &favouredCoursesRepository{repository: repository{database: db}}

	return db.favouriteCoursesR
}

// DoneCourses
func (db *Database) DoneCourses() database.DoneCoursesRepositoryInterface {
	if db.doneCoursesR != nil {
		return db.doneCoursesR
	}

	db.doneCoursesR = &doneCoursesRepository{repository: repository{database: db}}

	return db.doneCoursesR
}

// ActiveCourses
func (db *Database) ActiveCourses() database.ActiveCoursesRepositoryInterface {
	if db.activeCoursesR != nil {
		return db.activeCoursesR
	}

	db.activeCoursesR = &activeCoursesRepository{repository: repository{database: db}}

	return db.activeCoursesR
}

// ModuleLessons
func (db *Database) ModuleLessons() database.ModuleLessonsRepositoryInterface {
	if db.moduleLessonsR != nil {
		return db.moduleLessonsR
	}

	db.moduleLessonsR = &moduleLessonsRepository{repository: repository{database: db}}

	return db.moduleLessonsR
}

// CourseInfo
func (db *Database) CourseInfo() database.CourseInfoRepositoryInterface {
	if db.courseInfoR != nil {
		return db.courseInfoR
	}

	db.courseInfoR = &courseInfoRepository{repository: repository{database: db}}

	return db.courseInfoR
}
