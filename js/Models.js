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