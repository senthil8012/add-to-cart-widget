var itemcount=0;
var price=0;
var discount=0;
var totalprice=0;
var productprice=0;
var products = [];
var cartData = [];

//Fetch JSON Data With path and callBack
function fetchJSONFile(path, callback) {
   var httpRequest = new XMLHttpRequest();
   httpRequest.onreadystatechange = function() {
       if (httpRequest.readyState === 4) {
           if (httpRequest.status === 200) {
               var data = JSON.parse(httpRequest.responseText);
               if (callback) callback(data);
           }
       }
   };
   httpRequest.open('GET', path);
   httpRequest.send(); 
}
//Fetch the JSON Data
fetchJSONFile('data.json', function(data){
   init();
   if(data.items.length!=0){
       for (var i=0; i < data.items.length; i++) {
           var newProduct = {
                product_id: i+1,
                product_qty:1,
                product_price:data.items[i].price.actual,
                product_display:data.items[i].price.display,
                product_discount:data.items[i].discount,
                product_image:data.items[i].image,
                product_name:data.items[i].name,
           };

           products.push(newProduct);
       }
        productList();
     }

});
//Init Page
function init(){
   document.getElementsByClassName("itemcount")[0].innerText  =itemcount;
   document.getElementsByClassName("itemcount")[1].innerText  =itemcount;
   document.getElementsByClassName("itemcount")[2].innerText  =itemcount;
   document.getElementById("price").innerHTML =price;
   document.getElementById("discount").innerHTML =discount;
   document.getElementById("totalprice").innerHTML =discount;
   //document.getElementById("itemnameadd").style.display = "none";
}
//Products Lists
function productList(){
   if(products.length!=0){
       for (var i=0; i < products.length; i++) {
           document.getElementById("multi-products").innerHTML  +='<div class="multiboxes"><div class="big-box-one"><div class="label-one"><label>'+products[i].product_discount+'% off</label></div><div class="space-over-img"><div class="box-cm"> <img src="'+products[i].product_image+'"></div></div><div class="items-one"><div class="set-one"><p>'+products[i].product_name+'</p><label><span><i class="fa fa-dollar"></i>'+products[i].product_display+'</span> <i class="fa fa-dollar"></i>'+products[i].product_price+'</label></div><div class="set-two"><div class="add-to-cart"><a id="carts-title'+i+'" onclick="addToCart(\'' + products[i].product_id + '\',\'' + i + '\');"  class="addtoCart" href="javascript:void(0);">Add to cart</a></div></div></div></div></div>';     

       }
           
    }
}
//Addtocart
function addToCart(product_id,product_find) {
    var tId="carts-title"+product_find;
    document.getElementById(tId).innerHTML ='Added';
    document.getElementById(tId).removeAttribute("onclick");
    for (var i = 0; i < products.length; i++) {
        if (products[i].product_id == product_id) {
            var cartItem = null;
            for (var k = 0; k < cartData.length; k++) {
                if (cartData[k].product.product_id == products[i].product_id) {
                    cartItem = cartData[k];
                    break;
                }
            }
            if (cartItem == null) {
                
                var cartItem = {
                    product: products[i],
                    product_qty: products[i].product_qty 
                };
                cartData.push(cartItem);
            }
        }
    }

    cartListItems();

}
//Cart List Items
function cartListItems() {
    document.getElementsByClassName("itemcount")[0].innerText  =cartData.length;
    document.getElementsByClassName("itemcount")[1].innerText  =cartData.length;
    document.getElementsByClassName("itemcount")[2].innerText  =cartData.length;
    document.getElementById("addtocartItem").innerHTML="";
    document.getElementById("price").innerHTML=""
    document.getElementById("discount").innerHTML=""
    var GrandTotal=0;
    var disCountTotal=0;
    var productPrice=0;
    var totalDis=0;
    if(cartData.length!=0){
      for (var i = 0; i < cartData.length; i++) {
        var displayItems='<tr><td><div class="img-item"><span><img src="'+cartData[i].product.product_image+'"></span> <span class="sm-item">'+cartData[i].product.product_name+'</span> <span class="value-last" onclick="removeProduct(\'' + cartData[i].product.product_id + '\',this);"><i class="fa fa-remove"></i></span></div></td><td><div class="number"><span  onclick="decreseQuantity(\'' + cartData[i].product.product_id + '\',this);" class="minus">-</span><input type="number" id="qty'+cartData[i].product.product_id+'" min="1" max="99" value="'+cartData[i].product_qty+'"/><span class="plus" onclick="increseQuantity(\'' + cartData[i].product.product_id + '\',this);">+</span></div></td><td><p><i class="fa fa-dollar"></i>'+ cartData[i].product.product_price.toFixed(2)+'</p></td></tr>';
        document.getElementById("addtocartItem").innerHTML +=displayItems;

        productPrice =parseFloat(cartData[i].product.product_price) * parseInt(cartData[i].product_qty); 
        var numVal2 = parseInt(cartData[i].product.product_discount) / 100;
        var totalValue = productPrice - (productPrice * numVal2);
        disCountTotal +=totalValue;
        GrandTotal += parseFloat(cartData[i].product.product_price) * parseInt(cartData[i].product_qty);        
    }
  }else{
    document.getElementById("addtocartItem").innerHTML ='<tr id="noitems"><td class="row-center" colspan="3">No records found</td></tr>';
  }
   
    document.getElementById("price").innerHTML ='<i class="fa fa-dollar"></i>'+GrandTotal.toFixed(2);
    document.getElementById("discount").innerHTML ='<i class="fa fa-dollar"></i>'+disCountTotal.toFixed(2);
    totalprice=parseInt(GrandTotal)-parseInt(disCountTotal);
    document.getElementById("totalprice").innerHTML ='<i class="fa fa-dollar"></i>'+totalprice.toFixed(2);
}
//Increse Quantity
function increseQuantity(product_id)
{
    
    for (var i = 0; i < cartData.length; i++) {
        if (cartData[i].product.product_id == product_id) {
            cartData[i].product_qty++;
        }  
    }
    cartListItems();
}
//Decrese Quantity
function decreseQuantity(product_id)
{
    
    for (var i = 0; i < cartData.length; i++) {
        if (cartData[i].product.product_id == product_id) {
            cartData[i].product_qty--;
            if(cartData[i].product_qty==0){
                return false;
            }
        }

    
    }
    cartListItems();
}
//Remove add to cart items
function removeProduct(product_id)
{
    if (confirm('Are you sure you want to remove this item?')) {
        for (var i = 0; i < cartData.length; i++) {
            if (cartData[i].product.product_id == product_id) {
                cartData.splice(i,1);
            }
        }
        cartListItems();
      } 
    
  }