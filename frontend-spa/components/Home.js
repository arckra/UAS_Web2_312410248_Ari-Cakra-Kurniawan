const Home = {
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <!-- Navbar -->
      <nav class="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 class="text-xl font-bold text-blue-700">📦 E-Inventory Warung</h1>
        <router-link to="/login"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
          Login Admin
        </router-link>
      </nav>

      <!-- Hero Section -->
      <div class="flex flex-col items-center justify-center py-24 text-center px-4">
        <h2 class="text-4xl font-bold text-blue-800 mb-4">Sistem Inventaris Warung</h2>
        <p class="text-gray-600 max-w-xl mb-8">
          Kelola stok barang, kategori, dan histori transaksi warung kamu dengan mudah dan cepat.
        </p>

        <!-- Ringkasan Stok Publik -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 w-full max-w-3xl">
          <div class="bg-white rounded-xl shadow p-6 text-center">
            <p class="text-4xl font-bold text-blue-600">{{ totalBarang }}</p>
            <p class="text-gray-500 mt-2">Total Jenis Barang</p>
          </div>
          <div class="bg-white rounded-xl shadow p-6 text-center">
            <p class="text-4xl font-bold text-green-600">{{ totalKategori }}</p>
            <p class="text-gray-500 mt-2">Kategori</p>
          </div>
          <div class="bg-white rounded-xl shadow p-6 text-center">
            <p class="text-4xl font-bold text-orange-500">{{ barangMenipis }}</p>
            <p class="text-gray-500 mt-2">Barang Stok Menipis</p>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      totalBarang: 0,
      totalKategori: 0,
      barangMenipis: 0,
    };
  },
  async mounted() {
    try {
      const [resBarang, resKategori] = await Promise.all([
        axios.get('http://localhost:8080/barang'),
        axios.get('http://localhost:8080/kategori'),
      ]);
      this.totalBarang   = resBarang.data.length;
      this.totalKategori = resKategori.data.length;
      this.barangMenipis = resBarang.data.filter(b => b.stok <= b.stok_minimum).length;
    } catch (e) {
      console.error('Gagal load data publik', e);
    }
  }
};