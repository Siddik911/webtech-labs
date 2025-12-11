<?php
// presenter/LoginPresenter.php
require_once __DIR__ . '/../model/LoginModel.php';
class LoginPresenter {
    private $model;
    public function __construct(){ $this->model = new LoginModel(); }
    public function handle(array $post): array {
        $result = ['errors'=>[], 'values'=>[], 'success'=>false];
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $errors = $this->model->validate($post);
            $result['values'] = ['username'=>$this->model->username];
            if (empty($errors)) {
                // Normally verify credentials against DB (password_verify)
                // For demo assume success if validation passes
                $result['success'] = true;
            } else {
                $result['errors'] = $errors;
            }
        }
        return $result;
    }
}
