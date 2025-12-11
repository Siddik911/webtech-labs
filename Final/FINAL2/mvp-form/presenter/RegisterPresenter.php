<?php
// presenter/RegisterPresenter.php
require_once __DIR__ . '/../model/RegistrationModel.php';
class RegisterPresenter {
    private $model;
    public function __construct(){ $this->model = new RegistrationModel(); }
    public function handle(array $post): array {
        $result = ['errors'=>[], 'values'=>[], 'success'=>false];
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $errors = $this->model->validate($post);
            $result['values'] = [
                'fullname'=>$this->model->fullname,
                'email'=>$this->model->email,
                'username'=>$this->model->username
            ];
            if (empty($errors)) {
                // persist user (DB) — here we just mark success
                // e.g. User::create([...])
                $result['success'] = true;
            } else {
                $result['errors'] = $errors;
            }
        }
        return $result;
    }
}
