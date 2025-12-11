<?php
// model/LoginModel.php
require_once __DIR__ . '/../lib/helpers.php';
class LoginModel {
    public $username;
    // Note: for real app you'd fetch hashed password from DB
    public function validate(array $data): array {
        $errors = [];
        $this->username = isset($data['username']) ? sanitize($data['username']) : '';
        $pwd = $data['password'] ?? '';

        if (!is_valid_username($this->username, 2)) {
            $errors['username'] = 'Username must be at least 2 chars and valid characters only.';
        }
        if (!is_valid_password($pwd, 8)) {
            $errors['password'] = 'Password invalid (min 8 chars & one of @,#,$,%)';
        }
        // In a real app, also verify credentials against DB (password_verify)
        return $errors;
    }
}
