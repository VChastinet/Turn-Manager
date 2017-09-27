function applyModal(){
  
  if (window.innerWidth > 1400) {
    $("#re-roller").removeClass("modal").removeAttr("style");
    $("#re-roller-content").removeClass("modal-content");
    
  } else{
    $("#re-roller").addClass("modal");
    $("#re-roller-content").addClass("modal-content");
  }
}

$(function(){
  $('.modal').modal();
  $("select").material_select();
  applyModal();
  $(window).resize(applyModal);
}); 


let managerController = new ManagerController();

$(".dropdown-button").dropdown();

function formReset(){
  setTimeout(() =>{
    document.querySelector(".char-form").reset();
    $("[type='checkbox']").prop("disabled", false)
    $(".validate-name").slideUp(100);
    $(".validate-type").slideUp(100);
  }, 50);
} 

$("#add-char").click(()=>$(".char-form").stop().slideToggle());

// $("#save-party").click(() => {
//   managerController.saveParty();
//   alert("The party is resting in the tavern.");
// });

// $("#load-party").click(() => {
//   managerController.loadParty();
//   alert("let the party start.");
// });

$("#re-roll").click(() => managerController.reRolling());

$("[value='adv']").change(function() {
    if(this.checked){
      $(this).closest("div").find("[value='disadv']").prop("disabled", true); 
    } else {
      $(this).closest("div").find("[value='disadv']").prop("disabled", false);
    }
});

$("[value='disadv']").change(function() {
  if(this.checked){
    $(this).closest("div").find("[value='adv']").prop("disabled", true); 
  } else {
    $(this).closest("div").find("[value='adv']").prop("disabled", false);
  }
});
  
function statusSwitch(element){
      
  if ($(element).text() == "add"){
    $(element).html('Unconscious')
    $(element).closest("tr").attr("id", "dead");
  } else{
    $(element).html('<button class="btn waves-effect waves-light orange"><i class="material-icons large">add</i></button>')
    $(element).closest("tr").attr("id", "");
  }
}