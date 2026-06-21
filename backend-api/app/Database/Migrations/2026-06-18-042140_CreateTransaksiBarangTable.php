<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateTransaksiBarangTable extends Migration
{
    // CreateTransaksiBarangTable
    public function up() {
        $this->forge->addField([
            'id_transaksi'    => ['type' => 'INT', 'auto_increment' => true],
            'id_user'         => ['type' => 'INT'],
            'id_barang'       => ['type' => 'INT'],
            'jenis_transaksi' => ['type' => 'ENUM', 'constraint' => ['masuk', 'keluar']],
            'jumlah'          => ['type' => 'INT'],
            'stok_sebelum'    => ['type' => 'INT'],
            'stok_sesudah'    => ['type' => 'INT'],
            'keterangan'      => ['type' => 'TEXT', 'null' => true],
            'tanggal'         => ['type' => 'DATETIME'],
        ]);
        $this->forge->addPrimaryKey('id_transaksi');
        $this->forge->addForeignKey('id_user', 'users', 'id_user');
        $this->forge->addForeignKey('id_barang', 'barang', 'id_barang');
        $this->forge->createTable('transaksi_barang');
    }

    public function down()
    {
        //
    }
}
