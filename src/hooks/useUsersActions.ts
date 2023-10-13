import { UserId, deleteUserById, addNewUser, User } from "../store/users/slice";
import { useAppDispatch } from "./typeReduxHook"






export const useUsersActions = () => {

    const dispatch = useAppDispatch();

    //Agregar Usuarios
    const addUser = ({ name, email, github, }: User) => {
        dispatch(addNewUser({ name, email, github, }));
    };


    //Boorar Usuario
    const removeUser = (id: UserId) => {
        dispatch(deleteUserById(id))
    };





    return { removeUser, addUser }
}
