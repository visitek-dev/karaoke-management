import { scheduleConstants } from "../constants";
import { scheduleService } from "../api";
import { history } from "../store";

export const scheduleActions = {
  add,
  getAll,
  getAllNonPagination,
  getByWeeklyScheduleId,
  getById,
  update,
  delete: _delete,
};

function getAll(url) {
  return async (dispatch) => {
    dispatch(request());

    await scheduleService.getAll(url).then(
      (schedules) => {
        dispatch(success(schedules));
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
    return { type: scheduleConstants.GETALL_REQUEST };
  }
  function success(schedules) {
    return { type: scheduleConstants.GETALL_SUCCESS, schedules };
  }
  function failure(error) {
    return { type: scheduleConstants.GETALL_FAILURE, error };
  }
}

function getAllNonPagination() {
  return async (dispatch) => {
    dispatch(request());
    await scheduleService.getAllNonPagination().then(
      (schedules) => dispatch(success(schedules)),
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
    return { type: scheduleConstants.GETALL_REQUEST };
  }
  function success(schedules) {
    return { type: scheduleConstants.GETALL_SUCCESS, schedules };
  }
  function failure(error) {
    return { type: scheduleConstants.GETALL_FAILURE, error };
  }
}

function getById(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await scheduleService.getById(id).then(
      (schedules) => dispatch(success(schedules)),
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
    return { type: scheduleConstants.GETBYID_REQUEST, id };
  }
  function success(schedules) {
    return { type: scheduleConstants.GETBYID_SUCCESS, schedules };
  }
  function failure(error) {
    return { type: scheduleConstants.GETBYID_FAILURE, error };
  }
}

function getByWeeklyScheduleId(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await scheduleService.getByWeeklyScheduleId(id).then(
      (data) => dispatch(success(data)),
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
    return { type: scheduleConstants.GETBY_WEEKLYSCHEDULE_ID_REQUEST, id };
  }
  function success(data) {
    return {
      type: scheduleConstants.GETBY_WEEKLYSCHEDULE_ID_SUCCESS,
      data,
    };
  }
  function failure(error) {
    return { type: scheduleConstants.GETBY_WEEKLYSCHEDULE_ID_FAILURE, error };
  }
}

function add(schedule) {
  return async (dispatch) => {
    dispatch(request(schedule));
    await scheduleService.add(schedule).then(
      (schedule) => {
        dispatch(success(schedule));
        history.push({ pathname: "/schedules", state: 201 });
      },
      (error) => {
        if (error.response && error.response.data) {
          let errorkey = Object.keys(error.response.data)[0];

          let errorValue = error.response.data[errorkey][0];

          console.log(error.response.data[errorkey][0]);

          dispatch(failure(errorkey.toUpperCase() + ": " + errorValue));
        } else {
          dispatch(failure(error.toString()));
        }
      }
    );
  };

  function request(schedule) {
    return { type: scheduleConstants.ADD_REQUEST, schedule };
  }
  function success(schedule) {
    return { type: scheduleConstants.ADD_SUCCESS, schedule };
  }
  function failure(error) {
    return { type: scheduleConstants.ADD_FAILURE, error };
  }
}

function update(id, schedule) {
  return async (dispatch) => {
    dispatch(request(id));
    await scheduleService.update(id, schedule).then(
      (id) => {
        dispatch(success(id));

        //dispatch(alertActions.success("Add new post successful"));
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
    return { type: scheduleConstants.UPDATE_REQUEST, id };
  }
  function success(id) {
    return { type: scheduleConstants.UPDATE_SUCCESS, id };
  }
  function failure(error) {
    return { type: scheduleConstants.UPDATE_FAILURE, id, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id, weeklyschedule) {
  return async (dispatch) => {
    dispatch(request(id));
    await scheduleService.delete(id).then(
      (data) => {
        dispatch(success(data));
        history.replace({ pathname: "/schedules", state: 203 });
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
    return { type: scheduleConstants.DELETE_REQUEST, id };
  }
  function success(data) {
    return { type: scheduleConstants.DELETE_SUCCESS, data };
  }
  function failure(id, error) {
    return { type: scheduleConstants.DELETE_FAILURE, id, error };
  }
}
