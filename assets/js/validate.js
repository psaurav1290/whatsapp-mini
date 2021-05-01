(() => {

  let keyDownFilter = (event) => {
    if (event.target.value.length < event.target.dataset.maxLength || event.target.selectionStart != event.target.selectionEnd)
      return (event.ctrlKey || event.altKey || (47 < event.keyCode && event.keyCode < 58 && event.shiftKey == false) || (95 < event.keyCode && event.keyCode < 106) || (event.keyCode == 8) || (event.keyCode == 9) || (event.keyCode > 34 && event.keyCode < 40) || (event.keyCode == 46))
    else
      return (event.ctrlKey || event.altKey || (95 < event.keyCode && event.keyCode < 106) || (event.keyCode == 8) || (event.keyCode == 9) || (event.keyCode > 34 && event.keyCode < 40) || (event.keyCode == 46))
  }

  let validData = () => {
    if (codeE.value == '') {
      codeE.value = '91'
    }
    if (numberE.value == '' || numberE.value.length<10) {
      console.log(numberE.dataset.msg, numberValidate)
      numberValidate.innerHTML = numberE.dataset.msg
      return false
    }
    else {
      return true
    }
  }

  let validateAndRedirct = (event) => {
    event.preventDefault()
    numberValidate.innerHTML = ''
    if (validData()) {
      let url = `https://api.whatsapp.com/send/?phone=${codeE.value}${numberE.value}&text=${encodeURIComponent(messageE.value)}&app_absent=0`
      console.log(url)
      window.open(url, "_blank");
    }
  }

  window.addEventListener('load', () => {
    let fields = document.querySelectorAll('.numeric-input')
    fields.forEach(element => element.onkeydown = keyDownFilter)

    let sendBtn = document.getElementById('send')
    sendBtn.onclick = validateAndRedirct

    codeE = document.getElementById('code')
    numberE = document.getElementById('number')
    messageE = document.getElementById('message')
    numberValidate = document.getElementById('number-validate')
  })
})()