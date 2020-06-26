//import { authHeader } from "../_helpers";
import axios from "axios";

export const roomService = {
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
  const params = url === null ? `/api/rooms/` : url;

  return await axios.get(params, requestConfig).then(handleResponse);
}

async function getAllNonPagination(url = null) {
  const requestConfig = {
    //headers: authHeader(),
  };
  const params = url === null ? `/api/allRooms` : url;
  return await axios.get(params, requestConfig).then(handleResponse);
}

async function getById(id) {
  const requestConfig = {
    //headers: authHeader(),
  };
  return await axios
    .get(`/api/rooms/${id}/`, requestConfig)
    .then(handleResponse);
}

async function add(room) {
  const requestConfig = {
    headers: {
      //authHeader(),
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(room);

  return await axios
    .post("/api/rooms/", body, requestConfig)
    .then(handleResponse);
}

async function update(id, room) {
  const requestConfig = {
    headers: {
      //authHeader(),
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(room);
  console.log(body);

  return await axios
    .put(`/api/rooms/${id}/`, body, requestConfig)
    .then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(ids) {
  const requestConfig = {
    // headers: authHeader()
  };

  const promises = await ids.map((id) => {
    return axios.delete(`/api/rooms/${id}`, requestConfig);
  });
  return Promise.all(promises).then(handleResponse);
}

function handleResponse(response) {
  let data;
  data = response.data;
  if (response.status === 404) {
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }

  return data;
}
