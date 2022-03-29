<?php require 'layout/head.php'; ?>


<textarea name="" id="product-cart_item-template" cols="30" rows="10" style="display: none;">
<tr>
    <td class="p-4">
        <div class="media align-items-center"> 
            <img src="{{image}}" class="d-block ui-w-40 ui-bordered mr-4" alt="" width="100">
            <div class="media-body"> 
                <a href="javascript: void(0);" class="d-block text-dark">{{title}}</a>
        </div>
    </td>
    <td class="text-right font-weight-semibold align-middle p-4 item_price">${{price}}</td>
    <td class="align-middle p-4">
        <div class="d-flex">
            <button class="btn btn-sm cart_item_sub" data-product-id="{{id}}">-</button>
            <input type="text" class="form-control text-center quantity" style="width: 50px;" value="{{quantity}}" readonly>
            <button class="btn btn-sm cart_item_add" data-product-id="{{id}}">+</button>
        </div>
    </td>
    <td class="text-right font-weight-semibold align-middle p-4 item_items_price">${{items_price}}</td>
    <td class="text-center align-middle px-0">
        <a href="javascript: void(0);" class="shop-tooltip close float-none text-danger shop_cart_remove-item" data-product-id="{{id}}" title="" data-original-title="Remove">×</a>
    </td>
</tr>
</textarea>

<div class="container px-3 my-5 clearfix" id="cart">
    <div class="card">
        <div class="card-header">
            <h2>Shopping Cart</h2>
            <button class="btn btn-success" onclick="window.shop.cart.clearCart()">Remove All</button>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered m-0">
                    <thead>
                        <tr>
                            <th class="text-center py-3 px-4" style="min-width: 400px;">Product Name &amp; Details</th>
                            <th class="text-right py-3 px-4" style="width: 100px;">Price</th>
                            <th class="text-center py-3 px-4" style="width: 120px;">Quantity</th>
                            <th class="text-right py-3 px-4" style="width: 100px;">Total</th>
                            <th class="text-center align-middle py-3 px-0" style="width: 40px;"><a href="#"
                                    class="shop-tooltip float-none text-light" title=""
                                    data-original-title="Clear cart"><i class="ino ion-md-trash"></i></a></th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
            <div class="d-flex flex-wrap justify-content-between align-items-center pb-4">
                <div class="d-flex">
                    <div class="text-right mt-4"> <label class="text-muted font-weight-normal m-0">Total price</label>
                        <div class="text-large"><strong>$ <span class="cart_total-price">0.00</span></strong></div>
                    </div>
                </div>
            </div>
            <div class="float-right"> 
                <a href="/" class="btn btn-lg btn-default md-btn-flat mt-2 mr-3">
                    Back to shopping
                </a> 
                <a href="/checkout.php" class="btn btn-lg btn-primary mt-2">
                    Checkout
                </a>
            </div>
        </div>
    </div>
</div>

<?php require 'layout/foot.php'; ?>