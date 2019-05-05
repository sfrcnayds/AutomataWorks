"use strict"

document.onreadystatechange = () => {
  async function sleep(msec) {
      return new Promise(resolve => setTimeout(resolve, msec));
  }
  let states = ['stateA','stateB','stateC']
 function fillState(state) {
   let fillingState = document.getElementById('state'+state)
   emptyFill();
   fillingState.setAttribute("stroke","orange")
 }

async function fillRoad(oldState,newState){
   let fillingRoad = document.getElementById(oldState+'to'+newState)
   let fillingArrow = document.getElementById(oldState+'to'+newState+'Arrow')
   fillingRoad.setAttribute("stroke","orange")
   fillingArrow.setAttribute("fill","orange")
   await sleep(1000)
   fillingRoad.setAttribute("stroke","black")
   fillingArrow.setAttribute("fill","black")
 }
 function emptyFill() {
   for (let state of states) {
     let element = document.getElementById(state)
     element.setAttribute("stroke","black")
   }
 }

 function delta(q, c) {
     if (q=='A' && c=='0') return 'A'
     if (q=='A' && c=='1') return 'B'
     if (q=='B' && c=='0') return 'C'
     if (q=='B' && c=='1') return 'A'
     if (q=='C' && c=='0') return 'B'
     if (q=='C' && c=='1') return 'C'
     return '';  //default -- no transition
 }

  if(document.readyState === 'complete'){
    checkButton.onclick =async function () {
      $("#checkButton").attr("disabled", true)
      let word = input.value
      let currentState = "A"
      let stepsText = " ("+word+","+currentState+") ⊢"
      fillState(currentState)
      stepOutput.innerText = stepsText;
      $("#insertWarning").hide();
      $("#stepOutputs").fadeIn();
      for (var i = 0; i < word.length; i++) {
        let character = word[i];
        let oldState = currentState
        currentState = delta(currentState,character)
        await sleep(1000)
        fillRoad(oldState,currentState)
        await sleep(1000);
        fillState(currentState)
        let stateString = word.slice(i+1)
        if (stateString == "") {
          stateString = "ε"
        }
        stepsText += " ("+stateString+","+currentState+") ⊢"
        stepOutput.innerText = stepsText;
      }
      if (currentState=="C") {
        stepsText += "Accept"
      }else {
        stepsText += "Reject"
      }
      stepOutput.innerText = stepsText;
      $("#checkButton").attr("disabled", false)
    }

    $(function(){
      $('#input').keypress(function(e){
    // allowed char: 1 , 2 , 3, 4, 5, N, O, A, B, C
      let allow_char = [49,48];
      if(allow_char.indexOf(e.which) !== -1 ){
        $('#wrongInputAlert').fadeOut("slow");
      }
    else{
      $('#wrongInputAlert').fadeIn("slow");
      return false;
    }
  });
});
  }

  $(".navbar-nav li > a").on("click", function(e) {
    e.preventDefault();
    var href = $(this).attr('href');
    $('html,body').animate({
        scrollTop: $(href).offset().top
    }, 300);
    $(this).parents("ul").find("li").removeClass("active");
    $(this).closest("li").addClass("active");
  });
}
