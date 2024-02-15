package psql

import (
	"context"
	"fmt"
	"github.com/jackc/pgx/v5"
	"web-lessons/internal/app/apparel"
)

type activeCoursesRepository struct {
	repository
}

func (acr *activeCoursesRepository) TableName() string {
	return "active_courses"
}

func (acr *activeCoursesRepository) ActiveCourse(ctx context.Context, tx pgx.Tx, userId, courseId int64) error {
	ts := apparel.TimestampUnix()
	sqlStatement := fmt.Sprintf("INSERT INTO %s(created_at, updated_at, user_id, course_info_id) VALUES($1,$2,$3,$4) RETURNING id", acr.TableName())

	if tx == nil {
		_, err := acr.database.Pool.Exec(ctx, sqlStatement, ts, ts, userId, courseId)
		return err
	} else {
		_, err := tx.Exec(ctx, fmt.Sprintf("INSERT INTO %s(created_at, updated_at, user_id, course_info_id) VALUES($1,$2,$3,$4)", acr.TableName()),
			ts, ts, userId, courseId)
		return err
	}
}
