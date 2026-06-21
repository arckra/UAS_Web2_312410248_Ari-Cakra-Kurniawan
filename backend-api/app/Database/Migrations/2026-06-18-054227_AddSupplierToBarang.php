<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddSupplierToBarang extends Migration
{
    public function up()
    {
        $this->forge->addColumn('barang', [
            'id_supplier' => [
                'type'       => 'INT',
                'constraint' => 11,
                'unsigned'   => true,
                'null'       => true,
                'after'      => 'id_kategori',
            ],
        ]);

        $this->db->query("
            ALTER TABLE barang
            ADD CONSTRAINT fk_barang_supplier
            FOREIGN KEY (id_supplier)
            REFERENCES supplier(id_supplier)
            ON DELETE SET NULL
            ON UPDATE CASCADE
        ");
    }

    public function down()
    {
        $this->db->query("
            ALTER TABLE barang
            DROP FOREIGN KEY fk_barang_supplier
        ");

        $this->forge->dropColumn('barang', 'id_supplier');
    }
}