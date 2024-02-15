package api

import "errors"

var (
	errorInvalidCourseId = errors.New("course id is incorrect")
	errorInvalidUserId   = errors.New("user id is incorrect")
)
