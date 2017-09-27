class ManagerController{

  constructor(){
    
    this.name = $(".name");
    this.type = $("#type");
    this.bonus = $(".bonus");
    this.member = $("#characters");

    //data binding
    this.party = new Bind(
      new party(),
      ['add', 'deleteMember', 'deleteAll', 'deleteEnemies', 'reRoll'],
      new ViewParty($(".table-div")),
      new ViewSelector($("#characters"))  
      );
    //end


  }

  createChar(){
    let type = this.type.val();
    let name = this.name.val();
    let advCheck = $("form input:checked").val();
    let bonus = this.bonus.val();

    if(!Validation.type(type) || !Validation.name(name, type)){
      return
    } else {
      name = Validation.nameBlank(name);
      $(".create-char").click(formReset());
      return new Character(
        name,
        bonus, 
        advCheck,
        type
      );
    }
  }

  inputChar(event){
    event.preventDefault();

    if(!this.createChar()){
      return

    } else {
      this.party.add(this.createChar());
      
      /*
      only when the database work online
      this.saveParty();
      this.loadParty();
      */
    }
  }
  clearMember(element){
    let criteria = $(element).closest("tr").find("td:first-child").html();
    
    this.party.deleteMember(criteria);
  }
  
  clearAll(){
    this.party.deleteAll();
  }

  clearEnemies(){
    this.party.deleteEnemies();
  }

  
  reRolling(){
    
    this.party.reRoll(this.member);
    
  }
      // saveParty(){
      //   return new HttpService()
      //     .post("/party", this.party.fullParty)
      //     .then(() => console.log("successfully saved."))
      //     .catch(error => alert("the dragon atacked, you can't rest now: " + error));
      // }
    
      // loadParty(){
      //   return new HttpService()
      //   .get("/party")
      //   .then((party) => {
      //     this.party.characters = party
      //     this.viewParty.update(this.party.fullParty);
    
      //     console.log("successfully loaded.");
      //   })
      //   .catch((error) => alert("The party has fallen" + error));
      // }
}
