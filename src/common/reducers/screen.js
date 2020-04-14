import utils from 'common/utils';
import {SET_SCREEN_SIZE} from 'common/actions/screen';

const initialState = {
    size: utils.getScreenSize()
};

export default function screen(state = initialState, action) {
    switch (action.type) {
        case SET_SCREEN_SIZE:
            return {
                ...state,
                size: action.size
            };

        default:
            return state;
    }
}
