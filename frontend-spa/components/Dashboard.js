const Dashboard = {
  template: `
    <div class="min-h-screen bg-gray-100 flex">

      <!-- Sidebar -->
      <aside class="fixed left-0 top-0 h-screen w-64 bg-blue-800 text-white flex flex-col py-6 px-4">
        <h1 class="text-lg font-bold mb-8 text-center">📦 Data Warung Ari</h1>
        <nav class="flex flex-col gap-2 flex-1">
          <router-link to="/dashboard" class="px-4 py-2 rounded-lg hover:bg-blue-700">🏠 Dashboard</router-link>
          <router-link to="/barang"    class="px-4 py-2 rounded-lg hover:bg-blue-700">📦 Barang</router-link>
          <router-link to="/kategori"  class="px-4 py-2 rounded-lg hover:bg-blue-700">🏷️ Kategori</router-link>
          <router-link to="/supplier"  class="px-4 py-2 rounded-lg hover:bg-blue-700">🏢 Supplier</router-link>
          <router-link to="/transaksi" class="px-4 py-2 rounded-lg hover:bg-blue-700">🔄 Transaksi</router-link>
        </nav>
        <button @click="logout" class="mt-auto bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm">
          Logout
        </button>
      </aside>

      <!-- Konten -->
      <main class="flex-1 p-8 ml-64">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Selamat datang, {{ nama }}!</h2>
        <p class="text-gray-500 mb-8">Ringkasan kondisi inventaris warung hari ini.</p>

        <!-- Statistik -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

          <!-- Total Barang -->
          <div class="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4">
            <div class="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl">
              📦
            </div>
            <div>
              <p class="text-blue-500 text-sm">Total Barang</p>
              <p class="text-4xl font-bold text-blue-600">{{ totalBarang }}</p>
            </div>
          </div>

          <!-- Total Kategori -->
          <div class="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4">
            <div class="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl">
              🏷️
            </div>
            <div>
              <p class="text-green-500 text-sm">Total Kategori</p>
              <p class="text-4xl font-bold text-green-600">{{ totalKategori }}</p>
            </div>
          </div>

          <!-- Total Supplier -->
          <div class="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4">
            <div class="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center text-white text-2xl">
              🏢
            </div>
            <div>
              <p class="text-purple-500 text-sm">Total Supplier</p>
              <p class="text-4xl font-bold text-purple-600">{{ totalSupplier }}</p>
            </div>
          </div>

          <!-- Stok Menipis -->
          <div class="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4">
            <div class="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-white text-2xl">
              ⚠️
            </div>
            <div>
              <p class="text-red-500 text-sm">Stok Menipis</p>
              <p class="text-4xl font-bold text-red-600">{{ barangMenipis }}</p>
            </div>
          </div>

          <!-- Barang Masuk -->
          <div class="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4">
            <div class="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center text-white text-2xl">
              ⬇️
            </div>
            <div>
              <p class="text-green-600 text-sm">Barang Masuk Hari Ini</p>
              <p class="text-4xl font-bold text-green-700">{{ barangMasukHariIni }}</p>
            </div>
          </div>

          <!-- Barang Keluar -->
          <div class="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4">
            <div class="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl">
              ⬆️
            </div>
            <div>
              <p class="text-orange-500 text-sm">Barang Keluar Hari Ini</p>
              <p class="text-4xl font-bold text-orange-600">{{ barangKeluarHariIni }}</p>
            </div>
          </div>
        </div>

        <!-- Bottom Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

          <!-- Barang Perlu Restock -->
          <div class="bg-white rounded-2xl shadow-md overflow-hidden">

            <div class="px-6 py-4 border-b bg-gray-50">
              <h3 class="font-bold text-lg">
                ⚠️ Barang Perlu Restock
              </h3>
            </div>

            <table class="w-full text-sm">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-3 text-left">Nama Barang</th>
                  <th class="px-4 py-3 text-left">Stok</th>
                  <th class="px-4 py-3 text-left">Minimum</th>
                </tr>
              </thead>

              <tbody>

                <tr v-if="barangKritis.length === 0">
                  <td colspan="3" class="text-center py-10 text-gray-400">
                    Tidak ada barang yang perlu direstock
                  </td>
                </tr>

                <tr
                  v-for="b in barangKritis"
                  :key="b.id_barang"
                  class="border-t"
                >
                  <td class="px-4 py-3">
                    {{ b.nama_barang }}
                  </td>

                  <td class="px-4 py-3 text-red-500 font-semibold">
                    {{ b.stok }}
                  </td>

                  <td class="px-4 py-3">
                    {{ b.stok_minimum }}
                  </td>
                </tr>

              </tbody>
            </table>

          </div>

          <!-- Aktivitas Terbaru -->
          <div class="bg-white rounded-2xl shadow-md overflow-hidden">

            <div class="px-6 py-4 border-b bg-gray-50">
              <h3 class="font-bold text-lg">
                📝 Aktivitas Terbaru
              </h3>
            </div>

            <table class="w-full text-sm">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-3 text-left">Barang</th>
                  <th class="px-4 py-3 text-left">Jenis</th>
                  <th class="px-4 py-3 text-left">Jumlah</th>
                  <th class="px-4 py-3 text-left">Tanggal</th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="t in transaksiTerbaru"
                  :key="t.id_transaksi"
                  class="border-t"
                >
                  <td class="px-4 py-3">
                    {{ t.nama_barang }}
                  </td>

                  <td class="px-4 py-3">
                    <span
                      :class="
                        t.jenis_transaksi === 'masuk'
                        ? 'text-green-600'
                        : 'text-red-600'
                      "
                    >
                      {{ t.jenis_transaksi }}
                    </span>
                  </td>

                  <td class="px-4 py-3">
                    {{ t.jumlah }}
                  </td>

                  <td class="px-4 py-3">
                    {{ formatTanggal(t.tanggal) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        </div>
      </main>
    </div>
  `,
  data() {
    return {
      nama: localStorage.getItem("nama") || "Admin",

      totalBarang: 0,
      totalKategori: 0,
      totalSupplier: 0,

      barangMenipis: 0,

      barangMasukHariIni: 0,
      barangKeluarHariIni: 0,

      barangKritis: [],
      transaksiTerbaru: [],
    };
  },
  async mounted() {
    try {
      const [barangRes, kategoriRes, supplierRes, transaksiRes] =
        await Promise.all([
          axios.get("http://localhost:8080/barang"),
          axios.get("http://localhost:8080/kategori"),
          axios.get("http://localhost:8080/supplier"),
          axios.get("http://localhost:8080/transaksi"),
        ]);

      const barang = barangRes.data;
      const kategori = kategoriRes.data;
      const supplier = supplierRes.data;
      const transaksi = transaksiRes.data;

      // total data
      this.totalBarang = barang.length;
      this.totalKategori = kategori.length;
      this.totalSupplier = supplier.length;

      // stok menipis
      this.barangKritis = barang.filter(
        (b) => Number(b.stok) <= Number(b.stok_minimum),
      );

      this.barangMenipis = this.barangKritis.length;

      // tanggal hari ini
      const today = new Date().toISOString().split("T")[0];

      this.barangMasukHariIni = transaksi.filter(
        (t) => t.jenis_transaksi === "masuk" && t.tanggal?.startsWith(today),
      ).length;

      this.barangKeluarHariIni = transaksi.filter(
        (t) => t.jenis_transaksi === "keluar" && t.tanggal?.startsWith(today),
      ).length;

      // transaksi terbaru (ambil 5 terakhir)
      this.transaksiTerbaru = transaksi.slice().reverse().slice(0, 5);
    } catch (error) {
      console.error("Dashboard error:", error);
    }
  },
  methods: {
    formatTanggal(tgl) {
      if (!tgl) return "-";

      return new Date(tgl).toLocaleString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },

    async logout() {
      try {
        await axios.post("http://localhost:8080/auth/logout");
      } finally {
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("nama");
        this.$router.push("/login");
      }
    },
  },
};