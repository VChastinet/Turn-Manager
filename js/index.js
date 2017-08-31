$("select").material_select();

$("#add-char").click(()=>$(".char-form").stop().slideToggle());

let managerController = new ManagerController();
