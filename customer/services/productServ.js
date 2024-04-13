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
    getProductByID: function (id) {
      return axios({
        url: `${BASE_URL}/${id}`,
        method: "GET",
      });
    },
};  