var StipendAlloc = {
	fall: 3,
	spring1: 7,
	

	form: {}
};
StipendAlloc.init = function() {

	this.form['stiamt'] = $('#input\\.StipendAmount');
	this.form['sem'] = $('#input\\.SemesterTerm');
	this.form['year'] = $('#input\\.SemesterYear');
	this.form['total'] = $('#output\\.TotalAmount');
	this.form['total1'] = $('#output\\.TotalAmount1');
	this.form['total2'] = $('#output\\.TotalAmount2');
	this.form['total3'] = $('#output\\.TotalAmount3');
	this.form['total4'] = $('#output\\.TotalAmount4');
	this.form['total5'] = $('#output\\.TotalAmountM');
	this.form['total6'] = $('#output\\.TotalAmountM1');
	this.form['total7'] = $('#output\\.TotalAmountM2');
	this.form['total8'] = $('#output\\.TotalAmountM3');
	this.form['total9'] = $('#output\\.TotalAmountM4');
	//annual disttribution variable initialization 
	this.form['actamt'] = $('#input\\.AnnualAmount2');
	this.form['totalAcDisCent'] = $('#output\\.TotalAmount5');
	
	


	this.form['submit'] = $('#btn\\.submit');
	this.form['reset'] = $('#btn\\.reset');

	//Submit button action listener
	this.form.submit.on('click', function(e) {
		return StipendAlloc.calculate();
	});

	//reset button action listener
	this.form.reset.on('click', function(e) {
		$('#form')[0].reset();
	});

	//update monthly total value allocated
	this.form.total.on('update', function(e, amt) {
		amount = parseFloat(amt).toFixed(2);
		$(this).val(amount);
	});
	this.form.total1.on('update', function(e, amt) {
		amount = parseFloat(amt).toFixed(2);
		$(this).val(amount);
	});
	this.form.total2.on('update', function(e, amt) {
		amount = parseFloat(amt).toFixed(2);
		$(this).val(amount);
	});
	this.form.total3.on('update', function(e, amt) {
		amount = parseFloat(amt).toFixed(2);
		$(this).val(amount);
	});
	this.form.total4.on('update', function(e, amt) {
		amount = parseFloat(amt).toFixed(2);
		$(this).val(amount);
	});
	this.form.total5.on('update', function(e,amt) {
		amount = String(amt);
		$(this).val(amount);
		
	});
	this.form.total6.on('update', function(e,amt) {
		amount = String(amt);
		$(this).val(amount);
		
	});
	this.form.total7.on('update', function(e,amt) {
		amount = String(amt);
		$(this).val(amount);
		
	});
	this.form.total8.on('update', function(e,amt) {
		amount = String(amt);
		$(this).val(amount);
		
	});
	this.form.total9.on('update', function(e,amt) {
		amount = String(amt);
		$(this).val(amount);
		
	});
	this.form.totalAcDisCent.on('update', function(e, amt) {
		amount = parseFloat(amt).toFixed(2);
		$(this).val(amount);
	});
	

};
StipendAlloc.calculate = function() {

	//input stiped amount is taken as float value with two decimals points
	var stiamt = this.form.stiamt.length ? parseFloat(this.form.stiamt.val()).toFixed(2) : 0.00;
	//input value for annual rate as a float value
	var actamt = this.form.stiamt.length ? parseFloat(this.form.actamt.val()).toFixed(2) : 0.00;
	var totalAcDisCent= 0.00;
	var sem = parseInt(this.form.sem.val());
	var year = parseInt(this.form.year.val());

	//initializing constant values for fall 2017
	var fall = 75;
	var Augday = 6;
	var Sepday = 21;
	var Octday = 22;
	var Novday = 22;
	var Decday = 4;
		
	//initializing constant values for spring 2107
	var spring = 79;
	var Janday = 12;
	var Febday = 20;
	var Marday = 22;
	var Aprday = 21;
	var Mayday = 4;

	//calculating the bitmask value 
	var bitmask = sem + year ;

	//monthly stipend calculation for fall2017
    
	if((this.fall & bitmask)==this.fall){
		total=(stiamt*(Augday/fall));
		total1=(stiamt*(Sepday/fall));
		total2=(stiamt*(Octday/fall));
		total3=(stiamt*(Novday/fall));
		total4=(stiamt*(Decday/fall));
		total5 = "August";
		total6 = "September";
		total7 = "October";
		total8 ="November";
		total9 ="December";
	}
	
	if((this.spring1 & bitmask)==this.spring1){
		total=(stiamt*(Janday/spring));
		total1=(stiamt*(Febday/spring));
		total2=(stiamt*(Marday/spring));
		total3=(stiamt*(Aprday/spring));
		total4=(stiamt*(Mayday/spring));
		total5 = " January";
		total6 = "February";
		total7 = "March";
		total8 ="April";
		total9 = "May";	

	}
	totalAcDisCent = ((stiamt/actamt));
	
	//calculating the final value
	this.form.total.trigger('update', [total]);
	this.form.total1.trigger('update', [total1]);
	this.form.total2.trigger('update', [total2]);
	this.form.total3.trigger('update', [total3]);
	this.form.total4.trigger('update', [total4]);
	this.form.total5.trigger('update', [total5]);
	this.form.total6.trigger('update', [total6]);
	this.form.total7.trigger('update', [total7]);
	this.form.total8.trigger('update', [total8]);
	this.form.total9.trigger('update', [total9]);
	this.form.totalAcDisCent.trigger('update', [totalAcDisCent]);
	
};

//init on page load
StipendAlloc.init();

