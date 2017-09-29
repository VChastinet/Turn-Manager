/*
class HttpService{

  post(url, party){

    let data = {
      party: party
    }
console.log(data);
    return new Promise((resolve, reject) => {

      let xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-type','application/json');
      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.responseText));
          } else{
            console.log(xhr.responseText);
            reject(xhr.responseText)
          }
        }
      }
      xhr.send(JSON.stringify(data));
    });
  }

  get(url){

    return new Promise((resolve, reject) => {

      let xhr = new XMLHttpRequest();
      xhr.open("GET", url);

      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.responseText))
          } else{
            reject(xhr.responseText);
          }
        }
      }
      xhr.send();
    });
  }
}
*/
