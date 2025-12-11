<?php
// lib/helpers.php
function sanitize($s) {
    return htmlspecialchars(trim((string)$s), ENT_QUOTES, 'UTF-8');
}

function is_valid_username($u, $minLen=2) {
    if (strlen($u) < $minLen) return false;
    // allowed: letters, digits, ., -, _
    return preg_match('/^[A-Za-z0-9._-]+$/', $u);
}

function is_valid_password($p, $minLen=8) {
    if (strlen($p) < $minLen) return false;
    // must contain at least one of @ # $ %
    return preg_match('/[@#\$%]/', $p);
}
