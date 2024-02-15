package psql

import (
	"context"
	"fmt"
	"github.com/jackc/pgx/v5"
	"web-lessons/internal/app/apparel"
)

type doneCoursesRepository struct {
	repository
}

func (dcr *doneCoursesRepository) TableName() string {
	return "done_courses"
}

func (dcr *doneCoursesRepository) DoneCourse(ctx context.Context, tx pgx.Tx, userId, courseId int64) error {
	ts := apparel.TimestampUnix()
	sqlStatement := fmt.Sprintf("INSERT INTO %s(user_id, course_info_id, created_at, updated_at) VALUES($1,$2,$3,$4) RETURNING id", dcr.TableName())

	if tx == nil {
		_, err := dcr.database.Pool.Exec(ctx, sqlStatement, userId, courseId, ts, ts)
		return err
	} else {
		_, err := tx.Exec(ctx, fmt.Sprintf("INSERT INTO %s(user_id, course_info_id, created_at, updated_at) VALUES($1,$2,$3,$4)", dcr.TableName()),
			userId, courseId, ts, ts)
		return err
	}
}
