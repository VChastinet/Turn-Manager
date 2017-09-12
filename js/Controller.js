class ManagerController{

  constructor(){
    
    this.name = $(".name");
    this.type = $("#type");
    this.bonus = $(".bonus");

    this.viewParty = new ViewParty($(".table-div"));
    this.party = new party();
    this.viewParty.update(this.party.fullParty);
  }

  createChar(){
    return new Character(
      this.name.val(),
      this.bonus.val(), 
      $("input:checked").val(),
      this.type.val()
    );
  }

  inputChar(event){
    event.preventDefault();

    this.party.add(this.createChar());
    this.saveParty();
    this.loadParty();
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
    let criteria = $(element).parent().find("span").text();
    let newParty = [];

    this.party.characters.forEach(char => {
      if(char._id !== criteria){
        newParty.push(char);
      }
    });
    this.party.characters = newParty
    this.viewParty.update(this.party.fullParty);
  }
}
