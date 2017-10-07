class ManagerController{

  constructor(){
    
    this.name = $(".name");
    this.type = $("#type");
    this.bonus = $(".bonus");
    this.member = $("#characters");

    //data binding
    this.party = new Bind(
      new party(),
      ['add', 'reRoll', 'deleteAll', 'deleteEnemies', 'deleteMember'],
      new ViewParty($(".table-div")),
      new ViewSelector($("#characters"))  
      );
    //end

    ConnectionFactory
    .getConnection()
    .then(connection => new PartyDao(connection))
    .then(dao => dao.showParty())
    .then(party => party.forEach(char => 
          this.party.add(char)))
    .catch(error => console.log(error));
  }

  createChar(){
    let name = this.name.val();
    let bonus = this.bonus.val();
    let type = this.type.val();
    let advCheck = $("form input:checked").val();

    name = Validation.nameBlank(name);
    $(".create-char").click(formReset());
    return new Character(
      name,
      bonus,
      type, 
      advCheck
    );

  }

  inputChar(event){
    event.preventDefault();

    Validation.validate(this.type.val(), this.name.val());

    ConnectionFactory
      .getConnection()
      .then(connection => {
        let createChar = this.createChar();

        new PartyDao(connection)
          .adiciona(createChar)
          .then(() => {
            this.party.add(createChar);
          })
      }).catch(erro => alert("The Party has fallen"));

    }
  
    
    clearAll(){
      this.party.deleteAll();
      
      ConnectionFactory
      .getConnection()
      .then(connection => new PartyDao(connection))
      .then(dao => dao.clearParty());
    }
    
    clearEnemies(){
      this.party.deleteEnemies();
      
      ConnectionFactory
      .getConnection()
      .then(connection => new PartyDao(connection))
      .then(dao => {
        dao.clearParty();
        this.party.fullParty.forEach(char => dao.adiciona(char));
      });
    }
    
    clearMember(element){
      let criteria = $(element).closest("tr").find("td:nth-child(2)").html();
      
      this.party.deleteMember(criteria);
  
      ConnectionFactory
      .getConnection()
      .then(connection => new PartyDao(connection))
      .then(dao => {
        dao.clearParty();
        this.party.fullParty.forEach(char => dao.adiciona(char));
      });
    }
    
  reRolling(){
    
    this.party.reRoll(this.member);
    
  }
}
