$(document).ready(function(){
	//Declare vars
	var totalWidth = 0; //variable totalwidth initialised to zero and will store width of main large image slider.
	var positions = new Array(); //variable array positions to store width of each the 4 items
	
	
	//GETTING THE SLIDER WIDTH
	//select slide class inside the slides div and create an 'each' to iterate over array.
	
	$('#slides .slide').each(function(i){
		//Get Slider widths
		//set position[0] to totalwidth & add width of 'this' to totalwidth every time you loop
		positions[i] = totalWidth;
		totalWidth += $(this).width();
		
		//Check widths
		//if 'this' or current item does not have a width then alert error to user and return false.
		if(!$(this).width()){
			alert('Please add a width to your images');
			return false;
		}
	});
	//Function ends here
	
	
	//Set width
	$('#slides').width(totalWidth); //set width of slides div (id) to totalWidth calculated in previous function
	
	//Menu item click handler
	
	//Select menu->ul->li->a. when a link is clicked run function with parameter e and keepScroll
	//The function selects all product class list items and removes active class from then & adds inactive class to all of them.
	//Then the function adds active class to clicked ('this) items' parent
	$('#menu ul li a').click(function(e, keepScroll){
		//Remove active class and add inactive
		$('li.product').removeClass('active').addClass('inactive');
		//Add active class to parent
		$(this).parent().addClass('active');
		
		
		//create variable pos and set its value to length of current items's parenet's ->previous all product items
		var pos = $(this).parent().prevAll('.product').length;
		
		//slect slides div and stop the current animation and add new animation
		//new animation will take marginleft and move it by minus of positions[pos] value, time is 450ms
		$('#slides').stop().animate({marginLeft:-positions[pos]+'px'}, 450);
		
		//Prevent default by setting function parameter e to preventDefault methos
		e.preventDefault();
		//Stopping the autoscroll. If there is no autoScroll then clearInterval()
		if(!autoScroll) clearInterval(itvl);
	});
	
	//select first product in menu list and make it active & slect siblings of that and make then inactive
	//make first image active
	$('#menu ul li.product:first').addClass('active').siblings().addClass('inactive');
	
	
	
	//variable current set to 1
	//Autoscroll function. if current position is last item (current = -1) return false
	//select 'a' link from menu and set eq() to remainer of (current / link length) & execute click, true
	//Increment current position by 1
	//AutoScroll
	var current=1;
	function autoScroll(){
		if(current == -1) return false;
		
		$('#menu ul li a').eq(current%$('#menu ul li a').length).trigger('click', [true]);
		
		current++;
	}
	
	//Duration for auto scroll
	//set variable duration to 5 sec or whatever.
	//set itvl to setInterval function with parameter autoscroll & duration * 1000
	var duration = 5;
	var itvl = setInterval(function(){autoScroll()}, duration*1000);
})