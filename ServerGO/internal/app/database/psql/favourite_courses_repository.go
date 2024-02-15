package psql

import (
	"context"
	"fmt"
	"github.com/georgysavva/scany/v2/pgxscan"
	"github.com/jackc/pgx/v5"
	"web-lessons/internal/app/apparel"
)

type favouredCoursesRepository struct {
	repository
}

func (fc *favouredCoursesRepository) TableName() string {
	return "favorite_courses"
}

func (fc *favouredCoursesRepository) AddFavourite(ctx context.Context, tx pgx.Tx, userId, courseId int64) error {
	tx, err := fc.database.Pool.Begin(ctx)
	if err != nil {
		return err
	}
	ts := apparel.TimestampUnix()
	exits := false
	err = pgxscan.Get(ctx, tx, &exits, fmt.Sprintf("SELECT EXISTS(SELECT 1 FROM %s WHERE course_info_id = $1)", fc.TableName()), courseId)
	if exits {
		_, err = fc.database.Pool.Exec(ctx, fmt.Sprintf("DELETE FROM %s WHERE course_info_id = $1 ", fc.TableName()), courseId)
		return err
	} else {
		_, err = tx.Exec(ctx, fmt.Sprintf("INSERT INTO %s(created_at, updated_at, user_id, course_info_id) VALUES($1,$2,$3,$4)", fc.TableName()),
			ts, ts, userId, courseId)
		if err != nil {
			return err
		}
		return tx.Commit(ctx)
	}
}
