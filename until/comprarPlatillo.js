const url = 'http://192.168.1.32:4000/platillos'
const envio=async(x,y,a,s)=>{
    const data = JSON.stringify({
      platillo: x,
      precio: y,
      comprador: a,
      correo: s
    })
    try{
      const response = await fetch(url,{
        method: 'POST',
        body: data,
        headers:{
          'Content-type': 'application/json'
        }
      })
      if (response.ok){
        console.log('respuesta favorable')
      }
    }catch(error){
      console.log(error)
    }
  }

export default envio;