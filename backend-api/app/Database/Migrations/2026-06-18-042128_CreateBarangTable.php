<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateBarangTable extends Migration
{
    // CreateBarangTable
    public function up() {
        $this->forge->addField([
            'id_barang'     => ['type' => 'INT', 'auto_increment' => true],
            'id_kategori'   => ['type' => 'INT'],
            'nama_barang'   => ['type' => 'VARCHAR', 'constraint' => 150],
            'satuan'        => ['type' => 'VARCHAR', 'constraint' => 50],
            'stok'          => ['type' => 'INT', 'default' => 0],
            'stok_minimum'  => ['type' => 'INT', 'default' => 0],
            'lokasi'        => ['type' => 'VARCHAR', 'constraint' => 100, 'null' => true],
        ]);
        $this->forge->addPrimaryKey('id_barang');
        $this->forge->addForeignKey('id_kategori', 'kategori', 'id_kategori');
        $this->forge->createTable('barang');
    }

    public function down()
    {
        //
    }
}
