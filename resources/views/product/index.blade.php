@extends('layouts.master')
@section('content')
<div id="products" class="container">
    <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#productModal">Add <span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
    <div class="card-body" style="height: 210px;">
        <input type="text" id='productSearch' placeholder="--search--">
    </div>
    <div class="table-responsive">
        <table id="producttable" class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Category ID</th>
                    <th>Brand ID</th>
                    <th>Stock</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="productbody">
            </tbody>
        </table>
    </div>
</div>

<div id="brands" class="container">
    <div class="card-body">
        <form action="{{ url('products/import') }}" method="POST" enctype="multipart/form-data">
            @csrf
            <div class="input-group">
                <input type="file" name="importFile" class="form-control" />
                <button type="submit" class="btn btn-primary">Import</button>
            </div>
        </form>
    </div>
    
<div class="modal fade" id="productModal" role="dialog" style="display:none">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Create New Product</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="productform" method="#" action="#" enctype="multipart/form-data">
                    <div class="form-group">
                        <label for="name" class="control-label">Product Name</label>
                        <input type="text" class="form-control" id="name_id" name="name">
                    </div>
                    <div class="form-group">
                        <label for="size" class="control-label">Size</label>
                        <input type="text" class="form-control" id="size_id" name="size">
                    </div>
                    <div class="form-group">
                        <label for="description" class="control-label">Description</label>
                        <input type="text" class="form-control" id="description_id" name="description">
                    </div>
                    <div class="form-group">
                        <label for="quantity" class="control-label">Quantity</label>
                        <input type="number" class="form-control" id="quantity_id" name="quantity">
                    </div>
                    <div class="form-group">
                        <label for="price" class="control-label">Price</label>
                        <input type="number" class="form-control" id="price_id" name="price">
                    </div>
                    <div class="form-group">
                        <label for="category_id" class="control-label">Category ID</label>
                        <input type="number" class="form-control" id="category_id" name="category_id">
                    </div>
                    <div class="form-group">
                        <label for="brand_id" class="control-label">Brand ID</label>
                        <input type="number" class="form-control" id="brand_id" name="brand_id">
                    </div>
                    <div class="form-group">
                        <label for="stock" class="control-label">Stock</label>
                        <input type="number" class="form-control" id="stock_id" name="stock">
                    </div>
                    <div class="form-group">
                        <label for="image" class="control-label">Image</label>
                        <input type="file" class="form-control" id="image" name="uploads[]" multiple>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button id="productSubmit" type="submit" class="btn btn-primary">Save</button>
                <button id="productUpdate" type="submit" class="btn btn-primary">Update</button>
            </div>
        </div>
    </div>
</div>
@endsection
