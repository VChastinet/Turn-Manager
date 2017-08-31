class View {
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
        <th>Kill</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
    ${model.characters.map(content=>`
      <tr>
        <td>${content.name}</td>
        <td>${content.type}</td>
        <td>${content.init}</td>
        <td class="kill"><img src="death.png"></td>
        <td><i class = "remove material-icons">delete</i></td>
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