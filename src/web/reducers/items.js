
const initialForm = () => {
  return {
    isValid: false,
    item: {
      name: ''
    }
  }
}

const initialState = {
  items: [],
  form: initialForm()
}

const validateForm = (item) => {
  return {
    isValid: !!item.name,
    item
  }
}

export default function items(state = initialState, action) {
  switch (action.type) {
    case 'LOAD_ITEMS':
      return Object.assign({}, state, { items: action.items })
    case 'UPDATE_FORM':
      return Object.assign({}, state, { form: validateForm(action.item) })
    case 'CREATED_ITEM':
      return Object.assign({}, state, { form: initialForm() })
    // case 'UPDATED_ITEM':
    //   return Object.assign({}, state)
    case 'FOCUS_ITEM':
      return Object.assign({}, state, { updateForm: validateForm(action.item) })
    default:
      return state
  }
}
