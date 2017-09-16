class ManagerController{

  constructor(){
    
    this.name = $(".name");
    this.type = $("#type");
    this.bonus = $(".bonus");
    this.member = $("#characters");

    this.viewParty = new ViewParty($(".table-div"));
    this.viewSelector = new ViewSelector($("#characters"));
    this.party = new party();
    this.viewParty.update(this.party.fullParty);
    this.viewSelector.update(this.party.fullParty);
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
      this.viewParty.update(this.party.fullParty);
      this.viewSelector.update(this.party.fullParty);
      $("#characters").material_select();

      /*
      only when the database work online
      this.saveParty();
      this.loadParty();
      */
    }
  }
  saveParty(){
    return new HttpService()
      .post("/party", this.party.fullParty)
      .then(() => console.log("successfully saved."))
      .catch(error => alert("the dragon atacked, you can't rest now: " + error));
  }

  loadParty(){
    return new HttpService()
    .get("/party")
    .then((party) => {
      this.party.characters = party
      this.viewParty.update(this.party.fullParty);

      console.log("successfully loaded.");
    })
    .catch((error) => alert("The party has fallen" + error));
  }

  deleteMember(element){
    //let criteria = $(element).parent().find("span").text();
    let criteria = $(element).closest("tr").find("td:first-child").text();
    let newParty = [];

    this.party.characters.forEach(char => {
      //if(char._id !== criteria){
        if(char.name != criteria){
        newParty.push(char);
      }
    });
    this.party.characters = newParty;
    this.viewParty.update(this.party.fullParty);
    this.viewSelector.update(this.party.fullParty);
    $("#characters").material_select();
  }

  reRoll(){

    this.party.characters.forEach(char => {

      if (char.name == this.member.val()){

        let newAdvCheck = $(".re-roller input:checked").val();
        let newInit = roller(Number(char.bonus), newAdvCheck);

        char.init = newInit+Number(char.bonus);
        char.advantage = newAdvCheck;

      }
      this.viewParty.update(this.party.fullParty);
      
    });

  }
}
