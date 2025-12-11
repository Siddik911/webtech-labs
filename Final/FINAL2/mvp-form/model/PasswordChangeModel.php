<?php
// model/PasswordChangeModel.php
require_once __DIR__ . '/../lib/helpers.php';
class PasswordChangeModel {
    public function validate(array $data, callable $currentPasswordCheck): array {
        $errors = [];
        $current = $data['current_password'] ?? '';
        $new     = $data['new_password'] ?? '';
        $retype  = $data['retype_password'] ?? '';

        if ($current === '') $errors['current_password'] = 'Current password required.';
        // currentPasswordCheck is a function that checks current password correctness
        if (!empty($current) && !$currentPasswordCheck($current)) {
            $errors['current_password'] = 'Current password incorrect.';
        }
        if (!is_valid_password($new, 8)) {
            $errors['new_password'] = 'New password must be >=8 chars and include @,#,$,%';
        }
        if ($new === $current) {
            $errors['new_password'] = 'New password should not be the same as current password.';
        }
        if ($new !== $retype) {
            $errors['retype_password'] = 'New password and retyped password must match.';
        }
        return $errors;
    }
}
