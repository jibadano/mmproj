$.ajax({type:'POST', url:'/login',
beforeSend: function (xhr) {
    xhr.setRequestHeader ("Authorization", "Basic " + btoa("jibadano@gmail.com:12345678"));
},
success(data){


	$.ajax({type:'POST', url:'/services', data: JSON.stringify({serviceId:'getUsers', data:{user:{email:''}}}), success(data){

		var users = JSON.parse(data).data;
		var userIds = [];
		users.forEach(function(user){userIds.push(user._id)})

		//var data2 = {serviceId:'addGroup', data:{group:{name: 'myFriends', friends: userIds}}};
    console.log(userIds[0]);
    //var data2 = {serviceId:'remFriend', data:{groupName: 'myFriends', friend: userIds[0]}};
    //var data2 = {serviceId:'remGroup', data:{groupName: 'myFriends'}};


		$.ajax({type:'POST', url:'/services', data: JSON.stringify(data2), success(data3){

			console.log(data3);
		}});
	}});
}});
