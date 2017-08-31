$("select").material_select();

$("#add-npc").click(()=>{
  $(".player-form").slideUp();
  $(".npc-form").stop().slideToggle();
});
$("#add-player").click(()=>{
  $(".npc-form").slideUp();
  $(".player-form").stop().slideToggle();
});


let managerController = new ManagerController();
