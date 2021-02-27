interface IInitialState {

}

const initialState: IInitialState = {}

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default mainReducer;