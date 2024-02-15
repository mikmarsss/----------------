package psql

import (
	"context"
	"fmt"
	"log"
	"web-lessons/internal/app/models"

	"github.com/georgysavva/scany/v2/pgxscan"
)

type courseInfoRepository struct {
	repository
}

func (cir *courseInfoRepository) TableName() string {
	return "course_infos"
}

func (cir *courseInfoRepository) GetById(ctx context.Context, id int64) (*models.CourseInfo, error) {
	courseInfo := models.CourseInfo{}

	err := pgxscan.Get(ctx, cir.database.Pool, &courseInfo, fmt.Sprintf("SELECT * FROM %s WHERE id = $1", cir.TableName()), id)
	if err != nil {
		return nil, err
	}

	return &courseInfo, err
}

func (cir *courseInfoRepository) GetAll(ctx context.Context) ([]*models.CourseInfo, error) {
	courseInfosArray := make([]*models.CourseInfo, 0)

	err := pgxscan.Select(ctx, cir.database.Pool, &courseInfosArray, fmt.Sprintf("SELECT * FROM %s",
		cir.TableName()))
	if err != nil {
		return nil, err
	}

	return courseInfosArray, err
}

func (cir *courseInfoRepository) GetByAdditionalIds(ctx context.Context, typeIds []int64) ([]*models.CourseInfo, error) {
	courseInfosArray := make([]*models.CourseInfo, 0)

	err := pgxscan.Select(ctx, cir.database.Pool, &courseInfosArray, fmt.Sprintf("SELECT * FROM %s WHERE additional_type && $1::int[]", cir.TableName()), typeIds)
	if err != nil {
		log.Fatalf("Ошибка при выполнении запроса: %v", err)
	}

	return courseInfosArray, err
}

func (cir *courseInfoRepository) GetByTypeId(ctx context.Context, typeId int64) ([]*models.CourseInfo, error) {
	courseInfosArray := make([]*models.CourseInfo, 0)

	err := pgxscan.Select(ctx, cir.database.Pool, &courseInfosArray, fmt.Sprintf("SELECT * FROM %s WHERE type = $1", cir.TableName()), typeId)
	if err != nil {
		log.Fatalf("Ошибка при выполнении запроса: %v", err)
	}

	return courseInfosArray, err
}
