import { productConstants } from "../constants";
import { productService } from "../api";
import { history } from "../store";

export const productActions = {
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
    await productService.getAll(url).then(
      (products) => dispatch(success(products)),
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
    return { type: productConstants.GETALL_REQUEST };
  }
  function success(products) {
    return { type: productConstants.GETALL_SUCCESS, products };
  }
  function failure(error) {
    return { type: productConstants.GETALL_FAILURE, error };
  }
}

function getAllNonPagination() {
  return async (dispatch) => {
    dispatch(request());
    await productService.getAllNonPagination().then(
      (products) => dispatch(success(products)),
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
    return { type: productConstants.GETALL_REQUEST };
  }
  function success(products) {
    return { type: productConstants.GETALL_SUCCESS, products };
  }
  function failure(error) {
    return { type: productConstants.GETALL_FAILURE, error };
  }
}

function getById(id) {
  return (dispatch) => {
    dispatch(request(id));
    productService.getById(id).then(
      (products) => {
        dispatch(success(products));
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(id) {
    return { type: productConstants.GETBYID_REQUEST, id };
  }
  function success(products) {
    return { type: productConstants.GETBYID_SUCCESS, products };
  }
  function failure(error) {
    return { type: productConstants.GETBYID_FAILURE, error };
  }
}

function add(product, image) {
  return async (dispatch) => {
    dispatch(request(product));
    await productService.add(product, image).then(
      (product) => {
        dispatch(success(product));
        history.push({ pathname: "/products", state: 201 });
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

  function request(product) {
    return { type: productConstants.ADD_REQUEST, product };
  }
  function success(product) {
    return { type: productConstants.ADD_SUCCESS, product };
  }
  function failure(error) {
    return { type: productConstants.ADD_FAILURE, error };
  }
}

function update(id, product, image, delImageId) {
  return async (dispatch) => {
    dispatch(request(id));
    await productService.update(id, product, image, delImageId).then(
      (product) => {
        dispatch(success(id));
        history.push({ pathname: "/products", state: 202 });
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
    return { type: productConstants.UPDATE_REQUEST, id };
  }
  function success(id) {
    return { type: productConstants.UPDATE_SUCCESS, id };
  }
  function failure(error) {
    return { type: productConstants.UPDATE_FAILURE, id, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await productService.delete(id).then(
      async (id) => {
        dispatch(success(id));
        history.replace({ pathname: "/products", state: 203 });
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
    return { type: productConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: productConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: productConstants.DELETE_FAILURE, id, error };
  }
}
