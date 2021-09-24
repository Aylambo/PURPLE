const initialState = {
    err : null,
    isLoading: false,
    convos: [],
    filterBy: { searchTxt: '', type: 'all',sortBy: 'all' },
    selectedconvo: null,
    shoppingCart: []
}

export function convoReducer(state = initialState, action={}) {
    switch (action.type) {
        case 'SET_CONVOS':
            return { ...state, convos: action.convos, isLoading: false }
        case 'SET_FILTER':
            return { ...state, filterBy: action.filterBy, isLoading: false }
        case 'CONVO_ERR':
            return { ...state, err: action.err, isLoading: false }
        case 'ADD_CONVO':
            return { ...state, convos: [...state.convos, action.convo] }
        case 'UPDATE_CONVO':
            const idx = state.convos.findIndex(convo => convo._id === action.convo._id)
            state.convos.splice(idx, 1, action.convo)
            return { ...state, convos: [...state.convos] }
        case 'REMOVE_CONVO':
            return { ...state, convos: state.convos.filter(convo => convo._id !== action.convoId) }
        case 'LOADING_CONVOS':
            return { ...state, isLoading: action.isLoading, err:null }
        case 'SELECT_CONVO': 
            return { ...state, selectedconvo: action.convo}
        case 'ADD_TO_CART':
            return { ...state, shoppingCart: [...state.shoppingCart, action.item] }
        default:
            return state
    }
}
