<?php require 'layout/head.php'; ?>

<textarea name="" id="product-card-template" cols="30" rows="10" style="display: none;">
<div class="col mb-5">
    <div class="card h-100">
        <!-- Product image-->
        <img class="card-img-top" src="{{image}}" alt="...">
        <!-- Product details-->
        <div class="card-body p-4">
            <div class="text-center">
                <!-- Product name-->
                <h5 class="fw-bolder">{{title}}</h5>
                <!-- Product price-->
                ${{price}}
            </div>
        </div>
        <!-- Product actions-->
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center"><a class="btn btn-outline-dark mt-auto shop_add-cart" data-product-id="{{id}}" href="javascript: void(0);">Add to Cart</a></div>
        </div>
    </div>
</div>
</textarea>

<section class="py-5" id="products">
    <div class="container px-4 px-lg-5 mt-5">
        <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center products-wrapper">
            

        </div>
    </div>
</section>


<?php require 'layout/foot.php'; ?>