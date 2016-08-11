/* 
	input parser "lalala" by xyzrules
	touched up by harryt 
*/
var num="x";

var pos=0;
//operator stack
var stack = [];
//output queue
var queue = [];

var list = ["sin","cos","tan","cot","log","ln"];

function input_parser(str){
	stack = [];
	queue = [];

	for (var i=0; i<str.length; i++){
		if (str[i]!==" " && str[i]!==",") {
			if ( isNaN (Number(str[i]) ) === false ){
				if (num==="x")	num=0;
				num=num*10+Number(str[i]);
			}
			else {
				check_num();
				if (str[i]==="x" || str[i]==="e"){
					queue.push(str[i]);
				}
				else if (is_operator(str[i])!==0 && is_operator(str[i])!==4){
					while (stack.length>0){
						var res=stack.pop();
						if (order_operator(str[i],res)===false){
							stack.push(res);
							break;
						}
					}
					stack.push(str[i]);
				}
				else if (str[i]==="("){
					stack.push(str[i]);
				}
				else if (str[i]==")"){
					var res="x";
					while (res!=="("){
						res=stack.pop();
						if (res!=="(")
							queue.push(res);
					}
				}
				else {
					//other operator such as sin, cos, tan, cot, log, ln
					if (str[i]==="l" && str[i+1]==="n"){
						stack.push("ln");
						i=i+1;
					}
					else {
						stack.push(str.substring(i,i+3));
						i=i+2;
					}
				}
			}
		}
		else {
			check_num();
		}
	}
	check_num();

	while (stack.length!=0){
		queue.push(stack.pop());
}

return to_tree(queue);
}

function is_operator(data){
	for (var i=0;i<=5;i++){
		if (data===list[i])	return 4;
	}
	if (data==="^")
		return 3;
	else if (data==="*" || data==="/" || data==="%")
		return 2;
	else if (data==="+" || data==="-")
		return 1;
	return 0;
}

function check_num(){
	if (!isNaN(num)){
		queue.push(num);
		num="x";
	}
}

function order_operator(data1, data2){
	var res1=is_operator(data1);
	var res2=is_operator(data2);
	if (res1>=3 && res2>res1){
		return true;
	}
	else if (res1<3 && res2>=res1){
		queue.push(data2);
		return true;
	}
	return false;
}


function to_tree(array){
	var input_tree = new tree(array[array.length-1]);
	var current_node = 0
	for(var i = array.length - 1; i > 0; i -=1){
			while(input_tree.is_full(current_node)){
				current_node = input_tree.array_data[current_node].parent
			}
			input_tree.add(new node(array[i-1], current_node));
		if(is_operator(array[i-1]) != 0){
			current_node = input_tree.array_data.length -1;
			if(array[i-1]  === 'sin' 
				|| array[i-1]  === 'cos' 
				|| array[i-1]  === 'tan' 
				|| array[i-1]  === 'ln' ){
				input_tree.add(new node(0, current_node));
			}
			
		}
	}
	input_tree.print_data();
}

