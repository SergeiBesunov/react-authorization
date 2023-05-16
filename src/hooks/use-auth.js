import { useSelector } from 'react-redux'

// Достаем данные об авторизации из redux
function useAuth(){
const {email, token, id, photoUrl, isAnonymous, initStatus} = useSelector((state)=>state.authUser)

return{
    isAuth: !!id,
    email: email,
    token: token,
    id: id,
    photoUrl: photoUrl,
    isAnonymous: isAnonymous,
    initStatus: initStatus
}
}

export { useAuth }