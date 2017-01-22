
$(document).ready(function(){

  let guessChar = ''
  let p1Word = ''
  let errorCount = 0
  let successCount = 0

  $('#p1Word').focus()

  $('#p1Btn').click(function(){

    errorCount = 0
    p1Word = $('#p1Word').val().toUpperCase()

    $('#p1Word').val('')
    $('#guessArea').empty()
    $('#keys button').removeClass('disabled').on('click')

    for(let i = 0; i < p1Word.length; i++) {
      $('#guessArea').append('<span id="char' + i + '">_</span>')
    }

    $('#keys button').click(function(){
      guessChar = $(this).text()

      $(this).addClass('disabled').off('click')

      successCount = 0
      for(let i = 0; i < p1Word.length; i++) {
        if(p1Word[i] === guessChar) {
          $('#char' + i).text(guessChar)
          successCount = 1
        }
      }
      if(successCount !== 1) errorCount++

      console.log(guessChar)
      console.log('successes', successCount)
      console.log('errors', errorCount)
      return false
    })

    console.log(p1Word, p1Word.length)



    return false
  })

})
