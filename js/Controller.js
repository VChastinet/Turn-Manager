class ManagerController{
  constructor(){
    
    
    this.name = $(".name");
    this.type = "test";
    this.bonus = $(".bonus");

    this.view = new View($(".table-div"));
    this.party = new party();
    this.view.update(this.party);
    console.log(this.view);
  }
  createChar(){
    return new Character(
      this.name.val(),
      this.bonus.val(),
      $("input:checked").val(),
      this.type
    );
  }
  inputChar(event){
    event.preventDefault();

    this.party.add(this.createChar());
    this.view.update(this.party);
    console.log(this.party);
  }
}
