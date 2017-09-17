class Character {
  constructor(name, bonus, advantage, type){

    this.name = name;
    this.type = type;
    this.bonus = bonus;
    this.advantage = advantage;
    this.init = this.initiative+Number(this.bonus);
    
  }
  get initiative(){
    return roller(Number(this.bonus), this.advantage);
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