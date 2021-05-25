export const login = ({email,password})=>async dispatch=>{
    fetch('/signIn',{
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
  .then(function(response){ return response.json(); })
  .then(function(data) {
      const items = data;
      console.log(items)
        dispatch({
            type: "LoginSuccess",
            payload: items
        })
  })
}