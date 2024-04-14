function renderProductList(productsList) {
  var content = "";
  for (var i = 0; i < productsList.length; i++) {
    var product = productsList[i];

    var productHtml = `
          <tr>
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td>${product.screen}</td>
            <td>${product.backCamera}</td>
            <td>${product.frontCamera}</td>
            <td><img src="${product.img}" alt="" style="width: 100px"></td>
            <td>${product.desc}</td>
            <td>${product.type}</td>
            <td>
              <button class="btn btn-warning" onclick="editProduct('${product.id}')" >Edit</button>
              <button class="btn btn-danger" onclick="delProduct('${product.id}')">Del</button>
            </td>
          </tr>
      `;

    content += productHtml;
  }

  //   in danh sách ra giao diện
  document.querySelector("#tableDanhSach").innerHTML = content;
}

function getInfo() {
  var id = document.getElementById("MaSP").value;
  var name = document.getElementById("name").value;
  var price = document.getElementById("price").value;
  var screen = document.getElementById("screen").value;
  var backCamera = document.getElementById("backCamera").value;
  var frontCamera = document.getElementById("frontCamera").value;
  var img = document.getElementById("img").value;
  var desc = document.getElementById("desc").value;
  var type = document.getElementById("type").value;
  return new products(id, name, price, screen, backCamera, frontCamera, img, desc, type);
}
