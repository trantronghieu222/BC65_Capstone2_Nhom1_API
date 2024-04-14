// Render sản phẩm
function renderProductList(productsList) {
  var content = "";
  for (var i = 0; i < productsList.length; i++) {
    var product = productsList[i];

    var productHtml = `
          <div class="col-md-3">
            <div class="product__card">
              <div class="card__img">
                <img src="${product.img}" alt="" />
              </div>
              <div class="card__content">
                <h3 id="p-name">${product.name}</h3>
                <p id="p-price">$${product.price}</p>
                <span class="qty">
                  <label for="qty-input">Quantity:</label>
                  <input
                    style="margin-bottom: 10px"
                    type="number"
                    id="qty-input-${product.id}"
                    class="qty-input"
                    step="1"
                    min="1"
                    max="1000"
                    name="qty-input"
                    value="1"
                    pattern="[0-9]*"
                    title="Quantity"
                    inputmode="numeric"
                  />
                </span>
                <button type="button" class="btn btn-success" onclick="addToCart(${product.id})">Add to card</button>
              </div>
            </div>
          </div>
      `;

    content += productHtml;
  }
  //   in danh sách ra giao diện
  document.querySelector("#product-list").innerHTML = content;
}

// Render cart
function renderCart(cartList) {
  var content = "";
  for (var i = 0; i < cartList.length; i++) {
    var cart = cartList[i];
    var cartHtml = `
      <li class="product">
        <a href="#" class="product-link">
          <span class="product-image">
            <img
              src="${cart.img}"
              alt="Product Photo"
            />
          </span>
          <span class="product-details">
            <h3>${cart.name}</h3>
            <span class="qty-price">
              <span class="qty">
                <button class="minus-button" onclick="handleMinus(${cart.id})">
                  -
                </button>
                <input
                  type="number"
                  id="qty-cartInput-${cart.id}"
                  class="qty-input"
                  step="1"
                  min="1"
                  max="1000"
                  name="qty-input"
                  value="${cart.quantity}"
                  pattern="[0-9]*"
                  title="Quantity"
                  inputmode="numeric"
                />
                <button class="plus-button" onclick="handlePlus(${cart.id})">
                  +
                </button>
                <input
                  type="hidden"
                  name="item-price"
                  id="item-price-1"
                  value="${cart.price}"
                />
              </span>
              <span class="price">$${cart.price * cart.quantity}</span>
            </span>
          </span>
        </a>
        <a href="#remove" class="remove-button" onclick="delProductCart(${cart.id})"
          ><span class="remove-icon">X</span></a
        >
    </li>
    `
    content += cartHtml;
  }
  document.querySelector("#productsCart").innerHTML = content;
}

