/*
	tree data type library for input parser 
*/

//struct to create a new node.
//usage: node(data, parent)
//		data: data stored at node
//     	parent: parent of node, leave value as null if node is root 
function node(data, parent){
	this.data = data;
	this.parent = parent;
	this.left = null;
	this.right = null;
	console.log("new node\n data:" + this.data + "\n parent:" + this.parent);
}

//function to initialize tree.
//usage: var my_tree = new tree(data)
// 		data is data of root node 
function tree(data){
	//data for the tree 
	this.array_data = new Array();
	this.array_data.push(new node(data,null));

	//function to search all children of a node
	//returns address of node in mytree.array_data
	//usage: my_tree.search(node, data)
	// 		node: address of node in array_data
	//		data: data to be searched

	// to search the entire tree use my_tree.search(0, data)

	this.search = function(node, data){
		if(data == null){
			console.log("search: data cannot be null");
			return null;
		}
		if(this.array_data[node] == null){
			console.log("search: node cannot be null");
			return null;
		}
		if(this.array_data[node].data == data){
			console.log("search: node found: " + node);
			return node;
		}
		if(this.array_data[node].left == null && this.array_data[node].right == null){
			console.log("search: node is leaf");
			return null;
		}else{
			if(this.array_data[node].left != 0){
				console.log("search: searching left");
				var result = this.search(this.array_data[node].left, data);
				if(result != null){  return result;  }
			}
			if(this.array_data[node].right != 0){
				console.log("search: searching right");
				var result = this.search(this.array_data[node].right, data);
				if(result != null){  return result;  }
			}
		}
		return null;
	
	}

	//function to add node into the tree
	//usage: my_tree.add(new node(data, parent));
	// 		parent: address of parent node in this.array_data
	//		node: node to add
	
	//will not add if parent node cant have anymore children

	this.add = function(node){
		var parent = node.parent
		var address = this.array_data.length;

		if(this.array_data[parent].left == null){
			this.array_data[parent].left = address;
			this.array_data.push(node);
			console.log("add: node added to parent as left child");
			console.log("add: node is "+ address);
		}	else if (this.array_data[parent].left != null && this.array_data[parent].right == null)   {
			this.array_data[parent].right = address;
			this.array_data.push(node);
			console.log("add: node added to parent as right child");
			console.log("add: node is "+ address);			
		} 	else {	 console.log("this node is full"); 	 }

	}

	//function to check if node is full
	//returns true if it is
	//returns false if otherwise

	this.is_full = function(node){
		if(this.array_data[node] == null){return false}
		if(this.array_data[node].left != null && this.array_data[node].right != null ){
			return true;
		}
		return false;
	}

	//funtion to add a node using its parents data
	//not like its adopted or anything
	//usage: my_tree.add_by_data(subtree, parent_data, node_data);
	//		subtree: possible ancestor of node, set as 0 to search entire tree
	//		parent_data: data of intended parent
	//		node_data: data of node to add

	//will not add if parent arent found or parent cannot afford to adopt the kid 

	this.add_by_data = function(subtree, parent_data, node_data){
		var parent = this.search(subtree, parent_data);
		if(parent == null){
			console.log('add: unable to find parent');
			return;
		}
		this.add(new node(node_data, parent))
	}

	//function to print array_data
	//usage: my_tree.print_data();
	//prints all the nodes onto console

	this.print_data = function(){
		console.log("size:" + this.array_data.length )
		for(var i=0; i< this.array_data.length; i++){
			console.log(this.array_data[i])
		}
	}

	console.log("tree init");
}
