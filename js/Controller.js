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
    let type = this.type.val();
    let name = this.name.val();
    let advCheck = $("input:checked").val();
    let bonus = this.bonus.val();
    console.log(name);
    console.log(type);

    if(!Validation.type(type) || !Validation.name(name, type)){
      return
    }

    name = Validation.nameBlank(name);

    $(".create-char").click(formReset());
    
    return new Character(
      name,
      bonus, 
      advCheck,
      type
    );
  }

  inputChar(event){
    event.preventDefault();

    this.party.add(this.createChar());
    this.viewParty.update(this.party.fullParty);
    /*
    only when the database work online
    this.saveParty();
    this.loadParty();
    */
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
    $(element).closest("tr").remove();
  }
}
