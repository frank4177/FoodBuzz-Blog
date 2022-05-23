export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginFailure = () => ({
  type: "LOGIN_FAILURE",
});

// export const AddProductStart = (userCredentials)=>({
//     type: "ADD_PRODUCT_START"
// })

// export const AddProductSuccess = (user) => ({
//     type: "ADD_PRODUCT_SUCCESS",
//     payload: user,
// })

// export const AddProductFailure = () => ({
//     type: "ADD_PRODUCT_FAILURE"
// })

export const Logout = () => ({
  type: "LOGOUT",
});

// export const addProduct = (id) => async (post, dispatch) => {
//     dispatch({type: ADD_PRODUCT_START});
//     try{
//        const res = await axios.post(`/https://foodbuzz.herokuapp.com/api/posts/`, post);
//         dispatch({type: ADD_PRODUCT_SUCCESS})
//     }catch(err){
//         dispatch({type: ADD_PRODUCT_FAILURE})
//     }
// ;}
