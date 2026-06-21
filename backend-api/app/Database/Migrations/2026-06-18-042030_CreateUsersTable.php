<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateUsersTable extends Migration
{
    public function up() {
        $this->forge->addField([
            'id_user'  => ['type' => 'INT', 'auto_increment' => true],
            'nama'     => ['type' => 'VARCHAR', 'constraint' => 100],
            'email'    => ['type' => 'VARCHAR', 'constraint' => 100],
            'password' => ['type' => 'VARCHAR', 'constraint' => 255],
            'role'     => ['type' => 'ENUM', 'constraint' => ['admin', 'public'], 'default' => 'admin'],
            'token'    => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
        ]);
        $this->forge->addPrimaryKey('id_user');
        $this->forge->createTable('users');
    }

    public function down()
    {
        //
    }
}
