var monthelement, daylement, yearelement, div;
window.onload = function()
{
	var currentTime = new Date()
	var month = currentTime.getMonth()+1;
	var day   = currentTime.getDate();
	var year  = currentTime.getFullYear();
	var image = document.getElementsByClassName('ProductItem-gallery-slides-item')[0];
	div = document.createElement("div");
	div.style.fontFamily = 'Times New Roman, Times, seri';
	div.style.fontSize = '39px';
	div.style.fontWeight = 'bold';
	div.style.textAlign = 'left';
	div.style.color = '#2B2A26';
	div.style.position = 'absolute';
	div.style.left = '47%';
	div.style.top= '54%';
	
	if(image){
		image.appendChild(div);
	}
	yearelement = document.querySelectorAll('div.field.year.four-digits > label > input.field-element')[0];
	daylement = document.querySelectorAll('div.field.day.two-digits > label > input.field-element')[0];
	monthelement = document.querySelectorAll('div.field.month.two-digits > label > input.field-element')[0];
	if(daylement && monthelement && yearelement) {
		yearelement.value = year;
		monthelement.value = month-1;
		daylement.value = day-1;
		convert();
		yearelement.addEventListener('change', () => {
			convert();
		});
		monthelement.addEventListener('change', () => {
			convert();
		});
		daylement.addEventListener('change', () => {
			convert();
		});
	}
}
function convert()
{
	var month = monthelement.value+1;
	var day   = daylement.value+1;
	var year  = yearelement.value;
	rmonth = convert2(month);
	rday   = convert2(day);
	ryear  = convert2(year);
	var numeralselement = document.querySelectorAll('.field-element.text')[0];
	var date = rmonth +'.'+rday+'.'+ryear;
	numeralselement.value = date;
	div.innerHTML = date;
}
function convert2(x) 
{
	var n=['i', 'iv', 'v', 'ix', 'x', 'xl', 'l', 'xc', 'c', 'cd', 'd', 'cm', 'm'];
	var v=[1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];
	x = parseInt(x);
	if( x<1 || x>4999 ) 
	{
		alert(x+' is not valid');
		return '';
	}
	y = '';
	for(i=12; i>=0; )
		if( v[i]<=x ) 
		{
			y += n[i];
			x -= v[i];
		}
		else
		{
			i--;
			k = 0;
		}
	return y.toUpperCase();
}