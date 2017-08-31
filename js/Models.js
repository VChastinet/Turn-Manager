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
    char.advantage=undefined;
    this.characters.push(char);
    this.characters.sort((a,b) => b.init - a.init);
  }
}