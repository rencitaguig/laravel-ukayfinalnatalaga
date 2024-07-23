<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\ProductController;
use App\Models\Product;

Route::get('/', function () {
    return view('index');
})->name('home');


Route::view('/customer-all', 'customer.index');
Route::view('/brand-all', 'brand.index');
Route::view('/announcement-all', 'announcement.index');
Route::view('/product-all', 'product.index');


Route::post('/announcements/import', [AnnouncementController::class, 'import']);
Route::post('/brands/import', [BrandController::class, 'import']);
Route::post('/products/import', [ProductController::class, 'import']);


Route::get('/fetch-products', [ProductController::class, 'fetchProducts']); 


require __DIR__ . '/auth.php';
