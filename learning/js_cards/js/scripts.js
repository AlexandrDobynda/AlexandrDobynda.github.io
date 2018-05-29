$(init);

function init() {
	 // Создаем набор случано разложенных карт
	 var numbers = ['один','два','три','четыре','пять','шесть','семь','восемь','девять','десять'];
	 	  numbers.sort( function() { return Math.random() - .5 } );

	for (var i = 0; i < 10; i++) {
			$("<div>" + i +"</div>").data('number',i).appendTo('.cards').draggable({
			containment:'.content', //ограничение перетаскивания оберточным блоком
			cursor:'move',
			revert:true //возврат перетаскиваемого элемента в исходное положение
		});
	}

	for (var j = 0; j < 10; j++) {
		$("<div>" + (j+1) +"</div>").data('number',j+1).appendTo('.slots').droppable({
			drop:handleCardDrop 	
		});
	}
}//End init()

function handleCardDrop(event,ui) {
	var cardNumber = ui.draggable.data('number');
	var slotNumber = $(this).data('number');
	//Если карта была брошена на правильный слот,
	//то изменяем ее цвет, позиционируем поверх слота,
	//и предотваращаем повторное перетаскивание
	if (cardNumber == slotNumber) {
		// alert('номера совпадают');
		ui.draggable.addClass('style-card');
		ui.draggable.draggable('disable');
		ui.draggable.position({of:$(this), my:'left top', at:'left top'});
		ui.draggable.draggable('option','revert',false);
	}
}