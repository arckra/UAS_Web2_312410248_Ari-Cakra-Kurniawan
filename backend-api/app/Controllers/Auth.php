<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class Auth extends ResourceController
{
    public function login()
    {
        $email    = $this->request->getJSON()->email ?? '';
        $password = $this->request->getJSON()->password ?? '';

        $user = db_connect()
                    ->table('users')
                    ->where('email', $email)
                    ->get()->getRowArray();

        if (!$user || !password_verify($password, $user['password'])) {
            return $this->response->setStatusCode(401)
                ->setJSON(['status' => false, 'message' => 'Email atau password salah']);
        }

        $token = bin2hex(random_bytes(32));

        db_connect()->table('users')
            ->where('id_user', $user['id_user'])
            ->update(['token' => $token]);

        return $this->response->setJSON([
            'status'  => true,
            'message' => 'Login berhasil',
            'token'   => $token,
            'nama'    => $user['nama'],
            'role'    => $user['role'],
        ]);
    }

    public function logout()
    {
        $token = $this->request->getHeaderLine('Authorization');
        $token = str_replace('Bearer ', '', $token);

        db_connect()->table('users')
            ->where('token', $token)
            ->update(['token' => null]);

        return $this->response->setJSON(['status' => true, 'message' => 'Logout berhasil']);
    }
}