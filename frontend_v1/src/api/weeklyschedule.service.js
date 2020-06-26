//import { authHeader } from "../_helpers";
import axios from "axios";

export const weeklyScheduleService = {
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
  const params = url === null ? `/api/weeklySchedule` : url;

  return await axios.get(params, requestConfig).then(handleResponse);
}

async function getAllNonPagination() {
  const requestConfig = {
    //headers: authHeader(),
  };
  return await axios
    .get(`/api/allWeeklySchedules/`, requestConfig)
    .then(handleResponse);
}

async function getById(id) {
  const requestConfig = {
    //headers: authHeader(),
  };
  return await axios
    .get(`/api/weeklySchedules/${id}`, requestConfig)
    .then(handleResponse);
}

async function add(schedule) {
  const requestConfig = {
    headers: {
      //authHeader(),
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(schedule);

  return await axios
    .post("/api/weeklySchedules/", body, requestConfig)
    .then(handleResponse);
}

async function update(id, schedule) {
  const requestConfig = {
    headers: {
      //authHeader(),
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(schedule);
  console.log(body);

  return await axios
    .put(`/api/weeklySchedules/${id}`, body, requestConfig)
    .then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(ids) {
  const requestConfig = {
    // headers: authHeader()
  };
  console.log(ids);
  const promises = await ids.map((id) => {
    return axios.delete(`/api/weeklySchedules/${id}`, requestConfig);
  });
  return Promise.all(promises).then(handleResponse);
}

function handleResponse(response) {
  const data = response.data;
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
