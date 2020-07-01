import { scheduleConstants } from "../constants";

const initialState = {
  loading: true,
  isAuthenticated: false,
  items: [],
  salaries: [],
  item: [],
  maxPage: null,
  currentPage: null,
  deleteId: null,
};

export function schedules(state = initialState, action) {
  switch (action.type) {
    case scheduleConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case scheduleConstants.GETALL_SUCCESS:
      return {
        ...state,
        items: action.schedules.results,
        next: action.schedules.next,
        previous: action.schedules.previous,
        maxPage: action.schedules.maxPage,
        currentPage: action.schedules.currentPage,
      };
    case scheduleConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };
    case scheduleConstants.DELETE_REQUEST:
      // add 'deleting:true' property to schedule being deleted
      return {
        ...state,
        deleteId: action.id,
        items: state.items.map((schedule) =>
          schedule.id === action.id ? { ...schedule, deleting: true } : schedule
        ),
      };
    case scheduleConstants.DELETE_SUCCESS:
      // remove deleted schedule from state
      return {
        items: [
          ...state.items.filter(
            (schedule) => schedule.id !== state.deleteId[0]
          ),
        ],
        salaries: [...state.salaries].map((obj) =>
          obj.staff === action.data.staff ? action.data : obj
        ),
        deleteId: null,
      };
    case scheduleConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to schedule
      return {
        ...state,
        items: state.items.map((schedule) => {
          if (schedule.id === action.id) {
            // make copy of schedule without 'deleting:true' property
            const { deleting, ...scheduleCopy } = schedule;
            // return copy of schedule with 'deleteError:[error]' property
            return { ...scheduleCopy, deleteError: action.error };
          }

          return schedule;
        }),
      };

    case scheduleConstants.UPDATE_REQUEST:
      return {
        ...state,
      };
    case scheduleConstants.UPDATE_SUCCESS:
      return {
        ...state,
        item: [],
      };
    case scheduleConstants.UPDATE_FAILURE:
      return { error: action.error };

    case scheduleConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case scheduleConstants.GETBYID_SUCCESS:
      return {
        ...state,
        item: action.schedule,
      };
    case scheduleConstants.GETBYID_ERROR:
      return { error: action.error };

    case scheduleConstants.GETBY_WEEKLYSCHEDULE_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case scheduleConstants.GETBY_WEEKLYSCHEDULE_ID_SUCCESS:
      return {
        ...state,
        items: action.data.schedules,
        salaries: action.data.weekly_salaries,
      };
    case scheduleConstants.GETBY_WEEKLYSCHEDULE_ID_ERROR:
      return { error: action.error };

    case scheduleConstants.ADD_REQUEST:
      return {
        ...state,
      };
    case scheduleConstants.ADD_SUCCESS:
      return {
        ...state,
        item: [],
        items: [...state.items, action.data.schedule],

        salaries: [...state.salaries].map((obj) =>
          obj.staff === action.data.salary.staff ? action.data.salary : obj
        ),
      };
    case scheduleConstants.ADD_FAILURE:
      return { ...state, error: action.error };
    default:
      return state;
  }
}
