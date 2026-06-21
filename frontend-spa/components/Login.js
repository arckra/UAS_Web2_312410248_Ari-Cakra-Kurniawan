const Login = {
  template: `
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
      <div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 class="text-2xl font-bold text-center text-blue-700 mb-6">Login Admin</h2>

        <div v-if="error" class="bg-red-100 text-red-600 rounded-lg p-3 mb-4 text-sm">
          {{ error }}
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input v-model="email" type="email" placeholder="admin@warung.com"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input v-model="password" type="password" placeholder="••••••••"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>

        <button @click.prevent="login" :disabled="loading"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50">
          {{ loading ? 'Loading...' : 'Login' }}
        </button>

        <div class="text-center mt-4">
          <router-link to="/" class="text-sm text-gray-500 hover:text-blue-600">
            ← Kembali ke Beranda
          </router-link>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      email: '',
      password: '',
      error: '',
      loading: false,
    };
  },
  methods: {
    async login(event) {
      if (event) event.preventDefault();
      this.loading = true;
      this.error   = '';
      try {
        const res = await axios.post('http://localhost:8080/auth/login', {
          email:    this.email,
          password: this.password,
        });
        // Simpan token & info user ke localStorage
        localStorage.setItem('token',      res.data.token);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('nama',       res.data.nama);

        this.$router.push('/dashboard');
      } catch (e) {
        this.error = e.response?.data?.message || 'Login gagal, cek email & password kamu.';
      } finally {
        this.loading = false;
      }
    }
  }
};