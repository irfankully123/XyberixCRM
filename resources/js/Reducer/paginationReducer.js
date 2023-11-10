function paginationReducer(state, action) {
    switch (action.type) {
        case 'NextPage':
            return { ...state, activePage: state.activePage + 1 };
        case 'PrevPage':
            return { ...state, activePage: state.activePage - 1 };
        case 'SetPage':
            return { ...state, activePage: action.page };
        default:
            return state;
    }
}

export default paginationReducer;
