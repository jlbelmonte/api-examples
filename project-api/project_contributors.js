function getContributorsBox(url) {
	var container = $('<div>').css('font-family', 'arial').css('font-size', '14px')
		.css('line-height', '23px').css('width', '850px');
	var header = $('<div>');
	var title = $('<h3>').css('font-size', '2em').css('margin-top', '0.67em')
		.css('margin-bottom', '0.67em').text('Project contributors');
	header.append($('<div>').css('width', '650px').css('float', 'left').append(title));
	var poweredByImg = $('<img/>').attr('src', 'https://mb-developer.s3.amazonaws.com/powered_by_masterbranch.png')
		.attr('alt', 'powered by Masterbranch').css('width', '161px').css('height', '37px').css('margin-top', '10px');
	var poweredByLink = $('<a>').attr('href', 'https://masterbranch.com')
		.attr('title', 'powered by Masterbranch').append(poweredByImg);
	header.append($('<div>').css('width', '200px').css('float', 'left')
		.css('text-align', 'right').append(poweredByLink));
	header.append(getClearDiv());
	header.append($('<hr/>').css('margin-bottom', '20px'));

	container.append(header);
	container.append($('<div>').addClass('mb-project-contributors').append(getBigSpinner()));
	getContributors(url);
	return container;
}

function getContributors(url) {
	$.getJSON(url+'?callback=?', function(data) {
		drawContributors(data);
	});
}

function drawContributors(data) {
	$('.mb-project-contributors').empty();
	for(var i = 0; i < data['contributors'].length;i++) {
		if (i % 3 == 0) {
			$('.mb-project-contributors').append(getClearDiv()).append($('<div></div>'));
		}
		var contributorBox = getContributor(data['contributors'][i]);
		if (i % 3 != 0) {
			contributorBox.css('margin-left', '20px');
		}
		$('.mb-project-contributors').children().last().append(contributorBox);
	}
}

function getContributor(contributor) {
	var leftElement = $('<div>').width('90px').css('float', 'left');
	
	var contributorImg = $('<img/>').width('73px').height('73px').attr('src', contributor.image)
		.css('-webkit-border-radius', '5px').css('-moz-border-radius', '5px').css('border-radius', '5px');
		
	leftElement.append($('<div>').append($('<a>').attr('href', contributor.url).attr('title', contributor.name + ' profile').append(contributorImg)));
	
	leftElement.append($('<div>').width('73px').css('background-color', '#68c1f4').css('color', '#fff').css('font-size', '130%')
		.css('line-height', '100%').css('text-align', 'center').css('padding', '5px 0px').css('-webkit-border-radius', '5px')
		.css('-moz-border-radius', '5px').css('border-radius', '5px').css('margin-top', '5px').append($('<div>')
		.text(contributor.devscore_formatted)).append($('<div>').css('font-size', '65%').text('DevScore')));
		
	var rightElement = $('<div>').width('180px').css('float', 'left');
	var profileLink = $('<a>').attr('href', contributor.url).css('text-decoration', 'none').css('color', '#006699')
		.css('font-weight', 'bold').text(contributor.name);
	var rightTopElement = $('<div>').css('min-height', '80px');
	rightTopElement.append($('<div>').css('font-size', '130%').append(profileLink));
	if (contributor.rol != null) {
		rightTopElement.append($('<div>').css('color', '#333').text(contributor.rol));
	}
	rightTopElement.append($('<div>').css('color', '#999').text(contributor.location));
	rightElement.append(rightTopElement);
	if (contributor.twitter_name != null) {
		rightElement.append($('<div>').css('color', '#006699').css('font-size', '90%').text('@' + contributor.twitter_name));
	}
	if (contributor.is_mvp) {
		var mvp = $('<img/>').width('20px').height('20px').attr('src', 'https://mb-developer.s3.amazonaws.com/mvp.png');
		mvp.css('-webkit-border-radius', '5px').css('-moz-border-radius', '5px').css('border-radius', '5px').css('border', '1px solid #ccc');
		mvp.attr('title', contributor.name + ' is the current MVP of the project');
		rightElement.append($('<div>').append(mvp));
	}
	
	
	var contributorContainer = $('<div>').width('270px').css('float', 'left').css('margin-top', '20px');
	contributorContainer.append(leftElement);
	contributorContainer.append(rightElement);
	return contributorContainer

}

function getClearDiv() {
	return ($('<div>').css('clear', 'both').css('height', '0px').html('&nbsp;'));
}

function getBigSpinner() {
	var spinnerText = $('<div>').css('text-align', 'center').css('font-size', '40px').css('line-height', '50px').css('color', '#ccc').text('Loading');
	var spinnerImg = $('<div>').css('text-align', 'center').append($('<img/>').attr('src', 'https://mb-developer.s3.amazonaws.com/spinner_big.gif').attr('alt', 'spinner'));
	return $('<div>').height(110).append(spinnerText).append(spinnerImg);
}