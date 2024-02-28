package api

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"image/jpeg"
	"image/png"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"web-lessons/internal/app/apparel"
	"web-lessons/internal/app/models"
)

func (s *Server) AddFavouriteCourse() http.HandlerFunc {
	type request struct {
		CourseId int64 `json:"course_id"`
		UserId   int64 `json:"user_id"`
	}

	return func(w http.ResponseWriter, r *http.Request) {
		req := &request{}
		if err := json.NewDecoder(r.Body).Decode(req); err != nil {
			s.error(w, http.StatusBadRequest, err)
			return
		}

		if req.CourseId <= 0 {
			s.error(w, http.StatusBadRequest, errorInvalidCourseId)
			return
		}

		if req.UserId <= 0 {
			s.error(w, http.StatusBadRequest, errorInvalidUserId)
			return
		}

		err := s.database.FavouriteCourses().AddFavourite(context.Background(), nil, req.UserId, req.CourseId)
		if err != nil {
			s.error(w, http.StatusBadRequest, err)
			return
		}

		s.respond(w, http.StatusOK, nil)
	}
}

func (s *Server) AddDoneCourse() http.HandlerFunc {
	type request struct {
		CourseId int64 `json:"course_id"`
		UserId   int64 `json:"user_id"`
	}

	return func(w http.ResponseWriter, r *http.Request) {
		req := &request{}
		if err := json.NewDecoder(r.Body).Decode(req); err != nil {
			s.error(w, http.StatusBadRequest, err)
			return
		}

		if req.CourseId <= 0 {
			s.error(w, http.StatusBadRequest, errorInvalidCourseId)
			return
		}

		if req.UserId <= 0 {
			s.error(w, http.StatusBadRequest, errorInvalidUserId)
			return
		}

		err := s.database.DoneCourses().DoneCourse(context.Background(), nil, req.UserId, req.CourseId)
		if err != nil {
			s.error(w, http.StatusBadRequest, err)
			return
		}

		s.respond(w, http.StatusOK, nil)
	}
}

func (s *Server) AddActiveCourse() http.HandlerFunc {
	type request struct {
		CourseId int64 `json:"course_id"`
		UserId   int64 `json:"user_id"`
	}

	return func(w http.ResponseWriter, r *http.Request) {
		req := &request{}
		if err := json.NewDecoder(r.Body).Decode(req); err != nil {
			s.error(w, http.StatusBadRequest, err)
			return
		}

		if req.CourseId <= 0 {
			s.error(w, http.StatusBadRequest, errorInvalidCourseId)
			return
		}

		if req.UserId <= 0 {
			s.error(w, http.StatusBadRequest, errorInvalidUserId)
			return
		}

		err := s.database.ActiveCourses().ActiveCourse(context.Background(), nil, req.UserId, req.CourseId)
		if err != nil {
			s.error(w, http.StatusBadRequest, err)
			return
		}

		s.respond(w, http.StatusOK, nil)
	}
}

func (s *Server) AddModuleLesson() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		err := r.ParseMultipartForm(32 << 20)
		if err != nil {
			s.error(w, http.StatusInternalServerError, err)
			return
		}

		numberForm := r.MultipartForm.Value["number"]
		nameForm := r.MultipartForm.Value["name"]
		imgForm := r.MultipartForm.File["img"]
		contentForm := r.MultipartForm.Value["content"]
		materialForm := r.MultipartForm.Value["material"]
		courseModuleIdForm := r.MultipartForm.Value["course_module_id"]
		var ImgDir = ""

		if len(numberForm[0]) < 0 {
			s.error(w, http.StatusBadRequest, errors.New("empty number form"))
			return
		}

		if len(nameForm[0]) < 0 {
			s.error(w, http.StatusBadRequest, errors.New("empty name form"))
			return
		}

		if len(contentForm[0]) < 0 {
			s.error(w, http.StatusBadRequest, errors.New("empty content form"))
			return
		}

		if len(materialForm[0]) < 0 {
			s.error(w, http.StatusBadRequest, errors.New("empty material form"))
			return
		}

		if len(courseModuleIdForm[0]) < 0 {
			s.error(w, http.StatusBadRequest, errors.New("empty course module id form"))
			return
		}

		if len(imgForm) > 0 {
			// 10485760 = 10 mb
			if imgForm[0].Size > 10485760 {
				s.error(w, http.StatusUnprocessableEntity, errors.New("incorrect image size"))
				return
			}

			newImg, err := imgForm[0].Open()
			if err != nil {
				s.error(w, http.StatusUnprocessableEntity, err)
				return
			}

			defer newImg.Close()

			buffer := make([]byte, 512)
			newImg.Read(buffer)
			newImg.Seek(0, io.SeekStart)
			if strings.Contains(http.DetectContentType(buffer), "image/png") {
				getImage, err := png.DecodeConfig(newImg)
				if err != nil {
					s.error(w, http.StatusUnprocessableEntity, err)
					return
				}

				if getImage.Height < 300 || getImage.Width < 300 || getImage.Height > 7000 || getImage.Width > 7000 {
					s.error(w, http.StatusUnprocessableEntity, errors.New("invalid image resolution"))
					return
				}
			} else if strings.Contains(http.DetectContentType(buffer), "image/jpeg") {
				getImage, err := jpeg.DecodeConfig(newImg)
				if err != nil {
					s.error(w, http.StatusUnprocessableEntity, err)
					return
				}

				if getImage.Height < 300 || getImage.Width < 300 || getImage.Height > 7000 || getImage.Width > 7000 {
					s.error(w, http.StatusUnprocessableEntity, errors.New("invalid image resolution"))
					return
				}
			} else {
				s.error(w, http.StatusUnprocessableEntity, errors.New("invalid image format"))
				return
			}

			// create dir in images dir if not exists
			imagesDir := fmt.Sprintf("images/%s", courseModuleIdForm[0])
			if !apparel.ExistsFile(imagesDir) {
				err := os.MkdirAll(imagesDir, 0755)
				if err != nil {
					s.error(w, http.StatusInternalServerError, err)
					return
				}
			}

			readDirectory, err := os.Open(imagesDir)
			if err != nil {
				s.logger.Errorln("open images dir:", err)
				s.error(w, http.StatusInternalServerError, err)
				return
			}

			allImages, err := readDirectory.Readdir(0)
			if err != nil {
				s.logger.Errorln("read images dir:", err)
				s.error(w, http.StatusInternalServerError, err)
				return
			}

			if len(allImages) > 0 {
				for _, file := range allImages {
					if !file.IsDir() {
						filePath := filepath.Join(imagesDir, file.Name())
						err := os.Remove(filePath)
						if err != nil {
							s.logger.Errorln("remove old images files:", err)
							s.error(w, http.StatusInternalServerError, err)
							return
						}
					}
				}
			}

			fileName := apparel.MD5(strconv.FormatInt(apparel.TimestampUnix(), 10))

			// save image in images dir
			imagePath := fmt.Sprintf("%s/%s.png", imagesDir, fileName)
			f, err := os.OpenFile(imagePath, os.O_WRONLY|os.O_CREATE, 0644)
			if err != nil {
				s.error(w, http.StatusInternalServerError, err)
				return
			}
			defer f.Close()

			_, err = newImg.Seek(0, io.SeekStart)
			if err != nil {
				return
			}

			_, err = io.Copy(f, newImg)
			if err != nil {
				s.error(w, http.StatusInternalServerError, err)
				return
			}

			ImgDir = imagePath
		}

		module, err := s.database.ModuleLessons().CreateLesson(context.Background(), nil, numberForm[0], courseModuleIdForm[0], nameForm[0], ImgDir,
			contentForm[0], materialForm[0])
		if err != nil {
			s.error(w, http.StatusBadRequest, err)
			return
		}

		s.respond(w, http.StatusOK, map[string]interface{}{
			"module": module,
		})
	}
}

func (s *Server) GetAllCourses() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		courses, err := s.database.CourseInfo().GetAll(context.Background())
		if err != nil {
			s.error(w, http.StatusBadRequest, err)
			return
		}

		s.respond(w, http.StatusOK, map[string]interface{}{
			"courses": courses,
		})
	}
}

func (s Server) GetCourseById() http.HandlerFunc {
	type request struct {
		CourseId string `json:"course_id"`
	}
	return func(w http.ResponseWriter, r *http.Request) {
		req := &request{}
		if err := json.NewDecoder(r.Body).Decode(req); err != nil {
			s.error(w, http.StatusBadRequest, err)
			return
		}
		fmt.Println("course_id: ", req.CourseId)
		courseId, err := strconv.Atoi(req.CourseId)
		if err != nil {
			fmt.Println(err)

			http.Error(w, "Invalid course ID", http.StatusBadRequest)
			return
		}
		fmt.Println("course_id1: ", courseId)
		if courseId <= 0 {
			fmt.Println(courseId)
			s.error(w, http.StatusBadRequest, errorInvalidCourseId)
			return
		}

		course, err := s.database.CourseInfo().GetById(context.Background(), int64(courseId))
		if err != nil {
			fmt.Println(err)
			s.error(w, http.StatusBadRequest, err)
			return
		}

		s.respond(w, http.StatusOK, map[string]interface{}{
			"course": course,
		})
	}
}

func (s *Server) GetCoursesByTypeIds() http.HandlerFunc {
	type request struct {
		TypeId            int64   `json:"type"`
		AdditionalTypeIds []int64 `json:"additional_type"`
	}
	return func(w http.ResponseWriter, r *http.Request) {
		req := &request{}
		if err := json.NewDecoder(r.Body).Decode(req); err != nil {
			s.error(w, http.StatusBadRequest, err)
			return
		}

		var courses []*models.CourseInfo
		if len(req.AdditionalTypeIds) > 0 && req.TypeId > 0 {
			// ищу по массиву инту
			var err error
			courses, err = s.database.CourseInfo().GetByAdditionalIds(context.Background(), req.AdditionalTypeIds)
			if err != nil {
				s.error(w, http.StatusBadRequest, err)
				return
			}
		} else if req.TypeId > 0 {
			// ищу по тайпу
			var err error
			courses, err = s.database.CourseInfo().GetByTypeId(context.Background(), req.TypeId)
			if err != nil {
				s.error(w, http.StatusBadRequest, err)
				return
			}
		}

		s.respond(w, http.StatusOK, map[string]interface{}{
			"courses": courses,
		})
	}
}
