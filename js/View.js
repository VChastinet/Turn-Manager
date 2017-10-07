class ViewParty {
  constructor(element){
    this.element = element;
  }

  template(model){
    let randomId;
    return `
    <table class="table striped">
    <thead>
      <tr>
        <th>Reaction</th>
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
        <td>
          <input type="checkbox" id="${randomId = Math.random()}" onclick="reactionCheck(this)"/>
          <label for="${randomId}"></label>
        </td>
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
      <option value="allies">All Allies</option>
        ${model.fullParty.map(content => {
          
          if(content.type == "Ally" || content.type == "Player"){
            return `<option value="${content.name}"><sup>${content.name}</sup></option>`
          }

        })} 
      </optgroup>
      <optgroup class="enemies" label="Enemies">
      <option value="enemies">All Enemies</option>
        ${model.fullParty.map(content => {

          if(content.type != "Ally" && content.type != "Player"){
           return `<option value="${content.name}">${content.name}</option>`
          }
          
        })}
      </optgroup>
    `
  }

  update(model){
    return $(this.element).html(this.template(model));
  }
}