$(init);

function init(){

}

function addBoard(){
	var k = 0;

	for (var i = 0; i < 8; i++) {
		k++;
		for (var j = 0; j < 8; j++)	{	
			if(k%2 == 0) {
				$('#board').append("<div class='s_kl'></div>");
				k++;
			} else {
				$('#board').append("<div class='t_kl'></div>");
				k++;
			}
		}
	}	
}




function addDraughts(){
	$("div").filter('.t_kl').slice(0,12).append('<img class="drag black" src="images/tem_shashka.gif">');
	$("div").filter('.t_kl').slice(20,32).append('<img class="drag  white" src="images/sv_shashka.gif">');
	
	$('.drag').draggable({
				snap:'.t_kl, #black_figures, #white_figures',
				revert:true
				});

	$('.t_kl').droppable({
		accept:'.drag',
		drop:move
	});

	function move(event, ui){
		ui.draggable.draggable('option', 'revert', 'invalid');
	}

	
	$('#white_figures').droppable({
		activate: function (){
			//чтобы подсвечивать область сброса
			fieldColorWhite = $(this).css('background-color');
			$(this).css("background-color","orange");
			console.log(fieldColorWhite);
		},
		deactivate: function(){ //возвращаем обратно цвет
			$(this).css("background-color", fieldColorWhite);

		},

		accept:'.white',
		drop: dropWhite
	});

	function dropWhite(event,ui){
		var count = $('.container_white').text();
		var c = parseInt(count);
		c+=1;
		$('.container_white').text(c);
		ui.draggable.draggable( 'revert', 'false');
	}

	$('#black_figures').droppable({
		activate: function (){
			//чтобы подсвечивать область сброса
			fieldColorBlack = $(this).css('background-color');
			$(this).css("background-color","orange");
			console.log(fieldColorBlack);
		},
		deactivate: function(){ //возвращаем обратно цвет
			$(this).css("background-color", fieldColorBlack);

		},

		accept:'.black',
		drop: dropBlack
	});

	function dropBlack(event,ui){
		var count = $('.container_black').text();
		var c = parseInt(count);
		c+=1;
		$('.container_black').text(c);
		ui.draggable.draggable('revert','disable');
	}

}


function reloadGame(){
	$('.container_black, .container_white').text(0);
	$('.drag').remove();
	$('.s_kl, .t_kl').remove();
	addBoard();
	addDraughts();

}