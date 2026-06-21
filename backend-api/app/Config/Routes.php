<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */
$routes->get('/', 'Home::index');

$routes->get('test-401', 'Home::index', ['filter' => 'authfilter']);
$routes->get('test-jwt', 'Home::index', ['filter' => 'jwt']);

$routes->options('(:any)', static function () {
    return service('response')
        ->setStatusCode(200);
});

// Auth
$routes->post('auth/login', 'Auth::login');
$routes->post('auth/logout', 'Auth::logout', ['filter' => 'authfilter']);

$routes->resource('supplier');

// Kategori - semua butuh token kecuali GET
$routes->get('kategori', 'Kategori::index', ['filter' => 'authfilter']);
$routes->get('kategori/(:num)', 'Kategori::show/$1', ['filter' => 'authfilter']);
$routes->post('kategori', 'Kategori::create', ['filter' => 'authfilter']);
$routes->put('kategori/(:num)', 'Kategori::update/$1', ['filter' => 'authfilter']);
$routes->delete('kategori/(:num)', 'Kategori::delete/$1', ['filter' => 'authfilter']);

// Barang - GET publik, sisanya butuh token
$routes->get('barang', 'Barang::index', ['filter' => 'authfilter']);
$routes->get('barang/(:num)', 'Barang::show/$1', ['filter' => 'authfilter']);
$routes->post('barang', 'Barang::create', ['filter' => 'authfilter']);
$routes->put('barang/(:num)', 'Barang::update/$1', ['filter' => 'authfilter']);
$routes->delete('barang/(:num)', 'Barang::delete/$1', ['filter' => 'authfilter']);

// Transaksi - semua butuh token
$routes->get('transaksi', 'TransaksiBarang::index', ['filter' => 'authfilter']);
$routes->get('transaksi/(:num)', 'TransaksiBarang::show/$1', ['filter' => 'authfilter']);
$routes->post('transaksi', 'TransaksiBarang::create', ['filter' => 'authfilter']);
$routes->put('transaksi/(:num)', 'TransaksiBarang::update/$1', ['filter' => 'authfilter']);
$routes->delete('transaksi/(:num)', 'TransaksiBarang::delete/$1', ['filter' => 'authfilter']);

$routes->setAutoRoute(false);