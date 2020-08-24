let data = localStorage.getItem('data')
let jsonData = JSON.parse(data)
let btnSigin = document.querySelector('.button-signin')
let btnSignon = document.querySelector('.button-signon')
let prfName = document.querySelector('.profile_name')


console.log(jsonData)
if(jsonData.status === true){
  btnSigin.setAttribute('style', 'display: none')
  btnSignon.setAttribute('style', 'display:none')
  prfName.textContent = jsonData.data[0].NOMBRE +  ' ' + jsonData.data[0].APELLIDOS
  swal(`${jsonData.data[0].NOMBRE}`, 'Welcome to school enjoy your classes', 'success')
}