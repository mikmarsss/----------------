package apparel

import (
	"crypto/md5"
	"encoding/hex"
	"os"
	"time"
)

// ExistsFile
func ExistsFile(name string) bool {
	if _, err := os.Stat(name); err != nil {
		if os.IsNotExist(err) {
			return false
		}
	}
	return true
}

// MD5 Hash string with MD5 algorithm
func MD5(text string) string {
	algorithm := md5.New()
	algorithm.Write([]byte(text))
	return hex.EncodeToString(algorithm.Sum(nil))
}

// TimestampUnix make time in Unix
func TimestampUnix() int64 {
	return time.Now().Unix()
}
