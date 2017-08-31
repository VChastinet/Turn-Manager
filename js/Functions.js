
function singleRoll(dice, bonus) {
	let result = Math.floor(Math.random() * dice) + 1;
	addBonus(bonus, result);
	totalResult(bonus, result);
	return result;
}

function multiRoll(dice, n, bonus) {
	let arr = [];
	for (var i = 0; i < n; i++) {
		arr.push(singleRoll(dice));
	}
	let result = arr;
	addBonus(bonus, result.join("⦁"));
	let sumResult = result.reduce((acc, curr) => acc + curr);
  totalResult(bonus, sumResult);
  console.log(result);
	return result;
}

function addBonus(bonus, result) {
	if (bonus < 1) {
		$("#result-box").html(result);
	} else {
		$("#result-box").html(`${result} (+${bonus})`);
	}
}

function totalResult(bonus, result) {
	let total = result + bonus;
	setTimeout(()=>$("#total-box").html(total), 200);
}

function advRoll(bonus, advCheck) {
	let result = multiRoll(20, 2, bonus);
	
	if (advCheck == "adv") {
		result = Math.max(result[0], result[1]);
	} else if (advCheck == "disadv") {
		result = Math.min(result[0], result[1]);
	}    
  totalResult(bonus, result);
  console.log(result);
  return result
}

function roller(bonus, advCheck) {

	let dice = 20;
	//jogada com vantagem/disvantagem
	if (advCheck != undefined) {
		return advRoll(bonus, advCheck);
		//jogando apenas 1 dado
	} else {
		return singleRoll(dice, bonus);
	}
}