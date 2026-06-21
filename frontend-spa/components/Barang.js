const Barang = {
  template: `
    <div class="min-h-screen bg-gray-100 flex">

      <!-- Sidebar -->
      <aside class="fixed left-0 top-0 h-screen w-64 bg-blue-800 text-white flex flex-col py-6 px-4">
        <h1 class="text-lg font-bold mb-8 text-center">📦 Data Warung Ari</h1>
        <nav class="flex flex-col gap-2 flex-1">
          <router-link to="/dashboard" class="px-4 py-2 rounded-lg hover:bg-blue-700">🏠 Dashboard</router-link>
          <router-link to="/barang"    class="px-4 py-2 rounded-lg hover:bg-blue-700 bg-blue-700">📦 Barang</router-link>
          <router-link to="/kategori"  class="px-4 py-2 rounded-lg hover:bg-blue-700">🏷️ Kategori</router-link>
          <router-link to="/supplier"  class="px-4 py-2 rounded-lg hover:bg-blue-700">🏢 Supplier</router-link>
          <router-link to="/transaksi" class="px-4 py-2 rounded-lg hover:bg-blue-700">🔄 Transaksi</router-link>
        </nav>
        <button @click="logout" class="mt-auto bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm">
          Logout
        </button>
      </aside>

      <!-- Konten Utama -->
      <main class="flex-1 p-8 ml-64">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">Data Barang</h2>
          <button @click="bukaModalTambah"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium">
            + Tambah Barang
          </button>
        </div>

        <!-- Tabel -->
        <div class="bg-white rounded-xl shadow overflow-hidden">
          <table class="w-full text-sm">
            <thead class="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th class="px-6 py-3 text-left">No</th>
                <th class="px-6 py-3 text-left">Nama Barang</th>
                <th class="px-6 py-3 text-left">Kategori</th>
                <th class="px-6 py-3 text-left">Supplier</th>
                <th class="px-6 py-3 text-left">Stok</th>
                <th class="px-6 py-3 text-left">Satuan</th>
                <th class="px-6 py-3 text-left">Lokasi</th>
                <th class="px-6 py-3 text-left">Status</th>
                <th class="px-6 py-3 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-if="barang.length === 0">
                <td colspan="9" class="text-center py-8 text-gray-400">Belum ada data barang</td>
              </tr>
              <tr v-for="(item, index) in barang" :key="item.id_barang" class="hover:bg-gray-50">
                <td class="px-6 py-4">{{ index + 1 }}</td>
                <td class="px-6 py-4 font-medium">{{ item.nama_barang }}</td>
                <td class="px-6 py-4">{{ item.nama_kategori }}</td>
                <td class="px-6 py-4">{{ item.nama_supplier }}</td>
                <td class="px-6 py-4 font-bold" :class="item.stok <= item.stok_minimum ? 'text-red-500' : 'text-green-600'">
                  {{ item.stok }}
                </td>
                <td class="px-6 py-4">{{ item.satuan }}</td>
                <td class="px-6 py-4 text-gray-500">{{ item.lokasi }}</td>
                <td class="px-6 py-4">
                  <span v-if="Number(item.stok) <= Number(item.stok_minimum)"
                    class="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-medium">
                    Menipis
                  </span>
                  <span v-else
                    class="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full font-medium">
                    Aman
                  </span>
                </td>
                <td class="px-6 py-4 flex gap-2">
                  <button @click="bukaModalEdit(item)"
                    class="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs">
                    Edit
                  </button>
                  <button @click="hapus(item.id_barang)"
                    class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">
                    Hapus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>

      <!-- Modal Tambah / Edit -->
      <div v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <h3 class="text-lg font-bold text-gray-800 mb-6">
            {{ modalMode === 'tambah' ? 'Tambah Barang' : 'Edit Barang' }}
          </h3>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Nama Barang</label>
            <input v-model="form.nama_barang" type="text"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
            <select v-model="form.id_kategori"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">-- Pilih Kategori --</option>
              <option v-for="k in kategori" :key="k.id_kategori" :value="k.id_kategori">
                {{ k.nama_kategori }}
              </option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Supplier
            </label>

            <select
              v-model="form.id_supplier"
              class="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="">-- Pilih Supplier --</option>

              <option
                v-for="s in supplier"
                :key="s.id_supplier"
                :value="s.id_supplier"
              >
                {{ s.nama_supplier }}
              </option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Stok Awal</label>
              <input v-model="form.stok" type="number"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Stok Minimum</label>
              <input v-model="form.stok_minimum" type="number"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Satuan</label>
              <input v-model="form.satuan" type="text" placeholder="pcs, kg, lusin..."
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
              <input v-model="form.lokasi" type="text" placeholder="Rak A1..."
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
          </div>

          <div class="flex gap-3 justify-end">
            <button @click="showModal = false"
              class="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm">
              Batal
            </button>
            <button @click="simpan" :disabled="loading"
              class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium disabled:opacity-50">
              {{ loading ? 'Menyimpan...' : 'Simpan' }}
            </button>
          </div>
        </div>
      </div>

    </div>
  `,
  data() {
    return {
      barang: [],
      kategori: [],
      supplier: [],
      showModal: false,
      modalMode: "tambah",
      loading: false,
      form: {
        id_barang: null,
        id_kategori: "",
        id_supplier: "",
        nama_barang: "",
        satuan: "",
        stok: 0,
        stok_minimum: 0,
        lokasi: "",
      },
    };
  },
  async mounted() {
    console.log("MOUNTED");
    await this.loadData();
  },
  methods: {
    async loadData() {
      console.log("LOAD DATA MULAI", new Date());

      try {
        console.log("AMBIL BARANG");
        const resBarang = await axios.get("http://localhost:8080/barang");

        console.log("AMBIL KATEGORI");
        const resKategori = await axios.get("http://localhost:8080/kategori");

        console.log("AMBIL SUPPLIER");
        const resSupplier = await axios.get("http://localhost:8080/supplier");

        console.log("SEMUA BERHASIL");

        this.barang = resBarang.data;
        this.kategori = resKategori.data;
        this.supplier = resSupplier.data;
      } catch (err) {
        console.error("ERROR LOAD DATA:", err);
      }
    },
    bukaModalTambah() {
      this.modalMode = "tambah";

      this.form = {
        id_barang: null,
        id_kategori: "",
        id_supplier: "",
        nama_barang: "",
        satuan: "",
        stok: 0,
        stok_minimum: 0,
        lokasi: "",
      };

      this.showModal = true;
    },
    bukaModalEdit(item) {
      this.modalMode = "edit";

      this.form = {
        id_barang: item.id_barang,
        id_kategori: item.id_kategori,
        id_supplier: item.id_supplier,
        nama_barang: item.nama_barang,
        satuan: item.satuan,
        stok: item.stok,
        stok_minimum: item.stok_minimum,
        lokasi: item.lokasi,
      };

      this.showModal = true;
    },
    async simpan() {
      this.loading = true;
      try {
        if (this.modalMode === "tambah") {
          await axios.post("http://localhost:8080/barang", this.form);
        } else {
          await axios.put(
            `http://localhost:8080/barang/${this.form.id_barang}`,
            this.form,
          );
        }
        this.showModal = false;
        await this.loadData();
      } catch (e) {
        alert(
          "Gagal menyimpan data: " + (e.response?.data?.message || e.message),
        );
      } finally {
        this.loading = false;
      }
    },
    async hapus(id) {
      if (!confirm("Yakin hapus barang ini?")) return;
      await axios.delete(`http://localhost:8080/barang/${id}`);
      await this.loadData();
    },
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
};