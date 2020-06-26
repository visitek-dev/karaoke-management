import { roomConstants } from "../constants";
import { roomService } from "../api";
import { history } from "../store";

export const roomActions = {
  add,
  getAll,
  getAllNonPagination,
  getById,
  update,
  delete: _delete,
};

function getAll(url) {
  return async (dispatch) => {
    dispatch(request());

    await roomService.getAll(url).then(
      (rooms) => {
        dispatch(success(rooms));
      },
      (error) => {
        if (error.response && error.response.data) {
          let errorkey = Object.keys(error.response.data)[0];

          let errorValue = error.response.data[errorkey][0];

          dispatch(failure(errorkey.toUpperCase() + ": " + errorValue));
        } else {
          dispatch(failure(error.toString()));
        }
      }
    );
  };

  function request() {
    return { type: roomConstants.GETALL_REQUEST };
  }
  function success(rooms) {
    return { type: roomConstants.GETALL_SUCCESS, rooms };
  }
  function failure(error) {
    return { type: roomConstants.GETALL_FAILURE, error };
  }
}

function getAllNonPagination(url) {
  return async (dispatch) => {
    dispatch(request());
    await roomService.getAllNonPagination(url).then(
      (rooms) => dispatch(success(rooms)),
      (error) => {
        if (error.response && error.response.data) {
          let errorkey = Object.keys(error.response.data)[0];

          let errorValue = error.response.data[errorkey][0];

          dispatch(failure(errorkey.toUpperCase() + ": " + errorValue));
        } else {
          dispatch(failure(error.toString()));
        }
      }
    );
  };

  function request() {
    return { type: roomConstants.GETALL_REQUEST };
  }
  function success(rooms) {
    return { type: roomConstants.GETALL_SUCCESS, rooms };
  }
  function failure(error) {
    return { type: roomConstants.GETALL_FAILURE, error };
  }
}

function getById(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await roomService.getById(id).then(
      (rooms) => dispatch(success(rooms)),
      (error) => {
        if (error.response && error.response.data) {
          let errorkey = Object.keys(error.response.data)[0];

          let errorValue = error.response.data[errorkey][0];

          dispatch(failure(errorkey.toUpperCase() + ": " + errorValue));
        } else {
          dispatch(failure(error.toString()));
        }
      }
    );
  };

  function request(id) {
    return { type: roomConstants.GETBYID_REQUEST, id };
  }
  function success(rooms) {
    return { type: roomConstants.GETBYID_SUCCESS, rooms };
  }
  function failure(error) {
    return { type: roomConstants.GETBYID_FAILURE, error };
  }
}

function add(room) {
  return async (dispatch) => {
    dispatch(request(room));
    await roomService.add(room).then(
      async (room) => {
        dispatch(success(room));
        history.replace({ pathname: "/rooms", state: 201 });
        await dispatch(getAll());
      },
      (error) => {
        if (error.response && error.response.data) {
          let errorkey = Object.keys(error.response.data)[0];

          let errorValue = error.response.data[errorkey][0];

          dispatch(failure(errorkey.toUpperCase() + ": " + errorValue));
        } else {
          dispatch(failure(error.toString()));
        }
      }
    );
  };

  function request(room) {
    return { type: roomConstants.ADD_REQUEST, room };
  }
  function success(room) {
    return { type: roomConstants.ADD_SUCCESS, room };
  }
  function failure(error) {
    return { type: roomConstants.ADD_FAILURE, error };
  }
}

function update(id, room) {
  return async (dispatch) => {
    dispatch(request(id));
    await roomService.update(id, room).then(
      async (id) => {
        dispatch(success(id));
        history.replace({ pathname: "/rooms", state: 202 });
        await dispatch(getAll());
      },
      (error) => {
        if (error.response && error.response.data) {
          let errorkey = Object.keys(error.response.data)[0];

          let errorValue = error.response.data[errorkey][0];

          dispatch(failure(errorkey.toUpperCase() + ": " + errorValue));
        } else {
          dispatch(failure(error.toString()));
        }
      }
    );
  };

  function request(id) {
    return { type: roomConstants.UPDATE_REQUEST, id };
  }
  function success(id) {
    return { type: roomConstants.UPDATE_SUCCESS, id };
  }
  function failure(error) {
    return { type: roomConstants.UPDATE_FAILURE, id, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await roomService.delete(id).then(
      async (id) => {
        dispatch(success(id));
        history.replace({ pathname: "/rooms", state: 203 });
        await dispatch(getAll());
      },
      (error) => {
        if (error.response && error.response.data) {
          let errorkey = Object.keys(error.response.data)[0];

          let errorValue = error.response.data[errorkey][0];

          dispatch(failure(errorkey.toUpperCase() + ": " + errorValue));
        } else {
          dispatch(failure(error.toString()));
        }
      }
    );
  };

  function request(id) {
    return { type: roomConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: roomConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: roomConstants.DELETE_FAILURE, id, error };
  }
}
