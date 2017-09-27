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