class ViewParty {
  constructor(element){
    this.element = element;
  }

  template(model){
    return `
    <table class="table striped">
    <thead>
      <tr>
        <th>Name/Class</th>
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
        <td><i class = "remove material-icons small" onclick="managerController.deleteMember(this)">delete</i><span hidden>${content._id}<span></td>
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
  
}