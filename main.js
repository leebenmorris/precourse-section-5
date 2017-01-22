$(document).ready(function(){
  let guessChar
  let p1Word

  $('#keys button').click(function(){
    guessChar = $(this).text()
    $(this).addClass('disabled').off('click')
    console.log(guessChar)
    return false
  })

  $('#p1Btn').click(function(){
    p1Word = $('#p1Word').val().toUpperCase()
    console.log(p1Word)
    return false
  })



})
