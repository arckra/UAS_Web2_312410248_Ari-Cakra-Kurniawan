<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class Barang extends ResourceController
{
    protected $db;

    public function __construct()
    {
        $this->db = db_connect();
    }

    // GET /barang — publik, tanpa token
    public function index()
    {
        $data = $this->db->table('barang b')
            ->select('
                b.*,
                k.nama_kategori,
                s.nama_supplier
            ')
            ->join('kategori k', 'k.id_kategori = b.id_kategori')
            ->join('supplier s', 's.id_supplier = b.id_supplier', 'left')
            ->get()
            ->getResultArray();

        return $this->respond($data);
    }

    // GET /barang/1
    public function show($id = null)
    {
        $data = $this->db->table('barang')
            ->where('id_barang', $id)
            ->get()
            ->getRowArray();

        if (!$data) {
            return $this->failNotFound('Barang tidak ditemukan');
        }

        return $this->respond($data);
    }

    // POST /barang — butuh token
    public function create()
    {
        $input = $this->request->getJSON(true);

        $this->db->table('barang')->insert($input);

        return $this->respondCreated([
            'status'  => true,
            'message' => 'Barang berhasil ditambahkan'
        ]);
    }

    // PUT /barang/1 — butuh token
    public function update($id = null)
    {
        $input = $this->request->getJSON(true);
        log_message('error', json_encode($input));

        $data = [
            'id_kategori'   => $input['id_kategori'],
            'id_supplier'   => $input['id_supplier'],
            'nama_barang'   => $input['nama_barang'],
            'satuan'        => $input['satuan'],
            'stok'          => $input['stok'],
            'stok_minimum'  => $input['stok_minimum'],
            'lokasi'        => $input['lokasi']
        ];
    
        $this->db->table('barang')
            ->where('id_barang', $id)
            ->update($data);
    
        return $this->respond([
            'status'  => true,
            'message' => 'Barang berhasil diupdate'
        ]);
    }

    // DELETE /barang/1 — butuh token
    public function delete($id = null)
    {
        $this->db->table('barang')
            ->where('id_barang', $id)
            ->delete();

        return $this->respondDeleted([
            'status'  => true,
            'message' => 'Barang berhasil dihapus'
        ]);
    }
}