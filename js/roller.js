let n = $("#quant");
let dice = $("#faces");
let bonus = $("#bonus");

$("#advantage").on("click", function() {
	$(".quant").toggle("slow");
	$(".faces").toggle("slow");
	$("#disadvantage").toggle();
});

$("#disadvantage").on("click", function() {
	$(".quant").toggle("slow");
	$(".faces").toggle("slow");
	$("#advantage").toggle();
});

$("#button").mouseover(function (){
	$(".fa-refresh").addClass("fa-spin");
});
$("#button").mouseout(function (){
	$(".fa-refresh").removeClass("fa-spin");
});

$("#button").on("click", function() {
	let advCheck = $("input:checked").val();
	roller(Number(bonus.val()), advCheck, dice.val(), n.val());
});