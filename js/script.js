

//allocated gross amount between beginning and end dates set
function allocation(annualRt, basisPeriods, hrsPerWeek, beginDt, endDt)
{
	if(beginDt.getDate() == 0){
		return 1;
	} else {
		return monthlySalaryBasisAllocation(annualRt, basisPeriods, hrsPerWeek, beginDt, endDt);
	}
}

//Percent Time, calculates the amount of time worked, whether full time (100%) or part-time at 20 hrs (50%)
function pctTime(hrsPerWeek){
		return (hrsPerWeek/40)*100;
}

// full time equivalence based on week
function FTE(hrsPerWeek){
	return (hrsPerWeek/40);
}
//annual rate %
function annualRateper(annualRt,annualratecent){
	return (annualRt*(annualratecent/100));
}


// full time equivalence based on year
function FTEYearly(annualRt, basisPeriods, hrsPerWeek, beginDt, endDt)
{
	return annualRt == 0 ? 0 : allocation(annualRt, basisPeriods, hrsPerWeek, beginDt, endDt)/annualRt;
}

//monthly salary based on annual rate, basis period, and hrs per week
function annualRtMonthlySalary(annualRt, basisPeriods, hrsPerWeek)
{
	return (hrsPerWeek/40)*(annualRt/basisPeriods);
}

//calculating hourly rate with annual rate, basis period, hrs per week, etc.
function hourlyRate(annualRt, basisPeriods, hrsPerWeek, beginDt, endDt)
{
	return 0 ? 0 : ((allocation(annualRt, basisPeriods, hrsPerWeek, beginDt, endDt)/(Math.round(((netWorkDays(beginDt, endDt)*8)/40)*10)/10))/hrsPerWeek);
}

//calculating work days between start and end date
function netWorkDays(startDate, endDate) 
{
  
    // Validate input
    if (endDate < startDate)
        return 0;
    
    // Calculate days between dates
    var millisecondsPerDay = 86400 * 1000; // Day in milliseconds
    startDate.setHours(0,0,0,1);  // Start just after midnight
    endDate.setHours(23,59,59,999);  // End just before midnight
    var diff = endDate - startDate;  // Milliseconds between datetime objects    
    var days = Math.ceil(diff / millisecondsPerDay);
    
    // Subtract two weekend days for every week in between
    var weeks = Math.floor(days / 7);
    days = days - (weeks * 2);

    // Handle special cases
    var startDay = startDate.getDay();
    var endDay = endDate.getDay();
    
    // Remove weekend not previously removed.   
    if (startDay - endDay > 1)         
        days = days - 2;      
    
    // Remove start day if span starts on Sunday but ends before Saturday
    if (startDay == 0 && endDay != 6)
        days = days - 1  
            
    // Remove end day if span ends on Saturday but starts after Sunday
    if (endDay == 6 && startDay != 0)
        days = days - 1  
    
    return days;
}

//monthly salary using annual rate, basis period, hrs per week, etc.
function monthlySalaryBasisAllocation(annualRt, basisPeriods, hrsPerWeek, beginDt, endDt)
{
	var salary = annualRtMonthlySalary(annualRt, basisPeriods, hrsPerWeek);
	var nwd = netWorkDays(beginDt, new Date(beginDt.getFullYear(), beginDt.getMonth() + 1, 0));
	var twd = netWorkDays(new Date(beginDt.getFullYear(), beginDt.getMonth(), 1), new Date(beginDt.getFullYear(), beginDt.getMonth() + 1, 0));
	var beginPdSalary = (nwd/twd)*salary;
	var payPeriods = ((endDt.getFullYear() - beginDt.getFullYear())*12)-beginDt.getMonth()+1+endDt.getMonth();
	var wholePdSalary = 0;
	var endPdSalary = 0;
	if(payPeriods-2 >= 0){
		wholePdSalary = (payPeriods-2)*salary;
		nwd = netWorkDays(new Date(endDt.getFullYear(), endDt.getMonth(), 0), endDt);
		twd = netWorkDays(new Date(endDt.getFullYear(), endDt.getMonth(), 0), new Date(endDt.getFullYear(), endDt.getMonth() + 1, 0));
		endPdSalary = (nwd/twd)*salary;
	}
	var monthlySalaryBasisAllocation = beginPdSalary + wholePdSalary + endPdSalary;
	return monthlySalaryBasisAllocation;
}


// full time equivalence based on week
function FallSemesterAcctDist(fallRate, annualRt){
	return fallRate/annualRt;
		
}
// full time equivalence based on week
function SpringSemesterAcctDist(springRate, annualRt){
		return springRate/annualRt;
}
// full time equivalence based on week
function SummerSemesterAcctDist(summerRate, annualRt){
		return summerRate/annualRt;
}

//get values for each variable being called in the above functions
function getSalRates()
{   var annualratecent = document.getElementsByName("CentAnnualRate")[0].value;
	var annualRt = document.getElementsByName("AnnualRate")[0].value;
	var basisPeriods = document.getElementsByName("BasisPeriods")[0].value;
	var hrsPerWeek = document.getElementsByName("HoursPerWeek")[0].value;
	var beginDt = new Date(document.getElementsByName("BeginDate")[0].value + " 00:00:01");
	var endDt = new Date(document.getElementsByName("EndDate")[0].value + " 23:59:59");
	if(beginDt == "Invalid Date" || endDt == "Invalid Date"){
		alert("Please set both date fields.");
		return;
	}
	if(beginDt.getTime() > endDt.getTime()){
		alert("Invalid dates.");
		return;
	}
	document.getElementsByName("AnnualRateCent")[0].value = Math.round(annualRateper(annualRt,annualratecent)*100)/100;
	document.getElementsByName("Allocation")[0].value = Math.round(allocation(annualRt, basisPeriods, hrsPerWeek, beginDt, endDt)*100)/100;
	
	document.getElementsByName("MonthlySalary")[0].value = Math.round(annualRtMonthlySalary(annualRt, basisPeriods, hrsPerWeek, beginDt, endDt)*100)/100;
	document.getElementsByName("PctTime")[0].value = Math.round(pctTime(hrsPerWeek));
	document.getElementsByName("FTE")[0].value = FTE(hrsPerWeek);
	document.getElementsByName("FTEyearly")[0].value = Math.round(FTEYearly(annualRt, basisPeriods, hrsPerWeek, beginDt, endDt)*10000)/10000;
	document.getElementsByName("NumberOfWorkDays")[0].value = netWorkDays(beginDt, endDt);
	// document.getElementsByName("HourlyRate")[0].value = Math.round(hourlyRate(annualRt, basisPeriods, hrsPerWeek, beginDt, endDt)*100)/100;
}

//reset function for all values
function resetAllFields()
{
	document.getElementsByName("AnnualRate")[0].value = 0;
	document.getElementsByName("BasisPeriods")[0].selectedIndex = "0";
	document.getElementsByName("HoursPerWeek")[0].value = 0;
	document.getElementsByName("BeginDate")[0].value = "";
	document.getElementsByName("EndDate")[0].value = "";
	document.getElementsByName("Allocation")[0].value = "";
	document.getElementsByName("MonthlySalary")[0].value = "";
	document.getElementsByName("PctTime")[0].value = "";
	document.getElementsByName("FTE")[0].value = "";
	document.getElementsByName("FTEyearly")[0].value = "";
	document.getElementsByName("NumberOfWorkDays")[0].value = "";
	// document.getElementsByName("HourlyRate")[0].value = "";
	document.getElementsByName("AnnualRateCent")[0].value = "";
	document.getElementsByName("CentAnnualRate")[0].value = 0; 
}
