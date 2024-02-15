package api

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"time"
	"web-lessons/internal/app/database"

	"github.com/google/uuid"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/sirupsen/logrus"
)

// Server
type Server struct {
	config   *Config
	router   *mux.Router
	logger   *logrus.Logger
	database database.Database
}

const (
	ctxKeyUser ctxKey = iota
	ctxKeyRequestID
)

// ctxKey
type ctxKey int64

// New
func New(config *Config, database database.Database) *Server {
	return &Server{
		config:   config,
		router:   mux.NewRouter(),
		logger:   logrus.New(),
		database: database,
	}
}

// Start
func (s *Server) Start(result chan<- error) {
	s.logger.Info("starting rest api server")
	result <- http.ListenAndServe(s.config.Port, s.router)
}

/*// StartTLS
func (s *Server) StartTLS(result chan<- error) {
	s.logger.Info("starting rest api tls server")
	result <- http.ListenAndServeTLS(s.config.Port, s.config.SecureCRTPath, s.config.SecureKeyPath, s.router)
}*/

// Configure
func (s *Server) Configure() error {
	if err := s.configureRouter(); err != nil {
		return err
	}

	if err := s.configureLogger(); err != nil {
		return err
	}

	return nil
}

// configureLogger
func (s *Server) configureLogger() error {
	level, err := logrus.ParseLevel(s.config.LogLevel)
	if err != nil {
		return err
	}

	s.logger.SetLevel(level)

	return nil
}

// configureRouter
func (s *Server) configureRouter() error {
	host := s.router

	if len(s.config.Domain) != 0 {
		host = s.router.Host(s.config.Domain).Subrouter()
	}

	// unauthorised user functions
	api := host.PathPrefix("/api").Subrouter()
	api.Use(s.setRequestID)
	api.Use(s.logRequest)
	api.Use(handlers.CORS(
		handlers.AllowedHeaders([]string{"content-type", "authorization", "Access-Control-Allow-Origin"}),
		handlers.AllowedMethods([]string{"GET", "POST", "OPTIONS"}),
		handlers.AllowedOrigins([]string{"http://localhost:3000"}),
		handlers.AllowCredentials(),
	))
	api.HandleFunc("/add-favourite-course", s.AddFavouriteCourse()).Methods(http.MethodPost, http.MethodOptions)
	api.HandleFunc("/add-done-course", s.AddDoneCourse()).Methods(http.MethodPost, http.MethodOptions)
	api.HandleFunc("/add-active-course", s.AddActiveCourse()).Methods(http.MethodPost, http.MethodOptions)
	api.HandleFunc("/add-module-lesson", s.AddModuleLesson()).Methods(http.MethodPost, http.MethodOptions)
	api.HandleFunc("/get-all-courses", s.GetAllCourses()).Methods(http.MethodGet, http.MethodOptions)
	api.HandleFunc("/get-course", s.GetCourseById()).Methods(http.MethodPost, http.MethodOptions)
	api.HandleFunc("/get-courses-by-types", s.GetCoursesByTypeIds()).Methods(http.MethodPost, http.MethodOptions)

	/*u := api.PathPrefix("/user").Subrouter()
	u.Use(s.authenticateUser)
	u.HandleFunc("/whoami", s.whoami()).Methods(http.MethodGet, http.MethodOptions)
	u.HandleFunc("/logout", s.logout()).Methods(http.MethodGet, http.MethodOptions)*/

	return nil
}

// addMiddleware
func (s *Server) addMiddleware(handler http.Handler, adapters ...func(http.Handler) http.Handler) func(http.ResponseWriter, *http.Request) {
	for i := len(adapters); i > 0; i-- {
		handler = adapters[i-1](handler)
	}
	return handler.ServeHTTP
}

// setRequestID
func (s *Server) setRequestID(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		id := uuid.New().String()
		w.Header().Set("X-Request-ID", id)
		next.ServeHTTP(w, r.WithContext(context.WithValue(r.Context(), ctxKeyRequestID, id)))
	})
}

// logRequest
func (s *Server) logRequest(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		logger := s.logger.WithFields(logrus.Fields{
			"remote_addr": r.RemoteAddr,
			"request_id":  r.Context().Value(ctxKeyRequestID),
		})
		logger.Infof("started %s %s", r.Method, r.RequestURI)

		start := time.Now()
		rw := &responseWriter{w, http.StatusOK}
		next.ServeHTTP(rw, r)

		var level logrus.Level
		switch {
		case rw.code >= 500:
			level = logrus.ErrorLevel
		case rw.code >= 400:
			level = logrus.WarnLevel
		default:
			level = logrus.InfoLevel
		}
		log.Println(rw.Header())
		logger.Logf(
			level,
			"completed with %d %s in %v",
			rw.code,
			http.StatusText(rw.code),
			time.Since(start),
		)
	})
}

// respond
func (s *Server) respond(w http.ResponseWriter, code int, data interface{}) {
	w.WriteHeader(code)
	if data != nil {
		_ = json.NewEncoder(w).Encode(data)
	}
}

// error
func (s *Server) error(w http.ResponseWriter, code int, err error) {
	s.respond(w, code, err.Error())
}

// createToken
/*func (s *Server) createToken(u *models.User, point *models.Point) (string, error) {
	u.AuthTimestamp = apparel.TimestampUnix()

	exp := apparel.TimestampUnix()

	atClaims := jwt.MapClaims{}
	atClaims["authorised"] = true
	atClaims["user_id"] = u.Id
	atClaims["exp"] = exp
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, atClaims)
	tokenString, err := token.SignedString([]byte(s.config.SessionKey))
	if err != nil {
		return "", err
	}

	s.memory.AddAuthUser(u, exp, point)

	return tokenString, nil
}*/

func (s *Server) Stop() {
	log.Println("Stopping server...")

	log.Println("Server stopped")
}
