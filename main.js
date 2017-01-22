$(document).ready(function(){
  let guessChar

  $('button').click(function(){
    guessChar = $(this).text()
    $(this).addClass('disabled').off('click')
    console.log(guessChar)
    return false
  })

})
