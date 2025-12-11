<?php
require_once __DIR__ . '/../presenter/LoginPresenter.php';
$presenter = new LoginPresenter();
$response = $presenter->handle($_POST);
$errors = $response['errors'] ?? [];
$values = $response['values'] ?? [];
$success = $response['success'] ?? false;
?>
<!doctype html>
<html><head><meta charset="utf-8"><title>Login</title></head><body>
<?php if ($success): ?>
  <div style="color:green">Login successful.</div>
<?php endif; ?>
<form method="post" action="">
  <label>Username:
    <input name="username" value="<?=htmlspecialchars($values['username'] ?? '')?>">
    <span style="color:red"><?= $errors['username'] ?? '' ?></span>
  </label><br>
  <label>Password:
    <input type="password" name="password">
    <span style="color:red"><?= $errors['password'] ?? '' ?></span>
  </label><br>
  <button type="submit">Login</button>
</form>
</body></html>
