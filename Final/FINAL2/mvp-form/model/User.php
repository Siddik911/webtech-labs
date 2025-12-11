<?php
// model/User.php
class User {
    public $id;
    public $username;
    public $email;
    public $fullname;
    
    // In a real application, this class would map to a database table
    public function __construct($username = '', $email = '', $fullname = '') {
        $this->username = $username;
        $this->email = $email;
        $this->fullname = $fullname;
    }
}
