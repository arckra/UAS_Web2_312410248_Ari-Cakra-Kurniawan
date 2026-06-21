const Supplier = {
  template: `
    <div class="min-h-screen bg-gray-100 flex">

      <!-- Sidebar -->
      <aside class="fixed left-0 top-0 h-screen w-64 bg-blue-800 text-white flex flex-col py-6 px-4">
        <h1 class="text-lg font-bold mb-8 text-center">📦 Data Warung Ari</h1>

        <nav class="flex flex-col gap-2 flex-1">
          <router-link to="/dashboard" class="px-4 py-2 rounded-lg hover:bg-blue-700">
            🏠 Dashboard
          </router-link>

          <router-link to="/barang" class="px-4 py-2 rounded-lg hover:bg-blue-700">
            📦 Barang
          </router-link>

          <router-link to="/kategori" class="px-4 py-2 rounded-lg hover:bg-blue-700">
            🏷️ Kategori
          </router-link>

          <router-link to="/supplier" class="px-4 py-2 rounded-lg bg-blue-700">
            🏢 Supplier
          </router-link>

          <router-link to="/transaksi" class="px-4 py-2 rounded-lg hover:bg-blue-700">
            🔄 Transaksi
          </router-link>
        </nav>

        <button
          @click="logout"
          class="mt-auto bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm"
        >
          Logout
        </button>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-8 ml-64">

        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">
            Data Supplier
          </h2>

          <button
            @click="bukaModalTambah"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
          >
            + Tambah Supplier
          </button>
        </div>

        <!-- Tabel -->
        <div class="bg-white rounded-xl shadow overflow-hidden">

          <table class="w-full text-sm">

            <thead class="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th class="px-6 py-3 text-left">No</th>
                <th class="px-6 py-3 text-left">Nama Supplier</th>
                <th class="px-6 py-3 text-left">Kontak</th>
                <th class="px-6 py-3 text-left">Alamat</th>
                <th class="px-6 py-3 text-left">Aksi</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-100">

              <tr v-if="supplier.length === 0">
                <td colspan="5" class="text-center py-8 text-gray-400">
                  Belum ada data supplier
                </td>
              </tr>

              <tr
                v-for="(item,index) in supplier"
                :key="item.id_supplier"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4">
                  {{ index + 1 }}
                </td>

                <td class="px-6 py-4 font-medium">
                  {{ item.nama_supplier }}
                </td>

                <td class="px-6 py-4">
                  {{ item.kontak || '-' }}
                </td>

                <td class="px-6 py-4 text-gray-500">
                  {{ item.alamat || '-' }}
                </td>

                <td class="px-6 py-4 flex gap-2">

                  <button
                    @click="bukaModalEdit(item)"
                    class="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs"
                  >
                    Edit
                  </button>

                  <button
                    @click="hapus(item.id_supplier)"
                    class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                  >
                    Hapus
                  </button>

                </td>
              </tr>

            </tbody>
          </table>
        </div>

      </main>

      <!-- Modal -->
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">

          <h3 class="text-lg font-bold text-gray-800 mb-6">
            {{ modalMode === 'tambah'
                ? 'Tambah Supplier'
                : 'Edit Supplier'
            }}
          </h3>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Nama Supplier
            </label>

            <input
              v-model="form.nama_supplier"
              type="text"
              class="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Kontak
            </label>

            <input
              v-model="form.kontak"
              type="text"
              class="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
          </div>

          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Alamat
            </label>

            <textarea
              v-model="form.alamat"
              rows="3"
              class="w-full border border-gray-300 rounded-lg px-4 py-2"
            ></textarea>
          </div>

          <div class="flex justify-end gap-3">

            <button
              @click="showModal = false"
              class="px-4 py-2 border border-gray-300 rounded-lg text-gray-600"
            >
              Batal
            </button>

            <button
              @click="simpan"
              :disabled="loading"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {{ loading ? 'Menyimpan...' : 'Simpan' }}
            </button>

          </div>

        </div>
      </div>

    </div>
  `,

  data() {
    return {
      supplier: [],
      showModal: false,
      modalMode: "tambah",
      loading: false,

      form: {
        id_supplier: null,
        nama_supplier: "",
        kontak: "",
        alamat: "",
      },
    };
  },

  async mounted() {
    await this.loadData();
  },

  methods: {
    async loadData() {
      const res = await axios.get("http://localhost:8080/supplier");

      this.supplier = res.data;
    },

    bukaModalTambah() {
      this.modalMode = "tambah";

      this.form = {
        id_supplier: null,
        nama_supplier: "",
        kontak: "",
        alamat: "",
      };

      this.showModal = true;
    },

    bukaModalEdit(item) {
      this.modalMode = "edit";
      this.form = { ...item };
      this.showModal = true;
    },

    async simpan() {
      if (!this.form.nama_supplier) {
        alert("Nama supplier wajib diisi");
        return;
      }

      this.loading = true;

      try {
        if (this.modalMode === "tambah") {
          await axios.post("http://localhost:8080/supplier", this.form);
        } else {
          await axios.put(
            `http://localhost:8080/supplier/${this.form.id_supplier}`,
            this.form,
          );
        }

        this.showModal = false;
        await this.loadData();
      } catch (err) {
        alert(err.response?.data?.message || "Gagal menyimpan supplier");
      } finally {
        this.loading = false;
      }
    },

    async hapus(id) {
      if (!confirm("Yakin ingin menghapus supplier ini?")) {
        return;
      }

      try {
        await axios.delete(`http://localhost:8080/supplier/${id}`);

        await this.loadData();
      } catch (err) {
        alert(err.response?.data?.message || "Gagal menghapus supplier");
      }
    },

    logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
};
