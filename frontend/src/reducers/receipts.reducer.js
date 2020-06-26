import { receiptConstants } from "../constants";

const initialState = {
  loading: true,
  isAuthenticated: false,
  receipt: null,
  items: [],
  item: null,
  next: null,
  previous: null,
  maxPage: null,
  currentPage: null,
};

export function receipts(state = initialState, action) {
  switch (action.type) {
    case receiptConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case receiptConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        next: action.receipts.next,
        previous: action.receipts.previous,
        items: action.receipts.results,
        maxPage: action.receipts.maxPage,
        currentPage: action.receipts.currentPage,
      };
    case receiptConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case receiptConstants.DELETE_REQUEST:
      // add 'deleting:true' property to receipt being deleted
      return {
        ...state,
        items: state.items.map((receipt) =>
          receipt.id === action.id ? { ...receipt, deleting: true } : receipt
        ),
      };
    case receiptConstants.DELETE_SUCCESS:
      // remove deleted receipt from state
      return {
        ...state,
        items: state.items.filter((receipt) => receipt.id !== action.id),
      };
    case receiptConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to receipt
      return {
        ...state,
        items: state.items.map((receipt) => {
          if (receipt.id === action.id) {
            // make copy of receipt without 'deleting:true' property
            const { deleting, ...receiptCopy } = receipt;
            // return copy of receipt with 'deleteError:[error]' property
            return { ...receiptCopy, deleteError: action.error };
          }

          return receipt;
        }),
      };

    case receiptConstants.UPDATE_REQUEST:
      return {
        ...state,
      };
    case receiptConstants.UPDATE_SUCCESS:
      return { ...state };
    case receiptConstants.UPDATE_FAILURE:
      return { ...state, error: action.error };

    case receiptConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case receiptConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        item: action.receipts,
      };
    case receiptConstants.GETBYID_ERROR:
      return { ...state, error: action.error };

    case receiptConstants.ADD_REQUEST:
      return {
        ...state,
      };
    case receiptConstants.ADD_SUCCESS:
      return { ...state };
    case receiptConstants.ADD_FAILURE:
      return { ...state, error: action.error };

    default:
      return state;
  }
}
