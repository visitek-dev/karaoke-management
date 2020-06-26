import { weeklyScheduleConstants } from "../constants";
import { weeklyScheduleService } from "../api";
import { history } from "../store";

export const weeklyScheduleActions = {
  add,
  getAll,
  getAllNonPagination,
  getById,
  addSchedule,
  deleteSchedule,
  delete: _delete,
};

function getAll(url) {
  return async (dispatch) => {
    dispatch(request());

    await weeklyScheduleService.getAll(url).then(
      (weeklySchedules) => {
        dispatch(success(weeklySchedules));
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
    return { type: weeklyScheduleConstants.GETALL_REQUEST };
  }
  function success(weeklySchedules) {
    return { type: weeklyScheduleConstants.GETALL_SUCCESS, weeklySchedules };
  }
  function failure(error) {
    return { type: weeklyScheduleConstants.GETALL_FAILURE, error };
  }
}

function getAllNonPagination() {
  return async (dispatch) => {
    dispatch(request());
    await weeklyScheduleService.getAllNonPagination().then(
      (weeklySchedules) => dispatch(success(weeklySchedules)),
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
    return { type: weeklyScheduleConstants.GETALL_REQUEST };
  }
  function success(weeklySchedules) {
    return { type: weeklyScheduleConstants.GETALL_SUCCESS, weeklySchedules };
  }
  function failure(error) {
    return { type: weeklyScheduleConstants.GETALL_FAILURE, error };
  }
}

function getById(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await weeklyScheduleService.getById(id).then(
      (weeklySchedules) => dispatch(success(weeklySchedules)),
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
    return { type: weeklyScheduleConstants.GETBYID_REQUEST, id };
  }
  function success(weeklySchedules) {
    return { type: weeklyScheduleConstants.GETBYID_SUCCESS, weeklySchedules };
  }
  function failure(error) {
    return { type: weeklyScheduleConstants.GETBYID_FAILURE, error };
  }
}

function add(weeklySchedule) {
  return async (dispatch) => {
    dispatch(request(weeklySchedule));
    await weeklyScheduleService.add(weeklySchedule).then(
      (weeklySchedule) => {
        dispatch(success(weeklySchedule));
        history.replace({ pathname: "/weeklySchedules", state: 201 });
      },
      (error) => {
        if (error.response && error.response.data) {
          let errorkey = Object.keys(error.response.data)[0];

          let errorValue = error.response.data[errorkey][0];

          console.log(error.response.data[errorkey][0]);
          console.log(errorValue.toString());

          dispatch(
            failure(errorkey.toUpperCase() + ": " + errorValue.toString())
          );
        } else {
          dispatch(failure(error.toString()));
        }
      }
    );
  };

  function request(weeklySchedule) {
    return { type: weeklyScheduleConstants.ADD_REQUEST, weeklySchedule };
  }
  function success(weeklySchedule) {
    return { type: weeklyScheduleConstants.ADD_SUCCESS, weeklySchedule };
  }
  function failure(error) {
    return { type: weeklyScheduleConstants.ADD_FAILURE, error };
  }
}

function addSchedule(schedule) {
  return async (dispatch) => {
    dispatch(request(schedule));
    dispatch(success(schedule));
  };

  function request(schedule) {
    return { type: weeklyScheduleConstants.ADD_SCHEDULE_REQUEST, schedule };
  }
  function success(schedule) {
    return { type: weeklyScheduleConstants.ADD_SCHEDULE_SUCCESS, schedule };
  }
}

function deleteSchedule(id, weeklySchedule) {
  return (dispatch) => {
    dispatch(success(id, weeklySchedule));
  };

  function success(id, weeklySchedule) {
    return {
      type: weeklyScheduleConstants.DELETE_SCHEDULE_SUCCESS,
      id,
      weeklySchedule,
    };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await weeklyScheduleService.delete(id).then(
      (id) => {
        dispatch(success(id));
        history.replace({ pathname: "/weeklySchedules", state: 203 });
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
    return { type: weeklyScheduleConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: weeklyScheduleConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: weeklyScheduleConstants.DELETE_FAILURE, id, error };
  }
}
