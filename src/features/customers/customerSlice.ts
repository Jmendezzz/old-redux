const initialStateCustomer = {
    name: '',
    nationalId: '',
    createdAt: ''
}

export default function customerReducer(state=initialStateCustomer, action:any) {
    switch(action.type) {
        case 'customer/create':
            return {
                ...state,
                ...action.payload
            }
        case 'customer/updateName':
            return {
                ...state,
                name: action.payload
            }
        default:
            return state
    }

}
// Action creators for customer store.
export function createCustomer(name:string, nationalId:string) {
    return {
        type: 'customer/create',
        payload: {name, nationalId, createdAt: new Date().toISOString()}
    }
}

export function updateCustomerName(name:string) {
    return {
        type: 'customer/updateName',
        payload: name
    }
}