package validator

type ValidationResponse struct {
	Msg  string `json:"msg"`
	Path string `json:"path"`
}
type Validator struct {
	//Errors map[string]string
	Errors []ValidationResponse
}

// New is a helper which creates a new Validator instance with an empty errors map.
func New() *Validator {
	//return &Validator{Errors: make(map[string]string)}
	return &Validator{}
}

// Valid returns true if the errors map doesn't contain any entries.
func (v *Validator) Valid() bool {
	return len(v.Errors) == 0
}

// AddError adds an error message to the map (so long as no entry already exists for the given key)
func (v *Validator) AddError(key, message string) {
	//if _, exists := v.Errors[key]; !exists {
	//	v.Errors[key] = message
	//}
	v.Errors = append(v.Errors, ValidationResponse{Msg: message, Path: key})
}

// In returns true if a specific value is in a list of strings.
func In(value string, list ...string) bool {
	for i := range list {
		if value == list[i] {
			return true
		}
	}
	return false
}

// Check adds an error message to the map only if a validation check is not 'ok'.
func (v *Validator) Check(ok bool, key, message string) {
	if !ok {
		v.AddError(key, message)
	}
}
