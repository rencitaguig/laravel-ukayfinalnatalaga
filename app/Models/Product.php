<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Foundation\Auth\Product as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Scout\Searchable;
class Product extends Model
{
    use HasFactory, Notifiable, HasRoles, HasApiTokens, Searchable;

    protected $guarded = [];
    protected $table = 'products';
    protected $fillable = ['name', 'size', 'description', 'quantity', 'price', 'image', 'category_id', 'brand_id', 'stock'];

    protected $primaryKey = 'id';

    public function toSearchableArray()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'size' => $this->size,
            'description' => $this->description,
            'price' => $this->price,
            'quantity' => $this->quantity,
            'stock' => $this->stock,
            'category_id' => $this->category_id,
            'brand_id' => $this->brand_id,
            'image' => $this->image,
        ];
    }
}

    // protected $guarded = [];

    //  Scope Filter
    // public function scopeFilter($query, array $filters)
    // {
    //     $query->when($filters['search'] ?? null, function ($query, $search) {
    //         $query->where('name', 'like', '%' . $search . '%')
    //             ->orWhere('sku_code', 'like', '%' . $search . '%')
    //             ->orWhere('description', 'like', '%' . $search . '%')
    //             ->orWhere('specifications', 'like', '%' . $search . '%');
    //     });
    // }
    // public function customers()
    // {
    //     return $this->belongsToMany(User::class, 'customer_products')->withPivot('quantity');
    // }

    // public function orders()
    // {
    //     return $this->belongsToMany(Order::class, 'order_products')->withPivot('quantity');
    // }

    // public function stock()
    // {
    //     return $this->hasOne(Stock::class, 'product_sku_code', 'sku_code');
    // }

