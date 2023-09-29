import { state } from "../store/time";

export default {
    computed: {
        currentTime() {
            return state.time;
        },
    }
}