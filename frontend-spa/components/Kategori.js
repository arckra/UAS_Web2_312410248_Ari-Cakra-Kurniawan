const Kategori = {
  template: `
    <div class="min-h-screen bg-gray-100 flex">

      <aside class="fixed left-0 top-0 h-screen w-64 bg-blue-800 text-white flex flex-col py-6 px-4">
        <h1 class="text-lg font-bold mb-8 text-center">📦 Data Warung Ari</h1>
        <nav class="flex flex-col gap-2 flex-1">
          <router-link to="/dashboard" class="px-4 py-2 rounded-lg hover:bg-blue-700">🏠 Dashboard</router-link>
          <router-link to="/barang"    class="px-4 py-2 rounded-lg hover:bg-blue-700">📦 Barang</router-link>
          <router-link to="/kategori"  class="px-4 py-2 rounded-lg hover:bg-blue-700 bg-blue-700">🏷️ Kategori</router-link>
          <router-link to="/supplier"  class="px-4 py-2 rounded-lg hover:bg-blue-700">🏢 Supplier</router-link>
          <router-link to="/transaksi" class="px-4 py-2 rounded-lg hover:bg-blue-700">🔄 Transaksi</router-link>
        </nav>
        <button @click="logout" class="mt-auto bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm">
          Logout
        </button>
      </aside>

      <main class="flex-1 p-8 ml-64">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">Data Kategori</h2>
          <button @click="bukaModalTambah"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium">
            + Tambah Kategori
          </button>
        </div>

        <div class="bg-white rounded-xl shadow overflow-hidden">
          <table class="w-full text-sm">
            <thead class="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th class="px-6 py-3 text-left">No</th>
                <th class="px-6 py-3 text-left">Nama Kategori</th>
                <th class="px-6 py-3 text-left">Deskripsi</th>
                <th class="px-6 py-3 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-if="kategori.length === 0">
                <td colspan="4" class="text-center py-8 text-gray-400">Belum ada kategori</td>
              </tr>
              <tr v-for="(item, index) in kategori" :key="item.id_kategori" class="hover:bg-gray-50">
                <td class="px-6 py-4">{{ index + 1 }}</td>
                <td class="px-6 py-4 font-medium">{{ item.nama_kategori }}</td>
                <td class="px-6 py-4 text-gray-500">{{ item.deskripsi || '-' }}</td>
                <td class="px-6 py-4 flex gap-2">
                  <button @click="bukaModalEdit(item)"
                    class="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs">
                    Edit
                  </button>
                  <button @click="hapus(item.id_kategori)"
                    class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">
                    Hapus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>

      <!-- Modal -->
      <div v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <h3 class="text-lg font-bold text-gray-800 mb-6">
            {{ modalMode === 'tambah' ? 'Tambah Kategori' : 'Edit Kategori' }}
          </h3>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Nama Kategori</label>
            <input v-model="form.nama_kategori" type="text"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>

          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
            <textarea v-model="form.deskripsi" rows="3"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
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
      kategori: [],
      showModal: false,
      modalMode: "tambah",
      loading: false,
      form: { id_kategori: null, nama_kategori: "", deskripsi: "" },
    };
  },
  async mounted() {
    await this.loadData();
  },
  methods: {
    async loadData() {
      const res = await axios.get("http://localhost:8080/kategori");
      this.kategori = res.data;
    },
    bukaModalTambah() {
      this.modalMode = "tambah";
      this.form = { id_kategori: null, nama_kategori: "", deskripsi: "" };
      this.showModal = true;
    },
    bukaModalEdit(item) {
      this.modalMode = "edit";
      this.form = { ...item };
      this.showModal = true;
    },
    async simpan() {
      this.loading = true;
      try {
        if (this.modalMode === "tambah") {
          await axios.post("http://localhost:8080/kategori", this.form);
        } else {
          await axios.put(
            `http://localhost:8080/kategori/${this.form.id_kategori}`,
            this.form,
          );
        }
        this.showModal = false;
        await this.loadData();
      } catch (e) {
        alert("Gagal menyimpan: " + (e.response?.data?.message || e.message));
      } finally {
        this.loading = false;
      }
    },
    async hapus(id) {
      if (
        !confirm(
          "Yakin hapus kategori ini? Barang yang terhubung bisa ikut terpengaruh.",
        )
      )
        return;
      await axios.delete(`http://localhost:8080/kategori/${id}`);
      await this.loadData();
    },
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
};