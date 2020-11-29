 var itemcount=0;
 var price=0;
 var discount=0;
 var bottomcount=0;
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
    //console.log(data.items)
    document.getElementById("itemcount").innerHTML =itemcount;
    document.getElementById("bottomcount").innerHTML =itemcount;
    document.getElementById("price").innerHTML =price;
    document.getElementById("discount").innerHTML =discount;
    document.getElementById("itemnameadd").style.display = "none";
   if(data.items.length!=0){
    for (var i=0; i < data.items.length; ++i) {
        var productName=data.items[i].name;
        var imgSrc=data.items[i].image;
        var disCount=data.items[i].discount;
        var autualPrice=data.items[i].price.actual;
        var displayPrice=data.items[i].price.display;
        var cartData = encodeURIComponent(JSON.stringify(data.items[i]));

        document.getElementById("multi-products").innerHTML  +='<div class="multiboxes"><div class="big-box-one"><div class="label-one"><label>'+disCount+'% off</label></div><div class="space-over-img"><div class="box-cm"> <img src="'+imgSrc+'"></div></div><div class="items-one"><div class="set-one"><p>'+productName+'</p><label><span><i class="fa fa-dollar"></i>'+displayPrice+'</span> <i class="fa fa-dollar"></i>'+autualPrice+'</label></div><div class="set-two"><div class="add-to-cart"><a id="carts-title'+i+'" onclick="addToCart(\'' + cartData + '\',\'' + i + '\');"  class="addtoCart" href="javascript:void(0);">Add to cart</a></div></div></div></div></div>';     

    }

   }
});


//addTo Cart Function
function addToCart(cartData,i=0){
   document.getElementById("noitems").style.display = "none";
   var cart=decodeURIComponent(cartData);
   var cartItems=JSON.parse(cart);
   console.log(cartItems);
   var name=cartItems.name;
   var image=cartItems.image;
   var actual=cartItems.price.actual;
   var display=cartItems.price.display;
   var discount=cartItems.discount;   
 
   var displayItems='<tr><td><div class="img-item"><span><img src="'+image+'"></span> <span class="sm-item">'+name+'</span> <span class="value-last"></span></div></td><td><div class="number"><span class="minus">-</span><input type="text" value="1"/><span class="plus">+</span></div></td><td><p>'+ actual.toFixed(2)+'</p></td></tr>';
   document.getElementById("addtocartItem").innerHTML +=displayItems;

   var table = document.getElementById("tableId");
   var tbodyRowCount = table.tBodies[0].rows.length;
   var itemcount =parseInt(tbodyRowCount)-1;
   document.getElementById("itemcount").innerHTML =itemcount;
   document.getElementById("bottomcount").innerHTML =itemcount;
   var tId="carts-title"+i;
   document.getElementById(tId).innerHTML ='Added';
   document.getElementById(tId).removeAttribute("onclick");
   document.getElementById("itemnameadd").innerHTML =name+' is added to cart';
   document.getElementById("itemnameadd").style.display = "inline-block";
   
}