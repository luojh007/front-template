
const initState = {
  name: 'ljh',
  userId: 111,
}

export const login = ( state = initState, action)=>{
  if ( action.type == 'loginSuccess'){
    return state;
  }
}