const Dashboard = {
  template: `
    <div class="min-h-screen bg-gray-100 flex">

      <!-- Sidebar -->
      <aside class="fixed left-0 top-0 h-screen w-64 bg-blue-800 text-white flex flex-col py-6 px-4">
        <h1 class="text-lg font-bold mb-8 text-center">📦 E-Inventory</h1>
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

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div class="bg-white rounded-xl shadow p-6">
            <p class="text-gray-500 text-sm">📦 Total Barang</p>
            <p class="text-3xl font-bold text-blue-600 mt-2">
              {{ totalBarang }}
            </p>
          </div>

          <div class="bg-white rounded-xl shadow p-6">
            <p class="text-gray-500 text-sm">🏷️ Total Kategori</p>
            <p class="text-3xl font-bold text-green-600 mt-2">
              {{ totalKategori }}
            </p>
          </div>

          <div class="bg-white rounded-xl shadow p-6">
            <p class="text-gray-500 text-sm">🏢 Total Supplier</p>
            <p class="text-3xl font-bold text-indigo-600 mt-2">
              {{ totalSupplier }}
            </p>
          </div>

          <div class="bg-white rounded-xl shadow p-6">
            <p class="text-gray-500 text-sm">⚠️ Stok Menipis</p>
            <p class="text-3xl font-bold text-red-500 mt-2">
              {{ barangMenipis }}
            </p>
          </div>

          <div class="bg-white rounded-xl shadow p-6">
            <p class="text-gray-500 text-sm">📥 Barang Masuk Hari Ini</p>
            <p class="text-3xl font-bold text-emerald-600 mt-2">
              {{ barangMasukHariIni }}
            </p>
          </div>

          <div class="bg-white rounded-xl shadow p-6">
            <p class="text-gray-500 text-sm">📤 Barang Keluar Hari Ini</p>
            <p class="text-3xl font-bold text-orange-500 mt-2">
              {{ barangKeluarHariIni }}
            </p>
          </div>

        </div>

        <!-- Tabel barang stok menipis -->
        <div class="bg-white rounded-xl shadow p-6" v-if="barangKritis.length > 0">
          <h3 class="font-semibold text-gray-700 mb-4">⚠️ Barang Perlu Restock</h3>
          <table class="w-full text-sm">
            <thead>
              <tr class="text-left text-gray-500 border-b">
                <th class="pb-2">Nama Barang</th>
                <th class="pb-2">Stok</th>
                <th class="pb-2">Minimum</th>
                <th class="pb-2">Lokasi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="b in barangKritis" :key="b.id_barang" class="border-b last:border-0">
                <td class="py-2 font-medium">{{ b.nama_barang }}</td>
                <td class="py-2 text-red-500 font-bold">{{ b.stok }} {{ b.satuan }}</td>
                <td class="py-2">{{ b.stok_minimum }} {{ b.satuan }}</td>
                <td class="py-2 text-gray-400">{{ b.lokasi }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="bg-white rounded-xl shadow p-6 mt-8">
          <h3 class="font-semibold text-gray-700 mb-4">
            📊 Grafik Barang Perlu Restock
          </h3>

          <canvas id="restockChart"></canvas>
        </div>

        <!-- Aktivitas Terbaru -->
        <div
          class="bg-white rounded-xl shadow p-6 mt-8"
          v-if="transaksiTerbaru.length">
          <h3 class="font-semibold text-gray-700 mb-4">
            📝 Aktivitas Terbaru
          </h3>

          <table class="w-full text-sm">
            <thead>
              <tr class="border-b text-gray-500">
                <th class="text-left py-2">Barang</th>
                <th class="text-left py-2">Jenis</th>
                <th class="text-left py-2">Jumlah</th>
                <th class="text-left py-2">Tanggal</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="t in transaksiTerbaru"
                :key="t.id_transaksi"
                class="border-b">
                <td class="py-2">{{ t.nama_barang }}</td>

                <td class="py-2">
                  <span
                    :class="
                      t.jenis_transaksi === 'masuk'
                        ? 'text-green-600 font-semibold'
                        : 'text-red-600 font-semibold'">
                    {{ t.jenis_transaksi }}
                  </span>
                </td>

                <td class="py-2">
                  {{ t.jumlah }}
                </td>

                <td class="py-2">
                  {{ t.tanggal }}
                </td>
              </tr>
            </tbody>
          </table>
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

    this.$nextTick(() => {
      const ctx = document.getElementById("restockChart");

      const labels = this.barangKritis.map((b) => b.nama_barang);
      const stok = this.barangKritis.map((b) => Number(b.stok));
      const minimum = this.barangKritis.map((b) => Number(b.stok_minimum));

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Stok",
              data: stok,
            },
            {
              label: "Stok Minimum",
              data: minimum,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    });
  },
  methods: {
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