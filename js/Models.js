class Character {
  constructor(name, bonus, type, advantage){

    this.name = name;
    this.bonus = bonus;
    this.type = type;
    this.init = this._initiative(advantage)+Number(this.bonus);
    
  }
  _initiative(advantage){
    return roller(Number(this.bonus), advantage);
  }
}

class party{
  constructor(){
    this.characters = [];
  }
  add(char){
    this.characters.push(char);
  }

  get fullParty(){
    this.characters.sort((a,b) => a.init == b.init ? b.bonus - a.bonus : b.init - a.init);
    return this.characters;
  }
  
  deleteMember(criteria){
    this.characters = this.characters.filter(char => char.name != criteria);
  }
  deleteEnemies(){
    this.characters = this.characters.filter(char => char.type == "Player"||char.type == "Ally");
  }
  deleteAll(){
    this.characters = [];
  }

  reRoll(criteria){

    this.characters.forEach(char => {

      if ("allies" == criteria.val()){
        if(char.type == "Player" || char.type == "Ally"){
          let newInit = roller(Number(char.bonus));
          char.init = newInit+Number(char.bonus);
        }
      }

      if ("enemies" == criteria.val()){
        if(char.type != "Player" && char.type != "Ally"){
          let newInit = roller(Number(char.bonus));
          char.init = newInit+Number(char.bonus);
        }
      }

      if (char.name == criteria.val()){

        let newAdvCheck = $(".re-roller input:checked").val();
        let newInit = roller(Number(char.bonus), newAdvCheck);

        char.init = newInit+Number(char.bonus);

      }
      
    });

  }

}

class Validation{

  static validate(type, name){
    if(!Validation._type(type) || !Validation._name(name, type)){
      throw new Error("You must fill the field correctly");
    }
  }
  static nameBlank(name){
    if(!name){
      name = Names.getName()+"<sup>(NPC)</sup>";
    }
    return name;
  }

  static _name(name, type){
    if(type =="Boss" || type == "Player"){
      if(!name){
        $(".validate-name").text(`A ${type} must have a name`)
        $(".validate-name").slideDown(100);
        return false;
      } else{
        return true;
      }
    } else{
      return true;
    }
  }

  static _type(type){
    if(!type){
      $(".validate-type").slideDown(100);
      return false;
    } else{
      $(".validate-type").slideUp(100);
      return true;
    }
  }
}