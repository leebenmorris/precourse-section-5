
$(document).ready(function(){

  let guessChar = ''
  let phrase = ''
  let errorCount = 0
  let success = 0
  let successCount = 0
  let spaceCount = 0
  let hanged = false
  let canvas = document.getElementById("myCanvas").getContext("2d")

  $('#phrase').focus()  //focus on input box when page first loads
  prepGuessArea(' ')    //put a space in the guessArea to prevent page layout altering later

  //submit button click capture
  $('#submitBtn').click(function(){

    //capture the input phrase from the input field then blank it so player 2 cannot see entered phrase
    phrase = $('#phrase').val().toUpperCase()
    $('#phrase').val('')

    //reset everything on the page when the submit button is clicked
    $('#phrase').focus()              //refocus on input box
    canvas.clearRect(0, 0, 200, 200)  //clear canvas area
    canvas.beginPath()                //clear path cache
    errorCount = 0
    successCount = 0    
    $('#guessArea').empty()           //clear all previous elements from guessArea
    $('#keys button').off('click')    //remove click handlers from on screen keyboard
    $('#keys button').removeClass('disabled').on('click')  //reset keyboard and enable click handlers

    //put blanks in guessArea and record the number of spaces in the phrase
    spaceCount = prepGuessArea(phrase)

    //onscreen keyboard click capture
    $('#keys button').click(function(){

      //capture keypress and store
      guessChar = $(this).text()

      //change colour of clicked key and disable further clicks
      $(this).addClass('disabled').off('click')

      //fill guessArea with 1 or more characters from phrase that match keypress
      //and record how many characters where successfully guessed for a single
      //keyboard press (eg success = 2 if phrase has two A's)
      success = fillGuessArea(phrase,guessChar)

      //update counters
      if(success === 0) errorCount++
      else successCount += success

      //has player 2 won?
      //timeouts used to ensure correct operation of page
      if(successCount === phrase.length - spaceCount) {
        setTimeout(() => alert('GAME OVER!\nPlayer 2 wins!\nPlease enter a new word to start again'), 50)
        setTimeout(() => $('#phrase').focus(), 1)
      }

      //draw hangman and record if complete
      hanged = drawHangMan(canvas,errorCount)

      //has player 1 won?
      //timeouts used to ensure correct operation of page
      if(hanged === true) {
        setTimeout(() => alert('GAME OVER!\nPlayer 1 wins!\nPlease enter a new word to start again'), 50)
        setTimeout(() => $('#phrase').focus(), 1)
      }

      //console tests to help debug
      //console.log(guessChar)
      //console.log('success', success)
      //console.log('errorCount', errorCount)
      //console.log('successCount', successCount)

      return false
    })

    //console tests to help debug
    //console.log(phrase, phrase.length)
    //console.log('success', success)
    //console.log('errorCount', errorCount)
    //console.log('successCount', successCount)

    return false
  })

})


//********** FUNCTIONS **********//

function prepGuessArea(string) {
  let spaceCount = 0
  let displayBlank = ''
  for(let i = 0; i < string.length; i++) {
    if(string[i] === ' '){
      displayBlank = ' '
      spaceCount++
    } else {
      displayBlank = '_'
    }
    $('#guessArea').append('<span id="char' + i + '">' + displayBlank + '</span>')
  }
  return spaceCount
}

function fillGuessArea(string,char) {
  let success = 0
  for(let i = 0; i < string.length; i++) {
    if(string[i] === char) {
      $('#char' + i).text(char)
      success++
    }
  }
  return success
}

function drawHangMan(c,e) {
  let hanged = false
  switch(e) {
    case 1:
      //bottom beam
      c.moveTo(10,190)
      c.lineTo(150,190)
      break
    case 2:
      //vertical beam
      c.moveTo(20,195)
      c.lineTo(20,5)
      break
    case 3:
      //top beam
      c.moveTo(10,10)
      c.lineTo(100,10)
      break
    case 4:
      //rope
      c.moveTo(95,5)
      c.lineTo(95,30)
      break
    case 5:
      //head
      c.moveTo(115,50)
      c.arc(95,50,20,0,2*Math.PI)
      break
    case 6:
      //body
      c.moveTo(95,70)
      c.lineTo(95,130)
      break
    case 7:
      //right arm
      c.moveTo(95,80)
      c.lineTo(65,110)
      break
    case 8:
      //left arm
      c.moveTo(95,80)
      c.lineTo(125,110)
      break
    case 9:
      //right leg
      c.moveTo(95,130)
      c.lineTo(75,180)
      break
    case 10:
      //left leg
      c.moveTo(95,130)
      c.lineTo(115,180)
      hanged = true
      break
    default:
      break
  }
  c.stroke()
  return hanged
}
