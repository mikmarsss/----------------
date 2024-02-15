package models

const (
	ProgrammType = 1
)

type CourseInfo struct {
	Id             int64   `json:"id"`
	Name           string  `json:"name"`
	Price          float64 `json:"price"`
	Rating         float64 `json:"rating"`
	People         int64   `json:"people"`
	Time           int64   `json:"time"`
	Img            string  `json:"img"`
	Description    string  `json:"description"`
	CourseContent  string  `json:"course_content"`
	CreatorId      int64   `json:"creator_id"`
	Type           int64   `json:"type"`
	AdditionalType []int64 `json:"additional_type"`
	CreatedAt      int64   `json:"created_at"`
	UpdatedAt      int64   `json:"updated_at"`
}

func NewCourseInfo() *CourseInfo {
	return &CourseInfo{}
}
