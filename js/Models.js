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
    char.advantage="undefined";
    this.characters.push(char);
  }
  get fullParty(){
    this.characters.sort((a,b) => a.init == b.init ? b.bonus - a.bonus : b.init - a.init);
    return this.characters;
  }
}

class Validation{

  name(name){
    let x = Math.round(Math.random() * (57 - 48) + 48);
    let y = Math.round(Math.random() * (57 - 48) + 48);
    if(!name){
      name = "Npc " + "- "+String.fromCharCode(x)+String.fromCharCode(y);
    }
    return name;
  }

  type(type){
    if(!type){
      $(".validate-type").slideDown(100);
      return false;
    } else{
      $(".validate-type").slideUp(100);
      return true;
    }
  }
}