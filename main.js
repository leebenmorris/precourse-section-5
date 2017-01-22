
$(document).ready(function(){

  let guessChar = ''
  let p1Word = ''
  let p1WordLength = 0
  let errorCount = 0
  let success = 0
  let successCount = 0
  let displayBlank = ''
  let spaceCount = 0
  let canvas = document.getElementById("myCanvas").getContext("2d")

  $('#p1Word').focus()

  $('#p1Btn').click(function(){
    canvas.clearRect(0, 0, 200, 200)
    canvas.beginPath()
    errorCount = 0
    successCount = 0
    p1Word = $('#p1Word').val().toUpperCase()
    p1WordLength = p1Word.length
    $('#p1Word').val('')
    $('#guessArea').empty()
    $('#keys button').removeClass('disabled').on('click')


    spaceCount = 0
    for(let i = 0; i < p1WordLength; i++) {
      if(p1Word[i] === ' '){
        displayBlank = ' '
        spaceCount++
      } else {
        displayBlank = '_'
      }
      $('#guessArea').append('<span id="char' + i + '">' + displayBlank + '</span>')
    }

    $('#keys button').click(function(){
      guessChar = $(this).text()

      $(this).addClass('disabled').off('click')

      success = 0
      for(let i = 0; i < p1WordLength; i++) {
        if(p1Word[i] === guessChar) {
          $('#char' + i).text(guessChar)
          success++
        }
      }

      if(success === 0) errorCount++
      else successCount += success

      if(successCount === p1WordLength - spaceCount) alert('Player 2 Wins\nPlease enter a new word to start again')

      drawHangMan()

      console.log(guessChar)
      console.log('success', success)
      console.log('errorCount', errorCount)
      console.log('successCount', successCount)
      return false
    })


    console.log(p1WordLength)
    console.log('success', success)
    console.log('errorCount', errorCount)
    console.log('successCount', successCount)

    return false
  })


// ******* FUNCTIONS ********* //
  function drawHangMan() {
    switch(errorCount) {
      case 1:
        //bottom beam
        canvas.moveTo(10,190)
        canvas.lineTo(150,190)
        break
      case 2:
        //vertical beam
        canvas.moveTo(20,195)
        canvas.lineTo(20,5)
        break
      case 3:
        //top beam
        canvas.moveTo(10,10)
        canvas.lineTo(100,10)
        break
      case 4:
        //rope
        canvas.moveTo(95,5)
        canvas.lineTo(95,30)
        break
      case 5:
        //head
        canvas.moveTo(115,50)
        canvas.arc(95,50,20,0,2*Math.PI)
        break
      case 6:
        //body
        canvas.moveTo(95,70)
        canvas.lineTo(95,130)
        break
      case 7:
        //right arm
        canvas.moveTo(95,80)
        canvas.lineTo(65,110)
        break
      case 8:
        //left arm
        canvas.moveTo(95,80)
        canvas.lineTo(125,110)
        break
      case 9:
        //right leg
        canvas.moveTo(95,130)
        canvas.lineTo(75,180)
        break
      case 10:
        //left leg
        canvas.moveTo(95,130)
        canvas.lineTo(115,180)
        alert('GAME OVER!\nPlayer 1 wins!\nPlease enter a new word to start again')
        break
      default:
        break
    }
    canvas.stroke()
  }
})
