let data = localStorage.getItem('data')
let jsonData = JSON.parse(data)
let btnSigin = document.querySelector('.button-signin')
let btnSignon = document.querySelector('.button-signon')
let prfName = document.querySelector('.profile_name')
let wrapperCourse = document.querySelectorAll('.card-wrapper')


const getDataCourses = async () => {
  let res = await fetch('/user/courses')
  let resJson = await res.json()
  let html = ''
  for(item of resJson.data) {
    html += `<div class="card">
                <h3>${item.NOMBRE_CURSO.trim()}</h3>
                <p>Cursos dispoibles</p>
              </div>`
  }
  console.log(html)
  wrapperCourse[1].innerHTML = html
}

if(jsonData.status === true){

  let courses = getDataCourses()
  console.log('he', courses)

  btnSigin.setAttribute('style', 'display: none')
  btnSignon.setAttribute('style', 'display:none')
  prfName.textContent = jsonData.data[0].NOMBRE +  ' ' + jsonData.data[0].APELLIDOS
  swal(`${jsonData.data[0].NOMBRE}`, 'Welcome to school enjoy your classes', 'success')
}