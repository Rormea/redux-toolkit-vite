import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'



const DEFAULT_STATE = [
    {
        id: "87725ffb-0f93-4bbb-a2d5-bd4c03bef52",
        name: "Rony Renzo",
        email: "doe@example.com",
        github: "rormea",
    },
    {
        id: "87725ffb-0f93-4bad-a2d5-bd4c03bef52",
        name: "Lena Whitehouse",
        email: "whitehouse@example.com",
        github: "SantiRosso",
    },
    {
        id: "87725ffb-0f93-4bbb-a2d5-bd6q03bef52",
        name: "Phil Less",
        email: "Less@example.com",
        github: "JonathanG0m3z",
    },
    {
        id: "87725ffb-0f93-4bbb-a2d5-bd4c03bee35",
        name: "John Camper",
        email: "Camper@example.com",
        github: "synkronus-engineering",
    },
    {
        id: "87725ffb-0f93-4bbb-a2d5-bd4c03bex99",
        name: "Max Balmoore",
        email: "Balmoore@example.com",
        github: "Zetah07",
    },
]

export type UserId = string

export interface User {
    name: string;
    email: string;
    github: string;
}

export interface UserWithId extends User {
    id: UserId;
}

const initialState: UserWithId[] = (() => {

    const persistedState = localStorage.getItem("__redux__state__")
    return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE

})();

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

        deleteUserById: (state, action: PayloadAction<UserId>) => {
            const id = action.payload
            return state.filter((user) => user.id !== id)
        },

        addNewUser: (state, action: PayloadAction<User>) => {
            const id = crypto.randomUUID()
            return [...state, { id, ...action.payload }]
        },

        rollbackUser: (state, action: PayloadAction<UserWithId>) => {
            const isUserReadyDefined = state.some((user) => user.id === action.payload.id)
            if (!isUserReadyDefined) {
                return [...state, action.payload]
            }
        },
    },


})

export default usersSlice.reducer

// Action creators are generated for each case reducer function
export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions

