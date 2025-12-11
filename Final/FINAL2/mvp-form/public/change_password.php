<?php
require_once __DIR__ . '/../presenter/ChangePasswordPresenter.php';

// Mock current user ID (in real app, get from session)
$currentUserId = 1;

// Callback to check current password
$currentPasswordCheck = function($enteredPassword) use ($currentUserId) {
    // fetch hash from DB e.g. $hash = UserRepo::getPasswordHash($currentUserId);
    // return password_verify($enteredPassword, $hash);
    // demo: assume current password text is "secret@123"
    return password_verify($enteredPassword, password_hash('secret@123', PASSWORD_DEFAULT));
};

$presenter = new ChangePasswordPresenter();
$response = $presenter->handle($_POST, $currentPasswordCheck);
$errors = $response['errors'] ?? [];
$success = $response['success'] ?? false;
?>
<!doctype html>
<html><head><meta charset="utf-8"><title>Change Password</title></head><body>
<?php if ($success): ?>
  <div style="color:green">Password changed successfully.</div>
<?php endif; ?>
<form method="post" action="">
  <label>Current Password:
    <input type="password" name="current_password">
    <span style="color:red"><?= $errors['current_password'] ?? '' ?></span>
  </label><br>
  <label>New Password:
    <input type="password" name="new_password">
    <span style="color:red"><?= $errors['new_password'] ?? '' ?></span>
  </label><br>
  <label>Retype New Password:
    <input type="password" name="retype_password">
    <span style="color:red"><?= $errors['retype_password'] ?? '' ?></span>
  </label><br>
  <button type="submit">Change Password</button>
</form>
</body></html>
