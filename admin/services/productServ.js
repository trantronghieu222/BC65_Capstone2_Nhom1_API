const BASE_URL = "https://65fc26b814650eb2100ba79a.mockapi.io/products";
var productServ = {
    getProduct: function (name) {
      return axios({
        url: BASE_URL,  
        method: "GET",
        params: {
          name: name || undefined,
        },
      });
    },
    delProductByID: function (id) {
      return axios({
        url: `${BASE_URL}/${id}`,
        method: "DELETE",
      });
    },
    addProduct: function (sp) {
      return axios({
        url: BASE_URL,
        method: "POST",
        data: sp,
      });
    },
    getProductByID: function (id) {
      return axios({
        url: `${BASE_URL}/${id}`,
        method: "GET",
      });
    },
    updateProductByID: function (id, sp) {
      return axios({
        url: `${BASE_URL}/${id}`,
        method: "PUT",
        data: sp,
      });
    },
};  