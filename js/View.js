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
        <th>Status</th>
        <th><span>clear</span></th>
      </tr>
    </thead>
    <tbody>
    ${model.fullParty.map(content=>`
      <tr>
        <td>${content.name}</td>
        <td>${content.type}</td>
        <td>${content.init}</td>
        <td class="status" onclick="statusSwitch(this)"><button class="btn waves-effect waves-light orange"><i class="material-icons large">add</i></button></td>
        <td><i class = "remove material-icons small" onclick="managerController.clearMember(this)">delete</i></td>
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
        ${model.fullParty.map(content => {
          
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