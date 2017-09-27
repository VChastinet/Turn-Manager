
function singleRoll(dice, bonus) {
	let result = Math.ceil(Math.random() * dice);
	return result;
}

function multiRoll(dice, n, bonus) {
	let arr = [];
	for (var i = 0; i < n; i++) {
		arr.push(singleRoll(dice));
	}
	let result = arr;
	return result;
}

function partialResult(bonus, result) {
	if(Array.isArray(result)){
		result = result.join("⦁")
	}
	if (bonus < 1) {
		$("#result-box").html(result);
	} else {
		$("#result-box").html(`${result} (+${bonus})`);
	}
}

function totalResult(bonus, result) {
	if(Array.isArray(result)){
		result = result.reduce((acc, curr) => acc + curr);
	};
	let total = result + bonus;
	setTimeout(()=>$("#total-box").html(total), 200);
}

function advRoll(bonus, advCheck, result) {
	if (advCheck == "adv") {
		result = Math.max(result[0], result[1]);
	} else if (advCheck == "disadv") {
		result = Math.min(result[0], result[1]);
	} 
  return result;
}

function roller(bonus, advCheck, dice=20, n) {

	let result = null;

	//jogada com vantagem/disvantagem
	if (advCheck != undefined) {

		let partResult = multiRoll(20, 2, bonus);
		result = advRoll(bonus, advCheck, partResult);

		partialResult(bonus, partResult);
		totalResult(bonus, result);

		return result

		//jogando apenas 1 dado
	} else if(n > 1){
		result = multiRoll(dice, n, bonus);
		//jogando vários dados
	}	else {
		result = singleRoll(dice, bonus);
	}

	partialResult(bonus, result);
	totalResult(bonus, result);

	return result;
}