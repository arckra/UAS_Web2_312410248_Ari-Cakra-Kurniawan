const Transaksi = {
  template: `
    <div class="min-h-screen bg-gray-100 flex">

      <aside class="fixed left-0 top-0 h-screen w-64 bg-blue-800 text-white flex flex-col py-6 px-4">
        <h1 class="text-lg font-bold mb-8 text-center">📦 Data Warung Ari</h1>
        <nav class="flex flex-col gap-2 flex-1">
          <router-link to="/dashboard" class="px-4 py-2 rounded-lg hover:bg-blue-700">🏠 Dashboard</router-link>
          <router-link to="/barang"    class="px-4 py-2 rounded-lg hover:bg-blue-700">📦 Barang</router-link>
          <router-link to="/kategori"  class="px-4 py-2 rounded-lg hover:bg-blue-700">🏷️ Kategori</router-link>
          <router-link to="/supplier"  class="px-4 py-2 rounded-lg hover:bg-blue-700">🏢 Supplier</router-link>
          <router-link to="/transaksi" class="px-4 py-2 rounded-lg hover:bg-blue-700 bg-blue-700">🔄 Transaksi</router-link>
        </nav>
        <button @click="logout" class="mt-auto bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm">
          Logout
        </button>
      </aside>

      <main class="flex-1 p-8 ml-64">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">Histori Transaksi</h2>
          <button @click="bukaModal"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium">
            + Catat Transaksi
          </button>
        </div>

        <div class="bg-white rounded-xl shadow overflow-hidden">
          <table class="w-full text-sm">
            <thead class="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th class="px-6 py-3 text-left">No</th>
                <th class="px-6 py-3 text-left">Tanggal</th>
                <th class="px-6 py-3 text-left">Barang</th>
                <th class="px-6 py-3 text-left">Jenis</th>
                <th class="px-6 py-3 text-left">Jumlah</th>
                <th class="px-6 py-3 text-left">Stok Sebelum</th>
                <th class="px-6 py-3 text-left">Stok Sesudah</th>
                <th class="px-6 py-3 text-left">Keterangan</th>
                <th class="px-6 py-3 text-left">Oleh</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-if="transaksi.length === 0">
                <td colspan="9" class="text-center py-8 text-gray-400">Belum ada transaksi</td>
              </tr>
              <tr v-for="(item, index) in transaksi" :key="item.id_transaksi" class="hover:bg-gray-50">
                <td class="px-6 py-4">{{ index + 1 }}</td>
                <td class="px-6 py-4 text-gray-500">{{ formatTanggal(item.tanggal) }}</td>
                <td class="px-6 py-4 font-medium">{{ item.nama_barang }}</td>
                <td class="px-6 py-4">
                  <span :class="item.jenis_transaksi === 'masuk'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-600'"
                    class="text-xs px-2 py-1 rounded-full font-medium capitalize">
                    {{ item.jenis_transaksi }}
                  </span>
                </td>
                <td class="px-6 py-4 font-bold">{{ item.jumlah }}</td>
                <td class="px-6 py-4 text-gray-500">{{ item.stok_sebelum }}</td>
                <td class="px-6 py-4 font-medium">{{ item.stok_sesudah }}</td>
                <td class="px-6 py-4 text-gray-500">{{ item.keterangan || '-' }}</td>
                <td class="px-6 py-4 text-gray-500">{{ item.nama_user }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>

      <!-- Modal Catat Transaksi -->
      <div v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <h3 class="text-lg font-bold text-gray-800 mb-6">Catat Transaksi</h3>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Daftar Barang
            </label>

            <div v-for="(item,index) in form.items" :key="index" class="flex gap-2 mb-2">
              <!-- Barang -->
              <select
                v-model="item.id_barang"
                class="flex-1 border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">Pilih Barang</option>

                <option
                  v-for="b in barang"
                  :key="b.id_barang"
                  :value="b.id_barang"
                >
                  {{ b.nama_barang }}
                </option>
              </select>

              <!-- Jumlah -->
              <input
                type="number"
                min="1"
                v-model="item.jumlah"
                placeholder="Qty"
                class="w-24 border border-gray-300 rounded-lg px-3 py-2"
              >

              <!-- Hapus -->
              <button
                v-if="form.items.length > 1"
                type="button"
                @click="hapusBarang(index)"
                class="bg-red-500 hover:bg-red-600 text-white px-3 rounded-lg"
              >
                ✕
              </button>
            </div>

            <!-- Tambah Barang -->
            <button
              type="button"
              @click="tambahBarang"
              class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm mt-2"
            >
              + Tambah Barang
            </button>
          </div>
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Jenis Transaksi</label>
                <select v-model="form.jenis_transaksi"
                  class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">-- Pilih Jenis --</option>
                  <option value="masuk">Masuk (Stok Bertambah)</option>
                  <option value="keluar">Keluar (Stok Berkurang)</option>
                </select>
              </div>

              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-1">Keterangan (opsional)</label>
                <textarea v-model="form.keterangan" rows="2" placeholder="Contoh: beli dari supplier, barang rusak..."
                  class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
              </div>

              <div class="flex gap-3 justify-end">
                <button @click="showModal = false"
                  class="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm">
                  Batal
                </button>
                <button @click="simpan" :disabled="loading"
                  class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium disabled:opacity-50">
                  {{ loading ? 'Menyimpan...' : 'Catat' }}
                </button>
              </div>
        </div>
      </div>

    </div>
  `,
  data() {
    return {
      transaksi: [],
      barang: [],
      showModal: false,
      loading: false,
      form: {
        jenis_transaksi: "",
        keterangan: "",
        items: [
          {
            id_barang: "",
            jumlah: 1,
          },
        ],
      },
    };
  },
  async mounted() {
    await this.loadData();
  },
  methods: {
    async loadData() {
      const [resTrx, resBarang] = await Promise.all([
        axios.get("http://localhost:8080/transaksi"),
        axios.get("http://localhost:8080/barang"),
      ]);
      this.transaksi = resTrx.data;
      this.barang = resBarang.data;
    },
    bukaModal() {
      this.form = {
        jenis_transaksi: "",
        keterangan: "",
        items: [
          {
            id_barang: "",
            jumlah: 1,
          },
        ],
      };

      this.showModal = true;
    },
    async simpan() {
      if (!this.form.jenis_transaksi) {
        alert("Pilih jenis transaksi!");
        return;
      }

      for (const item of this.form.items) {
        if (!item.id_barang || !item.jumlah) {
          alert("Semua barang dan jumlah wajib diisi!");
          return;
        }
      }

      this.loading = true;

      try {
        for (const item of this.form.items) {
          await axios.post("http://localhost:8080/transaksi", {
            id_barang: item.id_barang,
            jumlah: item.jumlah,
            jenis_transaksi: this.form.jenis_transaksi,
            keterangan: this.form.keterangan,
            id_user: 1,
          });
        }

        this.showModal = false;
        await this.loadData();
      } catch (e) {
        alert(
          "Gagal mencatat transaksi: " +
            (e.response?.data?.message || e.message),
        );
      } finally {
        this.loading = false;
      }
      if (!item.id_barang || item.jumlah <= 0) {
        alert("ID barang dan jumlah harus diisi dengan benar!");
        return;
      }
    },
    formatTanggal(tgl) {
      if (!tgl) return "-";
      return new Date(tgl).toLocaleString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    },

    tambahBarang() {
      this.form.items.push({
        id_barang: "",
        jumlah: 1,
      });
    },

    hapusBarang(index) {
      this.form.items.splice(index, 1);
    },
  },
};