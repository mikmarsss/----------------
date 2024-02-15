package database

import (
	"context"
	"web-lessons/internal/app/models"

	"github.com/jackc/pgx/v5"
)

type RepositoryInterface interface {
	TableName() string
}

type FavouriteCoursesRepositoryInterface interface {
	RepositoryInterface

	//AddFavourite
	AddFavourite(ctx context.Context, tx pgx.Tx, userId, courseId int64) error
}

type DoneCoursesRepositoryInterface interface {
	RepositoryInterface

	//AddFavourite
	DoneCourse(ctx context.Context, tx pgx.Tx, userId, courseId int64) error
}

type ActiveCoursesRepositoryInterface interface {
	RepositoryInterface

	//AddFavourite
	ActiveCourse(ctx context.Context, tx pgx.Tx, userId, courseId int64) error
}

type ModuleLessonsRepositoryInterface interface {
	RepositoryInterface

	//CreateLesson
	CreateLesson(ctx context.Context, tx pgx.Tx, number, courseModuleId, name, imgPath, content, material string) (*models.ModuleLesson, error)
}

type CourseInfoRepositoryInterface interface {
	RepositoryInterface

	GetById(ctx context.Context, id int64) (*models.CourseInfo, error)
	GetAll(ctx context.Context) ([]*models.CourseInfo, error)
	GetByAdditionalIds(ctx context.Context, typeIds []int64) ([]*models.CourseInfo, error)
	GetByTypeId(ctx context.Context, typeId int64) ([]*models.CourseInfo, error)
}
