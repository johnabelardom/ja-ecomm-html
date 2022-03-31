$.fn.serializeAssoc = function () {
    var data = {};
    $.each(this.serializeArray(), function (key, obj) {
        var a = obj.name.match(/(.*?)\[(.*?)\]/);
        if (a !== null) {
            var subName = a[1];
            var subKey = a[2];

            if (!data[subName]) {
                data[subName] = [];
            }

            if (!subKey.length) {
                subKey = data[subName].length;
            }

            if (data[subName][subKey]) {
                if ($.isArray(data[subName][subKey])) {
                    data[subName][subKey].push(obj.value);
                } else {
                    data[subName][subKey] = [];
                    data[subName][subKey].push(obj.value);
                }
            } else {
                data[subName][subKey] = obj.value;
            }
        } else {
            if (data[obj.name]) {
                if ($.isArray(data[obj.name])) {
                    data[obj.name].push(obj.value);
                } else {
                    data[obj.name] = [];
                    data[obj.name].push(obj.value);
                }
            } else {
                data[obj.name] = obj.value;
            }
        }
    });
    return data;
};

window.__ecomm = {
    cleanKeys: function(key) {
        if (this.getItem(key)) {
            var items = this.getItem(key);

            
            for (var propName in items) {
                if (items[propName] === null || items[propName] === undefined) {
                delete items[propName];
                }
            }
            
            this.setItem(key, items);
        }
    },
    getItem: function(key) {
        return window.localStorage.getItem(key) ? JSON.parse(window.localStorage.getItem(key), []) : [];
    },
    setItem: function(key, data) {
        window.localStorage.setItem(key, JSON.stringify(data));
    },
    removeItem(key) {
        window.localStorage.removeItem(key);
    }
};

const cartUpdated = jQuery.Event( "submit" );

window.shop = {
    products: JSON.parse('[{"image":"https://picsum.photos/id/65/500/500","name":"blanditiis","price":175.28,"quantity":3,"seller_id":2,"id":2},{"image":"https://picsum.photos/id/309/500/500","name":"odio","price":254.19,"quantity":1,"seller_id":2,"id":3},{"image":"https://picsum.photos/id/496/500/500","name":"ipsam","price":915.21,"quantity":1,"seller_id":2,"id":6},{"image":"https://picsum.photos/id/291/500/500","name":"magnam","price":709.32,"quantity":2,"seller_id":2,"id":1},{"image":"https://picsum.photos/id/517/500/500","name":"distinctio","price":707.67,"quantity":1,"seller_id":2,"id":8},{"image":"https://picsum.photos/id/379/500/500","name":"dolores","price":731.89,"quantity":1,"seller_id":2,"id":7}]'),
    cart: {
        refreshCartUi() {
            jQuery('.shop_cart-count').html(window.__ecomm.getItem("cart_items").length);
            refreshCartUi();
        },
        getItem(product_id) {
            var cartItems = __ecomm.getItem('cart_items', []);

            if (! cartItems) {
                cartItems = [];
            }
            
            return cartItems.find(function(element, index) {
                return element.id == product_id;
            });
        },
        addItem(product_id ) {
            var cartItems = __ecomm.getItem('cart_items', []);

            if (! cartItems) {
                cartItems = [];
            }
            console.log(cartItems);
            
            var existingItem = cartItems.find(function(element, index) {
                if (element.id == product_id ) {
                    cartItems[index].quantity++;
                    __ecomm.setItem('cart_items', cartItems);
                    alert('Successfully added to cart!');
                }
                return element.id == product_id;
            });

            if (existingItem) {
            } else {
                var product = window.shop.products.find(function(element, index) {
                    return element.id == product_id;
                });

                if (product) {
                    cartItems.push( {
                        image: product.image,//"https://picsum.photos/id/65/500/500",
                        name: product.name,//"blanditiis",
                        price: product.price,//175.28,
                        quantity: 1,//5,
                        seller_id: product.user_id,//2,
                        id: product.id,//2,
                    })

                    __ecomm.setItem('cart_items', cartItems);
                    
                    alert('Successfully added to cart!');
                }
            }

            __ecomm.cleanKeys('cart_items');
            window.shop.cart.refreshCartUi();
        },
        removeItem(product_id ) {
            var cartItems = __ecomm.getItem('cart_items', []);

            if (! cartItems) {
                cartItems = [];
            }
            
            var existingItem = cartItems.findIndex(function(element, index) {
                return element.id == product_id;
            });

            // alert(existingItem);


            if (existingItem > -1) {
                // cartItems[product_id].quantity++;
                // if (existingItem == 0)
                //     delete cartItems[existingItem]; 
                // else
                    console.log(cartItems.splice(existingItem, 1));
                __ecomm.setItem('cart_items', cartItems);
            }
            
            __ecomm.cleanKeys('cart_items');
            window.shop.cart.refreshCartUi();
        },
        addItemQuantity(product_id) {
            var cartItems = __ecomm.getItem('cart_items', []);

            if (! cartItems) {
                cartItems = [];
            }
            
            var existingItem = cartItems.findIndex(function(element, index) {
                if (element.id == product_id ) {
                    cartItems[index].quantity++;
                    __ecomm.setItem('cart_items', cartItems);
                }
                return element.id == product_id;
            });

            // if (cartItems[existingItem]) {
            //     cartItems[existingItem].quantity++;
            // }

            __ecomm.setItem('cart_items', cartItems);
            window.shop.cart.refreshCartUi();
        },
        subItemQuantity(product_id ) {
            var cartItems = __ecomm.getItem('cart_items', []);

            if (! cartItems) {
                cartItems = [];
            }
            var existingItem = cartItems.findIndex(function(element, index) {
                if (element.id == product_id ) {
                    cartItems[index].quantity--;
                    __ecomm.setItem('cart_items', cartItems);
                }
                return element.id == product_id;
            });

            // if (cartItems[existingItem]) {
            //     cartItems[existingItem].quantity++;
            // }

            __ecomm.setItem('cart_items', cartItems);
            window.shop.cart.refreshCartUi();
        },
        clearCart() {
            window.__ecomm.setItem('cart_items', []);
            window.location.reload();
        }
    }
}

window.addEventListener('load', function(e) {
    window.shop.cart.refreshCartUi();

    var productsContainer = jQuery('#products');
    if (productsContainer) {
        var productCardTemplate = jQuery('#product-card-template');
        window.shop.products.forEach(element => {
            var prod = String(productCardTemplate.text());
            prod = prod.replace('{{image}}', element.image)
            .replace('{{id}}', element.id)
            .replace('{{title}}', element.name)
            .replace('{{price}}', element.price);
    
            productsContainer.find('.products-wrapper').append(prod);
        });
    }

    var cart = jQuery('#cart');
    if (cart) {
        var itemTemplate = jQuery('#product-cart_item-template');
        var cartItems = window.__ecomm.getItem('cart_items');
        cartItems.forEach(element => {
            var item = String(itemTemplate.text());
            item = item.replace('{{image}}', element.image)
            .replace('{{quantity}}', element.quantity)
            .replace('{{items_price}}', (element.quantity * element.price).toFixed(2))
            .replace('{{id}}', element.id)
            .replace('{{id}}', element.id)
            .replace('{{id}}', element.id)
            .replace('{{title}}', element.name)
            .replace('{{price}}', element.price);
    
            cart.find('table tbody').append(item);
        });
    }

    
    var checkout = jQuery('#checkout');
    if (checkout.length > 0) {
        var itemTemplate = jQuery('#checkout_product-cart_item-template');
        var cartItems = window.__ecomm.getItem('cart_items');
        cartItems.forEach(element => {
            var item = String(itemTemplate.text());
            item = item.replace('{{image}}', element.image)
            .replace('{{quantity}}', element.quantity)
            .replace('{{items_price}}', (element.quantity * element.price).toFixed(2))
            .replace('{{id}}', element.id)
            .replace('{{id}}', element.id)
            .replace('{{id}}', element.id)
            .replace('{{title}}', element.name)
            .replace('{{price}}', element.price);
    
            checkout.find('ul.checkout_cart').append(item);
        });

        jQuery('#checkout-form').submit(function(e) {
            e.preventDefault();

            var orderHash = makeid(10);
            jQuery('#order_hash').val(orderHash);
            window.__ecomm.setItem('cart_' + orderHash, {
                items: window.__ecomm.getItem('cart_items'),
                customer: jQuery('form').serializeAssoc(),
            });

            window.location.href = "thankyou.html?key=" + orderHash 

            return false;
        })
    }

    
    var thankyou = jQuery('#thankyou');
    if (thankyou.length > 0) {
        var itemTemplate = jQuery('#thankyou_product-cart_item-template');
        var cartItems = window.__ecomm.getItem('cart_items');
        var index = 1;
        var GetParams = getParams();

        if (GetParams.key && window.__ecomm.getItem('cart_' + GetParams.key)) {
            var checkoutData = window.__ecomm.getItem('cart_' + GetParams.key);
            var customerInfo = checkoutData.customer;
            var cartItems = checkoutData.items;
            jQuery(".thankyou_customer-name").html(decodeURI(customerInfo.firstName ? customerInfo.firstName.replaceAll('+', ' ') : ''));
            jQuery(".thankyou_address").html(decodeURI(customerInfo.address ? customerInfo.address.replaceAll('+', ' ') : ''));
            jQuery(".thankyou_address2").html(decodeURI(customerInfo.address2 ? customerInfo.address2.replaceAll('+', ' ') : ''));
            jQuery(".thankyou_city").html(decodeURI(customerInfo.city ? customerInfo.city.replaceAll('+', ' ') : ''));
            jQuery(".thankyou_zip").html(decodeURI(customerInfo.zip ? customerInfo.zip.replaceAll('+', ' ') : ''));
            jQuery(".thankyou_state").html(decodeURI(customerInfo.state ? customerInfo.state.replaceAll('+', ' ') : ''));
            jQuery(".thankyou_country").html(decodeURI(customerInfo.country ? customerInfo.country.replaceAll('+', ' ') : ''));
            jQuery(".thankyou_phone").html(decodeURI(customerInfo.phone ? customerInfo.phone.replaceAll('+', ' ') : ''));
        


            cartItems.forEach(element => {
                var item = String(itemTemplate.text());
                item = item.replace('{{image}}', element.image)
                .replace('{{quantity}}', element.quantity)
                .replace('{{items_price}}', (element.quantity * element.price).toFixed(2))
                .replace('{{id}}', element.id)
                .replace('{{id}}', element.id)
                .replace('{{id}}', element.id)
                .replace('{{title}}', element.name)
                .replace('{{index}}', index)
                .replace('{{price}}', element.price);
        
                thankyou.find('.thankyou_cart-items tbody').append(item);
                index++;
            });

                    
            jQuery('.cart_total-price').html((function() {
                var total = 0;
                cartItems.forEach(element => {
                    total = ((total *1) + ((element.quantity * element.price).toFixed(2) *1)).toFixed(2);
                });
                return total;
            })());
        }

        window.__ecomm.removeItem('cart_items');
    }

    
    
    jQuery('.shop_add-cart').on('click', function(e) {
        window.shop.cart.addItem(e.target.dataset.productId);
    })

    jQuery('body').on('shop.cart.updated', function() {
        window.shop.cart.refreshCartUi();
    })

    jQuery('.cart_item_add').on('click', function(e) {
        window.shop.cart.addItemQuantity(e.target.dataset.productId);
        var prodItem = window.shop.cart.getItem(e.target.dataset.productId);
        console.log(e.target, prodItem);
        jQuery(e.target).parent().find('input.quantity').val(prodItem.quantity);
        var parentTr = jQuery(this).closest('tr');
        parentTr.find('.item_price').html('$' + (prodItem.price).toFixed(2))
        parentTr.find('.item_items_price').html('$' + (prodItem.price * prodItem.quantity).toFixed(2))
    })
    jQuery('.cart_item_sub').on('click', function(e) {
        if (jQuery(e.target).parent().find('input.quantity').val() == 1)
            return;

        window.shop.cart.subItemQuantity(e.target.dataset.productId);
        var prodItem = window.shop.cart.getItem(e.target.dataset.productId);
        jQuery(e.target).parent().find('input.quantity').val(prodItem.quantity);
        var parentTr = jQuery(this).closest('tr');
        parentTr.find('.item_price').html('$' + (prodItem.price).toFixed(2))
        parentTr.find('.item_items_price').html('$' + (prodItem.price * prodItem.quantity).toFixed(2))
    })
    
    jQuery('.shop_cart_remove-item').on('click', function(e) {
        window.shop.cart.removeItem(e.target.dataset.productId);
        window.location.reload();
    })
})


function refreshCartUi() {
    var cartItems = window.__ecomm.getItem('cart_items');
    jQuery('.shop_cart-count').html((function() {
        var total = 0;
        cartItems.forEach(element => {
            total = ((total *1) + (element.quantity));
        });
        return total;
    })());
    jQuery('.cart_total-price').html((function() {
        var total = 0;
        cartItems.forEach(element => {
            total = ((total *1) + ((element.quantity * element.price).toFixed(2) *1)).toFixed(2);
        });
        return total;
    })());
}


function getParams ()
{
    var result = {};
    var tmp = [];

    location.search
        .substr (1)
        .split ("&")
        .forEach (function (item)
        {
            tmp = item.split ("=");
            result [tmp[0]] = decodeURIComponent (tmp[1]);
        });

    return result;
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}