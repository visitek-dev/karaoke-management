//import { authHeader } from "../_helpers";
import axios from "axios";

export const receiptService = {
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
  const params = url === null ? `/api/payments/` : url;

  return await axios.get(params, requestConfig).then(handleResponse);
}

async function getAllNonPagination() {
  const requestConfig = {
    //headers: authHeader(),
  };
  return await axios
    .get(`/api/allPayments/`, requestConfig)
    .then(handleResponse);
}

async function getById(id) {
  const requestConfig = {
    //headers: authHeader(),
  };
  return await axios
    .get(`/api/payments/${id}`, requestConfig)
    .then(handleResponse);
}

async function add(receipt) {
  const requestConfig = {
    headers: {
      //authHeader(),
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(receipt);

  return await axios
    .post("/api/payments/", body, requestConfig)
    .then(handleResponse);
}

async function update(id, receipt) {
  const requestConfig = {
    headers: {
      //authHeader(),
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(receipt);

  return await axios
    .put(`/api/payments/${id}`, body, requestConfig)
    .then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(ids) {
  const requestConfig = {
    // headers: authHeader()
  };
  const promises = await ids.map((id) => {
    return axios.delete(`/api/payments/${id}`, requestConfig);
  });
  return Promise.all(promises).then(handleResponse);
}

function handleResponse(response) {
  let data;
  data = response.data;

  if (response.status > 400) {
    // if (response.status === 401) {
    //   // auto logout if 401 response returned from api
    //   //logout();
    //   location.reload(true);
    // }

    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }

  return data;
}
