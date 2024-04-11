function renderProductList(productsList) {
  var content = "";
  for (var i = 0; i < productsList.length; i++) {
    var product = productsList[i];

    var productHtml = `
          <tr>
            <td>${product.name}</td>
            <td>${product.price}</td>
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