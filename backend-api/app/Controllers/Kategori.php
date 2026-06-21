<?php
namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;

class Kategori extends ResourceController
{
    protected $db;

    public function __construct()
    {
        $this->db = db_connect();
    }

    public function index()
    {
        $data = $this->db->table('kategori')->get()->getResultArray();
        return $this->respond($data);
    }

    public function show($id = null)
    {
        $data = $this->db->table('kategori')
            ->where('id_kategori', $id)
            ->get()->getRowArray();

        if (!$data) return $this->failNotFound('Kategori tidak ditemukan');
        return $this->respond($data);
    }

    public function create()
    {
        $input = $this->request->getJSON(true);
        $this->db->table('kategori')->insert($input);
        return $this->respondCreated(['status' => true, 'message' => 'Kategori berhasil ditambahkan']);
    }

    public function update($id = null)
    {
        $input = $this->request->getJSON(true);
        $this->db->table('kategori')->where('id_kategori', $id)->update($input);
        return $this->respond(['status' => true, 'message' => 'Kategori berhasil diupdate']);
    }

    public function delete($id = null)
    {
        $this->db->table('kategori')->where('id_kategori', $id)->delete();
        return $this->respondDeleted(['status' => true, 'message' => 'Kategori berhasil dihapus']);
    }
}