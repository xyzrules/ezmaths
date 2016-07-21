//example input
var str="3 + 4 * 2 / ( 1 - 5 ) ^ 2 ^ 3";

var num="x";

var pos=0;
//operator stack
var stack = [];
//output queue
var queue = [];

for (var i=0; i<str.length;i++){
	if (str[i]==" ") {}
	else {
		if ( isNaN (Number(str[i]) ) === false ){
			if (num==="x")	num=0;
			num=num*10+Number(str[i]);
		}
		else {
			check_num();
			if (str[i]==="x"){
				queue.push("x");
			}
			else if (is_operator(str[i])!==0){
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
		}

	}
}


while (stack.length!=0){
	queue.push(stack.pop());
}

while (queue.length>0){
	console.log(queue.pop());
}

//insert data into array

function is_operator(data){
	if (data==="^")
		return 3;
	else if (data==="*" || data==="/" || data=="%")
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
	if (res1===3){
		return false;
	}
	else if (res2>=res1){
		queue.push(data2);
		return true;
	}
	return false;
}
