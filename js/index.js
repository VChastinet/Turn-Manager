let managerController = new ManagerController();

  $("select").material_select();
  
  $("#add-char").click(()=>$(".char-form").stop().slideToggle());
  
  $("#save-party").click(() => {
    managerController.saveParty();
    alert("The party is resting in the tavern.");
  });
  
  $("#load-party").click(() => {
    managerController.loadParty();
    alert("let the party start.");
  });

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
    
  function killSwitch(element){
       
    if ($(element).text() == "Kill"){
      $(element).html('<img src="../death.png">')
      $(element).closest("tr").attr("id", "dead");
    } else{
      $(element).html('<button class="btn waves-effect waves-light orange">Kill</button>')
      $(element).closest("tr").attr("id", "");
    }
  }