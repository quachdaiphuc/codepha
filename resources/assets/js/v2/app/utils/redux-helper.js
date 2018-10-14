export function createAction(actionType, actionPayload) {
    return {
        type: actionType,
        payload: actionPayload
    }
}
