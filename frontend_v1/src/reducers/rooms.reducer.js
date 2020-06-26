import { roomConstants } from "../constants";

const initialState = {
  loading: true,
  isAuthenticated: false,
  room: null,
  items: [],
  item: [],
  next: null,
  previous: null,
  maxPage: null,
  currentPage: null,
};

export function rooms(state = initialState, action) {
  switch (action.type) {
    case roomConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case roomConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.rooms.results,
        next: action.rooms.next,
        previous: action.rooms.previous,
        maxPage: action.rooms.maxPage,
        currentPage: action.rooms.currentPage,
      };
    case roomConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };

    case roomConstants.DELETE_REQUEST:
      // add 'deleting:true' property to room being deleted
      return {
        ...state,
        items: state.items.map((room) =>
          room.id === action.id ? { ...room, deleting: true } : room
        ),
      };
    case roomConstants.DELETE_SUCCESS:
      // remove deleted room from state
      return {
        items: state.items.filter((room) => room.id !== action.id),
      };
    case roomConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to room
      return {
        ...state,
        items: state.items.map((room) => {
          if (room.id === action.id) {
            // make copy of room without 'deleting:true' property
            const { deleting, ...roomCopy } = room;
            // return copy of room with 'deleteError:[error]' property
            return { ...roomCopy, deleteError: action.error };
          }

          return room;
        }),
      };

    case roomConstants.UPDATE_REQUEST:
      return {
        ...state,
        error: undefined,
      };
    case roomConstants.UPDATE_SUCCESS:
      return {
        ...state,
        error: null,
        item: [],
      };
    case roomConstants.UPDATE_FAILURE:
      return { ...state, error: action.error };

    case roomConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case roomConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        item: action.rooms,
      };
    case roomConstants.GETBYID_ERROR:
      return { error: action.error };

    case roomConstants.ADD_REQUEST:
      return {
        ...state,
        error: undefined,
      };
    case roomConstants.ADD_SUCCESS:
      return {
        ...state,
        item: [],
        error: null,
      };
    case roomConstants.ADD_FAILURE:
      return { ...state, error: action.error };

    default:
      return state;
  }
}
