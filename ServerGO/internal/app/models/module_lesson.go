package models

type ModuleLesson struct {
	Id             int64  `json:"id"`
	Number         int64  `json:"number"`
	Name           string `json:"name"`
	Img            string `json:"img"`
	Content        string `json:"content"`
	Material       string `json:"material"`
	CourseModuleId int64  `json:"course_module_id"`
	CreatedAt      int64  `json:"created_at"`
	UpdatedAt      int64  `json:"updated_at"`
}
