
import AxiosInstance from '../AxiosInstance/AxiosInstance'
const UpdateUser = (context) => {
    const contextVal = context
    const url = 'user/'

    if(contextVal.isLoggedIn && contextVal.token){
        AxiosInstance.get(url,{headers:{'Authorization': 'Bearer '+ contextVal.token}})
            .then(res=>{
                const data = res.data.user
                contextVal.setUser(data)
                localStorage.setItem('user',JSON.stringify(data))
            })
            .catch(err => {
                console.log(err)
            })
    }

}

export default UpdateUser
