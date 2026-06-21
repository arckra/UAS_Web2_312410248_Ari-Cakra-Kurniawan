<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class Supplier extends ResourceController
{
    protected $db;

    public function __construct()
    {
        $this->db = db_connect();
    }

    // GET /supplier
    public function index()
    {
        $data = $this->db->table('supplier')
            ->orderBy('nama_supplier', 'ASC')
            ->get()
            ->getResultArray();

        return $this->respond($data);
    }

    // GET /supplier/1
    public function show($id = null)
    {
        $data = $this->db->table('supplier')
            ->where('id_supplier', $id)
            ->get()
            ->getRowArray();

        if (!$data) {
            return $this->failNotFound('Supplier tidak ditemukan');
        }

        return $this->respond($data);
    }

    // POST /supplier
    public function create()
    {
        $input = $this->request->getJSON(true);

        $this->db->table('supplier')->insert([
            'nama_supplier' => $input['nama_supplier'] ?? '',
            'kontak'        => $input['kontak'] ?? null,
            'alamat'        => $input['alamat'] ?? null,
            'created_at'    => date('Y-m-d H:i:s'),
            'updated_at'    => date('Y-m-d H:i:s'),
        ]);

        return $this->respondCreated([
            'status' => true,
            'message' => 'Supplier berhasil ditambahkan'
        ]);
    }

    // PUT /supplier/1
    public function update($id = null)
    {
        $input = $this->request->getJSON(true);

        $this->db->table('supplier')
            ->where('id_supplier', $id)
            ->update([
                'nama_supplier' => $input['nama_supplier'] ?? '',
                'kontak'        => $input['kontak'] ?? null,
                'alamat'        => $input['alamat'] ?? null,
                'updated_at'    => date('Y-m-d H:i:s'),
            ]);

        return $this->respond([
            'status' => true,
            'message' => 'Supplier berhasil diupdate'
        ]);
    }

    // DELETE /supplier/1
    public function delete($id = null)
    {
        $digunakan = $this->db->table('barang')
            ->where('id_supplier', $id)
            ->countAllResults();

        if ($digunakan > 0) {
            return $this->fail(
                'Supplier masih digunakan oleh barang.',
                400
            );
        }

        $this->db->table('supplier')
            ->where('id_supplier', $id)
            ->delete();

        return $this->respondDeleted([
            'status' => true,
            'message' => 'Supplier berhasil dihapus'
        ]);
    }
}