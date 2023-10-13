import { configureStore, type Middleware } from '@reduxjs/toolkit'
import usersReducer from './users/slice'
// import { rollbackUser } from './users/slice'
// import { toast } from 'sonner'


//Middleware para persistr el esatdo en el LocalStorage
const persistentStorageMiddleware: Middleware = (store) => (next) => (action) => {
    // console.log(store.getState())
    // console.log(action)
    // trabjar antes de que se ejecute la action en este caso borrar
    next(action);
    // console.log(store.getState())
    // Podemos hacer cosas depues que paso la acción tambien 
    // localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
    localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
};


//Middleware de ejemplo para  usar una elinacion OPTIMISTA es decir lo elimna en la UI en la vista mientras va haciando el trabajo por dentro
// pero si no lo logra elinar por algun motivo hace un rollback al estado anterior - es una alternativa a usar THUNK

// const syncWithDatabase: Middleware = store => next => action => {
//     const { type, payload } = action

//     // console.log({ type, payload })
//     // console.log(store.getState())
//     const previousState = store.getState()
//     // lo que esta antes de next action es fase 1
//     next(action);

//     if (type === "users/deleteUserById") {

//         const userIdToRemove = payload

//         const userToRemove = previousState.users.find((user: { id: any; }) => user.id === userIdToRemove)

//         fetch(`https://jsonplaceholder.typicode.com/users/${payload}`,
//             { method: "DELETE" })
//             .then(res => {
//                 if (res.ok) toast.success(`Usuario ${payload} eliminado correctamente`)

//                 throw new Error('Error al eliminar el usuario')
//             })
//             .catch(error => {
//                 toast.error(`Error al eliminar el usuario: ${userIdToRemove}`);
//                 if (userToRemove) store.dispatch(rollbackUser(userToRemove))
//                 console.log(error)
//             })
//     }

//     console.log(store.getState())
// }



export const store = configureStore({
    reducer: {
        users: usersReducer,
    },

    middleware: [persistentStorageMiddleware /*,syncWithDatabase*/]
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch