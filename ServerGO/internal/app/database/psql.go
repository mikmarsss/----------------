package database

// Database
type Database interface {
	FavouriteCourses() FavouriteCoursesRepositoryInterface
	DoneCourses() DoneCoursesRepositoryInterface
	ActiveCourses() ActiveCoursesRepositoryInterface
	ModuleLessons() ModuleLessonsRepositoryInterface
	CourseInfo() CourseInfoRepositoryInterface
}
