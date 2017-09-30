class ProxyFactory {

  static create(object, props, action) {

    return new Proxy (object, {

    //captura métodos
      get(target, prop, receiver){

        if(props.includes(prop) && ProxyFactory._isFunction(target[prop]) ){

          return function(){

            Reflect.apply(target[prop], target, arguments);
            return action(target);        
          }
        }
        return Reflect.get(target, prop,receiver);
      }

    //captura propriedades
      // , set(target, prop, value, receiver){

      //   if(props.includes(prop)){
      //     target[prop] = value;
      //   }
      //   return Reflect.set(target, prop, value, receiver);
      // }
    });
  }

  static _isFunction(func){
    return typeof(func) == typeof(Function);
  }
}

class Bind {
  constructor(model, props, ...views){
    let proxy = ProxyFactory.create(model, props, model => {
      views.forEach(view => view.update(model));
      $("#characters").material_select();
    });

    views.forEach(view => view.update(model));

    return proxy;
  }
}

//indexed DB
var ConnectionFactory = function(){

  var stores = ["party"];
  var version = 1;
  var dbName = "tavern";
  
  var connection = null;
  
  
  return class ConnectionFactory{
  
    constructor(){
      throw new Error("imposspivel criar instâncias desta classe");
    }
    
    static _createStores(connection){
      stores.forEach(store =>{
        if(connection.objectStoreNames.contains(store)){
          connection.deleteObjectStore;
        }
        connection.createObjectStore(store, { autoIncrement: true })
      });
    }
  
    static getConnection(){
  
      return new Promise((resolve, reject) => {
        let openRequest = window.indexedDB.open(dbName, version);
  
        openRequest.onupgradeneeded = e => {
  
         ConnectionFactory._createStores(e.target.result);
        }
  
        openRequest.onsuccess = e => {
  
          if(!connection){
            connection = e.target.result;
          }
          resolve(connection);
        }
  
        openRequest.onerror = e => {
  
          console.log(e.target.error);
          reject(e.target.error.name);
        }
      });
    }
  }
}();

class PartyDao{

  constructor(connection){
    this._connection = connection;
    this._store = "party"
  }

  adiciona(party){

    return new Promise((resolve, reject) => {

      let request = this._connection
      .transaction([this._store], "readwrite")
      .objectStore(this._store)
      .add(party);

      request.onsuccess = e => {
        resolve();
      }

      request.onerror = e => {
        console.log(e.target.error);
        reject("the party has fallen");
      }
    });

  }

  showParty(){
    return new Promise ((resolve, reject) => {

      let cursor = this._connection
        .transaction([this._store], "readwrite")
        .objectStore(this._store)
        .openCursor();

      let party = [];

      cursor.onsuccess = e =>{
        let current = e.target.result;
        if(current){
          let data = current.value;
          if (data) party.push(new Character(data.name, data.bonus, data.type));
          current.continue();
        } else{
          resolve(party);
        }
      };
      cursor.onerror = e => {
        console.log(e.target.error);
        reject("the party cannot be ressurected");
      }
    });
  }

  clearParty(){

    return new Promise((resolve, reject) => {
      
      let request = this._connection
      .transaction([this._store], "readwrite")
      .objectStore(this._store)
      .clear();

      request.onsuccess = e => resolve();

      request.onerror = e => {
        console.log(e.target.error);
        reject("something weird happend");
      }
    });

  }

}

