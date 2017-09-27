class Character {
  constructor(name, bonus, advantage, type){

    this.name = name;
    this.type = type;
    this.bonus = bonus;
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

      if (char.name == criteria.val()){

        let newAdvCheck = $(".re-roller input:checked").val();
        let newInit = roller(Number(char.bonus), newAdvCheck);

        char.init = newInit+Number(char.bonus);

      }
      
    });

  }

}

class Validation{

  static nameBlank(name){
    let x = Math.round(Math.random() * (57 - 48) + 48);
    let y = Math.round(Math.random() * (57 - 48) + 48);
    if(!name){
      name = "Npc" + "_"+String.fromCharCode(x)+String.fromCharCode(y);
    }
    return name;
  }

  static name(name, type){
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

  static type(type){
    if(!type){
      $(".validate-type").slideDown(100);
      return false;
    } else{
      $(".validate-type").slideUp(100);
      return true;
    }
  }
}