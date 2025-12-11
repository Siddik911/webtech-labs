<?php
require_once __DIR__ . '/../presenter/RegisterPresenter.php';
$presenter = new RegisterPresenter();
$response = $presenter->handle($_POST);
$errors = $response['errors'] ?? [];
$values = $response['values'] ?? [];
$success = $response['success'] ?? false;
?>
<!doctype html>
<html><head><meta charset="utf-8"><title>Register</title></head><body>
<?php if ($success): ?>
  <div style="color:green">Registration successful.</div>
<?php endif; ?>
<form method="post" action="">
  <label>Full Name:
    <input name="fullname" value="<?=htmlspecialchars($values['fullname'] ?? '')?>">
    <span style="color:red"><?= $errors['fullname'] ?? '' ?></span>
  </label><br>
  <label>Email:
    <input name="email" value="<?=htmlspecialchars($values['email'] ?? '')?>">
    <span style="color:red"><?= $errors['email'] ?? '' ?></span>
  </label><br>
  <label>Username:
    <input name="username" value="<?=htmlspecialchars($values['username'] ?? '')?>">
    <span style="color:red"><?= $errors['username'] ?? '' ?></span>
  </label><br>
  <label>Password:
    <input type="password" name="password">
    <span style="color:red"><?= $errors['password'] ?? '' ?></span>
  </label><br>
  <label>Confirm Password:
    <input type="password" name="confirm_password">
    <span style="color:red"><?= $errors['confirm_password'] ?? '' ?></span>
  </label><br>
  <button type="submit">Register</button>
</form>
</body></html>
