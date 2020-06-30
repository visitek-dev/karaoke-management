import { weeklyScheduleConstants } from "../constants";

const initialState = {
  loading: true,
  items: [],
  item: [],
};

export function weeklySchedules(state = initialState, action) {
  switch (action.type) {
    case weeklyScheduleConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case weeklyScheduleConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.weeklySchedules.results,
        next: action.weeklySchedules.next,
        previous: action.weeklySchedules.previous,
        maxPage: action.weeklySchedules.maxPage,
        currentPage: action.weeklySchedules.currentPage,
      };
    case weeklyScheduleConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };

    case weeklyScheduleConstants.DELETE_REQUEST:
      // add 'deleting:true' property to weeklySchedule being deleted
      return {
        ...state,
        items: state.items.map((weeklySchedule) =>
          weeklySchedule.id === action.id
            ? { ...weeklySchedule, deleting: true }
            : weeklySchedule
        ),
      };
    case weeklyScheduleConstants.DELETE_SUCCESS:
      // remove deleted weeklySchedule from state
      return {
        items: state.items.filter(
          (weeklySchedule) => weeklySchedule.id !== action.id
        ),
      };
    case weeklyScheduleConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to weeklySchedule
      return {
        ...state,
        items: state.items.map((weeklySchedule) => {
          if (weeklySchedule.id === action.id) {
            // make copy of weeklySchedule without 'deleting:true' property
            const { deleting, ...weeklyScheduleCopy } = weeklySchedule;
            // return copy of weeklySchedule with 'deleteError:[error]' property
            return { ...weeklyScheduleCopy, deleteError: action.error };
          }

          return weeklySchedule;
        }),
      };

    case weeklyScheduleConstants.ADD_SCHEDULE_REQUEST:
      return {
        ...state,
      };
    case weeklyScheduleConstants.ADD_SCHEDULE_SUCCESS:
      return {
        ...state,
        items: state.items.map((element) => {
          if (element.id === action.schedule.weeklySchedule) {
            element.schedules.push(action.schedule);
          }
          return element;
        }),
      };

    case weeklyScheduleConstants.DELETE_SCHEDULE_REQUEST:
      return {
        ...state,
      };
    case weeklyScheduleConstants.DELETE_SCHEDULE_SUCCESS:
      console.log(action);
      return {
        ...state,
        items: state.items.map((element) => {
          if (element.id === action.weeklySchedule) {
            console.log("aaaaaaaaaaaaaaaaaaaaa", action.id[0]);
            element.schedules.filter(
              (schedule) => schedule.id !== action.id[0]
            );
          }
          return element;
        }),
      };

    case weeklyScheduleConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case weeklyScheduleConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        item: action.weeklySchedules,
      };
    case weeklyScheduleConstants.GETBYID_ERROR:
      return { error: action.error };

    case weeklyScheduleConstants.ADD_REQUEST:
      return {
        ...state,
        error: undefined,
      };
    case weeklyScheduleConstants.ADD_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.weeklySchedule],
        item: [],
        error: null,
      };
    case weeklyScheduleConstants.ADD_FAILURE:
      return { ...state, error: action.error };

    default:
      return state;
  }
}
