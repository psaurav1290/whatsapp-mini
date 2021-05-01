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
    if (numberE.value == '' || numberE.value.length < 10) {
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

  init_validation = () => {
    document.querySelectorAll('.numeric-input').forEach(element => element.onkeydown = keyDownFilter)
    document.getElementById('send').onclick = validateAndRedirct

    codeE = document.getElementById('code')
    numberE = document.getElementById('number')
    messageE = document.getElementById('message')
    numberValidate = document.getElementById('number-validate')
    messageValidate = document.getElementById('message-validate')
  }

  init_browser_detection = () => {
    var user = detect.parse(navigator.userAgent)
    if (!user.browser.family.match(/chrome/i) || !user.os.name.match(/(android|ios)/i))
      messageValidate.innerHTML = `You are using ${user.browser.family} ${user.browser.version} on ${user.os.name}. Please switch to Chrome on Android/iOS if you dont get redirected to WhatsApp.`
  }

  window.addEventListener('load', () => {
    init_validation()
    init_browser_detection()
  })
})()