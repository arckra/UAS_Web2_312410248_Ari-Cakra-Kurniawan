<?php
namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;

class TransaksiBarang extends ResourceController
{
    protected $db;

    public function __construct()
    {
        $this->db = db_connect();
    }

    public function index()
    {
        $data = $this->db->table('transaksi_barang t')
            ->select('t.*, b.nama_barang, u.nama as nama_user')
            ->join('barang b', 'b.id_barang = t.id_barang')
            ->join('users u', 'u.id_user = t.id_user')
            ->orderBy('t.tanggal', 'DESC')
            ->get()->getResultArray();
        return $this->respond($data);
    }

    public function show($id = null)
    {
        $data = $this->db->table('transaksi_barang')
            ->where('id_transaksi', $id)
            ->get()->getRowArray();

        if (!$data) return $this->failNotFound('Transaksi tidak ditemukan');
        return $this->respond($data);
    }

    public function create()
    {
        $input = $this->request->getJSON(true);

        // Ambil stok sekarang
        $barang = $this->db->table('barang')
            ->where('id_barang', $input['id_barang'])
            ->get()->getRowArray();

        $stok_sebelum = $barang['stok'];

        // Hitung stok baru
        if ($input['jenis_transaksi'] === 'masuk') {
            $stok_sesudah = $stok_sebelum + $input['jumlah'];
        } else {
            $stok_sesudah = $stok_sebelum - $input['jumlah'];
            if ($stok_sesudah < 0) {
                return $this->fail('Stok tidak cukup');
            }
        }

        // Simpan transaksi
        $input['stok_sebelum'] = $stok_sebelum;
        $input['stok_sesudah'] = $stok_sesudah;
        $input['tanggal']      = date('Y-m-d H:i:s');
        $this->db->table('transaksi_barang')->insert($input);

        // Update stok di tabel barang
        $this->db->table('barang')
            ->where('id_barang', $input['id_barang'])
            ->update(['stok' => $stok_sesudah]);

        return $this->respondCreated(['status' => true, 'message' => 'Transaksi berhasil dicatat']);
    }

    public function update($id = null)
    {
        $input = $this->request->getJSON(true);
        $this->db->table('transaksi_barang')->where('id_transaksi', $id)->update($input);
        return $this->respond(['status' => true, 'message' => 'Transaksi berhasil diupdate']);
    }

    public function delete($id = null)
    {
        $this->db->table('transaksi_barang')->where('id_transaksi', $id)->delete();
        return $this->respondDeleted(['status' => true, 'message' => 'Transaksi berhasil dihapus']);
    }
}