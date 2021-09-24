import {
  convoService
} from '../../services/convoService.js'

export function loadConvos(filterBy) { // Action Creator
  return async dispatch => {
    try {
      const convos = await convoService.query(filterBy)
      dispatch({
        type: 'SET_CONVOS',
        convos
      })
    } catch (err) {
      console.log('ConvosActions: err in loadConvos', err)
      dispatch({
        type: 'CONVO_ERR',
        err
      })
    }
  }
}

export function setFilter(filterBy) {
  return (dispatch) => dispatch({
    type: 'SET_FILTER',
    filterBy
  })
}


// export function setFilter(filterBy) {
//   return (dispatch) => dispatch(_setFilter(filterBy))
// }

// const _setFilter = (filterBy) => ({ type: 'SET_FILTER', filterBy });

export function saveConvo(convo) { // Action Creator
  console.log('actions convo:', convo);
  return async dispatch => {
    try {
      const savedConvo = await convoService.save(convo)
      const action = {
        type: 'ADD_CONVO',
        convo: savedConvo
      }
      dispatch(action)
    } catch (err) {
      console.log('ConvosActions: err in loadConvos', err)
    }

  }
}

export function setSelectedConvo(convoId) { // Action Creator
  return dispatch => {
    return convoService.getById(convoId)
      .then((convo) => {
        if (!convo) convo = null
        const action = {
          type: 'SELECT_CONVO',
          convo,
        }
        dispatch(action)
      })
  }
}

export function removeConvo(convoId) { // Action Creator
  return async dispatch => {
    try {
      await convoService.remove(convoId)
      dispatch({
        type: 'REMOVE_CONVO',
        convoId
      })
    } catch (err) {
      console.log('ConvosActions: err in removeConvos', err)
      dispatch({
        type: 'CONVO_ERR',
        err
      })
    }
  }
}

export function addConvo(convo) {
  return async dispatch => {
    try {
      const addedConvo = await convoService.add(convo)
      dispatch({
        type: 'ADD_CONVO',
        convo: addedConvo
      })

    } catch (err) {
      console.log('ConvoActions: err in addConvo', err)
    }
  }
}

export function updateConvo(convo) {
  return async dispatch => {
    try {
      const updatedConvo = await convoService.update(convo)
      dispatch({
        type: 'UPDATE_CONVO',
        convo: updatedConvo
      })

    } catch (err) {
      console.log('ConvoActions: err in updateConvo', err)
    }
  }
}