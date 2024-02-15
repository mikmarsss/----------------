package psql

import (
	"context"
	"fmt"
	"github.com/jackc/pgx/v5"
	"strconv"
	"web-lessons/internal/app/apparel"
	"web-lessons/internal/app/models"
)

type moduleLessonsRepository struct {
	repository
}

func (mlr *moduleLessonsRepository) TableName() string {
	return "module_lessons"
}

func (mlr moduleLessonsRepository) CreateLesson(ctx context.Context, tx pgx.Tx, number, courseModuleId, name, imgPath, content, material string) (*models.ModuleLesson, error) {
	lesson := models.ModuleLesson{}

	num, _ := strconv.ParseInt(number, 10, 64)
	courseId, _ := strconv.ParseInt(courseModuleId, 10, 64)

	ts := apparel.TimestampUnix()
	sqlStatement := fmt.Sprintf("INSERT INTO %s(number, name, img, content, material, course_module_id, created_at, updated_at) "+
		"VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id", mlr.TableName())

	var err error
	var id int64

	if tx == nil {
		err = mlr.database.Pool.QueryRow(ctx, sqlStatement, num, name, imgPath, content, material, courseId, ts, ts).Scan(&id)
		fmt.Println("GG1")
		if err != nil {
			return nil, err
		}
	} else {
		err = tx.QueryRow(ctx, fmt.Sprintf("INSERT INTO %s(number, name, img, content, material, course_module_id, created_at, updated_at) "+
			"VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id", mlr.TableName()),
			num, name, imgPath, content, material, courseId, ts, ts).Scan(&id)
		if err != nil {
			fmt.Println("GG2")
			return nil, err
		}
	}
	sqlSelect := fmt.Sprintf("SELECT * FROM %s WHERE id = $1", mlr.TableName())

	if tx == nil {
		err = mlr.database.Pool.QueryRow(ctx, sqlSelect, id).Scan(&lesson.Id, &lesson.Number, &lesson.Name, &lesson.Img, &lesson.Content, &lesson.Material, &lesson.CourseModuleId, &lesson.CreatedAt, &lesson.UpdatedAt)
		if err != nil {
			fmt.Println("GG3")
			return nil, err
		}
	} else {
		err = tx.QueryRow(ctx, sqlSelect, id).Scan(&lesson.Id, &lesson.Number, &lesson.Name, &lesson.Img, &lesson.Content, &lesson.Material, &lesson.CourseModuleId, &lesson.CreatedAt, &lesson.UpdatedAt)
		if err != nil {
			fmt.Println("GG4")
			return nil, err
		}
	}

	return &lesson, nil
}
