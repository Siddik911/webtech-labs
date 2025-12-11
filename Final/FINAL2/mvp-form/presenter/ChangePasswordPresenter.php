<?php
// presenter/ChangePasswordPresenter.php
require_once __DIR__ . '/../model/PasswordChangeModel.php';
class ChangePasswordPresenter {
    private $model;
    public function __construct(){ $this->model = new PasswordChangeModel(); }
    public function handle(array $post, callable $currentPasswordCheck): array {
        $result = ['errors'=>[], 'success'=>false];
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $errors = $this->model->validate($post, $currentPasswordCheck);
            if (empty($errors)) {
                // update hashed password in DB
                $result['success'] = true;
            } else {
                $result['errors'] = $errors;
            }
        }
        return $result;
    }
}
