**Buat Tabel Via Migration**

```php
php spark make:migration CreateUsersTable
php spark make:migration CreateKategoriTable
php spark make:migration CreateBarangTable
php spark make:migration CreateTransaksiBarangTable
php spark make:migration CreateSupplierTable
```

**Membuat file AuthFilter**
```php
php spark make:filter AuthFilter
```

**Membuat Beberapa Controller**
```php
php spark make:controller Barang --restful
php spark make:controller Kategori --restful
php spark make:controller TransaksiBarang --restful
```

**Menjalankan Server**
```php
php spark serve
```

**Menambahkan Kategori**

F:\pictures\Screenshots\Screenshot 2026-06-18 114636.png

**Menambahkan Barang**

F:\pictures\Screenshots\Screenshot 2026-06-18 114941.png

