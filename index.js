'use strict';

$(function() {
	function hideAllTemplates() {
		$('h3').each(function() {
			var $this = $(this).hide();
			$this.nextUntil('h3').hide();
		});
	}
	function showPrePost() {
		$('h3 [id="pretemplate"], h3 [id="posttemplate"]').each(function() {
			$(this).parent().nextUntil('h3').show();
		})
	}
	hideAllTemplates();
	$('strong:contains("NAME")').addClass('template-name');
	$('strong:contains("ADDRESS")').addClass('template-address');
	$('strong:contains("AFFECTED")').addClass('template-affected');
	$('strong:contains("DATE")').addClass('template-date');
	$('form').on('submit', function() {
		var name = $('input[name="name"]').val();
		var address = $('input[name="address"]').val();
		var affected = $('textarea[name="affected"]').val();
		$('.form-error').hide();
		if(!name || name.length < 5 || !address || address.length < 5 || !affected || affected.length < 5) {
			$('.form-error').show();
			return false;
		}
		$('.template-name').text(name);
		$('.template-address').text(address);
		$('.template-affected').text(affected);
		$('.template-date').text(moment().format('DD.MM.YYYY'));
		var $h3 = $('h3');
		var numSel = 2;
		var selected = [];
		while(selected.length < numSel) {
			var sel = Math.round(Math.random() * ($h3.length - 1));
			if(selected.indexOf(sel) == -1)
				selected.push(sel);
		}
		var i = 0;
		hideAllTemplates();
		showPrePost();
		$('h3').each(function() {
			if(selected.indexOf(i++) >= 0)
				$(this).nextUntil('h3').show();
		});
		return false;
	});
});