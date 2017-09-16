class ViewParty {
  constructor(element){
    this.element = element;
  }

  template(model){
    return `
    <table class="table striped">
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Initiative</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
    ${model.map(content=>`
      <tr>
        <td>${content.name}</td>
        <td>${content.type}</td>
        <td>${content.init} (+${content.bonus})</td>
        <td class="kill" onclick="killSwitch(this)"><button class="btn waves-effect waves-light orange">Kill</button></td>
        <td><i class = "remove material-icons small" onclick="managerController.deleteMember(this)">delete</i><span></td>
      </tr>
      `).join('')}

    </tbody>
  </table>
    `
  }

  update(model){
    return $(this.element).html(this.template(model));
  }
}

class ViewSelector{

  constructor(element){
    this.element = element;
  }

  template(model){
      return `
      <optgroup class="allies" label="Allies">
        ${model.map(content => {
          
          if(content.type == "Ally" || content.type == "Player"){
            return `<option value="${content.name}">${content.name}</option>`
          }

        })} 
      </optgroup>
      <optgroup class="enemies" label="Enemies">
        ${"empty"/*model.map(content => {

          if(content.type != "Ally" && content.type != "Player"){
           return `<option value=${content.name}>${content.name}</option>`
          }
          
        })*/}
      </optgroup>
    `
  }

  update(model){
    return $(this.element).html(this.template(model));
  }
}