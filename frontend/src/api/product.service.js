//import { authHeader } from "../store";
import axios from "axios";

export const productService = {
  getAll,
  getAllNonPagination,
  getById,
  add,
  update,
  delete: _delete,
};

async function getAll(url = null) {
  const requestConfig = {
    //headers: authHeader()
  };
  const params = url === null ? `/api/products` : url;

  return await axios.get(params, requestConfig).then(handleResponse);
}

async function getAllNonPagination() {
  const requestConfig = {
    //headers: authHeader(),
  };
  return await axios
    .get(`/api/allProducts/`, requestConfig)
    .then(handleResponse);
}

async function getById(id) {
  const requestConfig = {
    //headers: authHeader(),
  };
  return await axios
    .get(`/api/products/${id}`, requestConfig)
    .then(handleResponse);
}

async function add(product, image) {
  // const imageData = new FormData();

  // for (let i = 0; i < image.length; i++)
  //   imageData.append("image", image[i].img);

  // console.log(imageData);
  const requestConfig = {
    headers: {
      //authHeader(),
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(product);

  // if (imageData.get("image")) {
  //   let res;
  //   try {
  //     res = await axios.post(`/api/products`, body, requestConfig);
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   const configFormData = {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   };
  //   try {
  //     return await axios
  //       .put(
  //         "/api/products/" + res.data.data._id + "/image",
  //         imageData,
  //         configFormData
  //       )
  //       .then(handleResponse);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // } else {
  return await axios
    .post("/api/products/", body, requestConfig)
    .then(handleResponse);
  //}
}

async function update(id, product, image, delImage) {
  // const imageData = new FormData();

  // for (let i = 0; i < image.length; i++)
  //   imageData.append("image", image[i].img);

  // console.log("image data " + imageData);

  const requestConfig = {
    headers: {
      //authHeader(),
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(product);

  // const requestConfig1 = {
  //   // headers: authHeader()
  // };

  // for (let i = 0; i < delImage.length; i++)
  //   try {
  //     await axios.delete(
  //       "/api/products/" + id + "/image/" + delImage[i],
  //       imageData,
  //       requestConfig1
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }

  // if (imageData.get("image")) {
  //   try {
  //     await axios.put(`/api/products/${id}`, body, requestConfig);
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   const configFormData = {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   };
  //   try {
  //     return await axios
  //       .put("/api/products/" + id + "/image", imageData, configFormData)
  //       .then(handleResponse);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // } else {
  return await axios
    .put(`/api/products/${id}/`, body, requestConfig)
    .then(handleResponse);
  // }
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(ids) {
  const requestConfig = {
    // headers: authHeader()
  };

  const promises = await ids.map((id) => {
    return axios.delete(`/api/products/${id}`, requestConfig);
  });
  return Promise.all(promises).then(handleResponse);
}

function handleResponse(response) {
  let data;
  data = response.data;

  if (response.status > 400) {
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }
  return data;
}
