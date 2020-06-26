import { receiptConstants } from "../constants";
import { receiptService } from "../api";
import { history } from "../store";

export const receiptActions = {
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
    await receiptService.getAll(url).then(
      (receipts) => dispatch(success(receipts)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: receiptConstants.GETALL_REQUEST };
  }
  function success(receipts) {
    return { type: receiptConstants.GETALL_SUCCESS, receipts };
  }
  function failure(error) {
    return { type: receiptConstants.GETALL_FAILURE, error };
  }
}

function getAllNonPagination() {
  return async (dispatch) => {
    dispatch(request());
    await receiptService.getAllNonPagination().then(
      (rooms) => dispatch(success(rooms)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: receiptConstants.GETALL_REQUEST };
  }
  function success(receipts) {
    return { type: receiptConstants.GETALL_SUCCESS, receipts };
  }
  function failure(error) {
    return { type: receiptConstants.GETALL_FAILURE, error };
  }
}

function getById(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await receiptService.getById(id).then(
      (receipts) => dispatch(success(receipts)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(id) {
    return { type: receiptConstants.GETBYID_REQUEST, id };
  }
  function success(receipts) {
    return { type: receiptConstants.GETBYID_SUCCESS, receipts };
  }
  function failure(error) {
    return { type: receiptConstants.GETBYID_FAILURE, error };
  }
}

function add(receipt) {
  console.log(receipt);
  return async (dispatch) => {
    dispatch(request(receipt));
    await receiptService.add(receipt).then(
      (receipt) => {
        dispatch(success(receipt));
        history.push({ pathname: "/receipts", state: 201 });
      },
      (error) => {
        if (error.response && error.response.data) {
          let errorkey = Object.keys(error.response.data)[0];

          let errorValue = error.response.data[errorkey][0];
          console.log(errorValue);
          dispatch(
            failure(
              errorkey.toUpperCase() +
                ": " +
                errorValue[Object.getOwnPropertyNames(errorValue)]
            )
          );
        } else {
          dispatch(failure(error.toString()));
        }
      }
    );
  };

  function request(receipt) {
    return { type: receiptConstants.ADD_REQUEST, receipt };
  }
  function success(receipt) {
    return { type: receiptConstants.ADD_SUCCESS, receipt };
  }
  function failure(error) {
    return { type: receiptConstants.ADD_FAILURE, error };
  }
}

function update(id, receipt) {
  console.log(receipt);
  return async (dispatch) => {
    dispatch(request(id));
    await receiptService.update(id, receipt).then(
      (id) => {
        dispatch(success(id));
        history.push({ pathname: "/receipts", state: 202 });
        //dispatch(alertActions.success("Add new post successful"));
      },
      (error) => {
        if (error.response && error.response.data) {
          let errorkey = Object.keys(error.response.data)[0];

          let errorValue = error.response.data[errorkey][0];
          console.log(errorValue);
          dispatch(
            failure(
              errorkey.toUpperCase() +
                ": " +
                errorValue[Object.getOwnPropertyNames(errorValue)]
            )
          );
        } else {
          dispatch(failure(error.toString()));
        }
      }
    );
  };

  function request(id) {
    return { type: receiptConstants.UPDATE_REQUEST, id };
  }
  function success(id) {
    return { type: receiptConstants.UPDATE_SUCCESS, id };
  }
  function failure(error) {
    return { type: receiptConstants.UPDATE_FAILURE, id, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await receiptService.delete(id).then(
      async (id) => {
        dispatch(success(id));
        history.replace({ pathname: "/receipts", state: 203 });
        dispatch(requestGetAll());
        await receiptService.getAll(`api/payments?ordering=-created_at`).then(
          (receipts) => dispatch(successGetAll(receipts)),
          (error) => dispatch(failureGetAll(error.toString()))
        );
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
    return { type: receiptConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: receiptConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: receiptConstants.DELETE_FAILURE, id, error };
  }
  function requestGetAll() {
    return { type: receiptConstants.GETALL_REQUEST };
  }
  function successGetAll(receipts) {
    return { type: receiptConstants.GETALL_SUCCESS, receipts };
  }
  function failureGetAll(error) {
    return { type: receiptConstants.GETALL_FAILURE, error };
  }
}
