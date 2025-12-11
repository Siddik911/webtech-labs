<?php
// model/RegistrationModel.php
require_once __DIR__ . '/../lib/helpers.php';
class RegistrationModel {
    public $fullname;
    public $email;
    public $username;
    private $password; // keep private
    public function validate(array $data): array {
        $errors = [];
        $this->fullname = isset($data['fullname']) ? sanitize($data['fullname']) : '';
        $this->email    = isset($data['email'])    ? sanitize($data['email']) : '';
        $this->username = isset($data['username']) ? sanitize($data['username']) : '';
        $pwd           = $data['password'] ?? '';
        $cpwd          = $data['confirm_password'] ?? '';

        if ($this->fullname === '') $errors['fullname'] = 'Full name is required.';
        if ($this->email === '' || !filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'Valid email is required.';
        }
        if (!is_valid_username($this->username, 5)) {
            $errors['username'] = 'Username must be >=5 chars and contain only letters, numbers, ., -, _.';
        }
        if (!is_valid_password($pwd, 8)) {
            $errors['password'] = 'Password must be >=8 chars and include one special char (@,#,$,%).';
        }
        if ($pwd !== $cpwd) {
            $errors['confirm_password'] = 'Passwords do not match.';
        }
        if (empty($pwd)) $errors['password'] = $errors['password'] ?? 'Password required';

        // if no errors, set password (hash for storage)
        if (empty($errors)) {
            $this->password = password_hash($pwd, PASSWORD_DEFAULT);
        }
        return $errors;
    }
}
