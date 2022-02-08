// Your code here


function createEmployeeRecord(array){
    //make 4 element array of a string, string, string, and number 
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }

}

function createEmployeeRecords(arrOfArr){
    return arrOfArr.map(employee => {return createEmployeeRecord(employee)})
}


function createTimeInEvent(employeeRecord, dateStamp){
    //create an object with the keys: type, hour, date.
    const timeStart = {
        type: "TimeIn",
        hour: parseInt(dateStamp.split(" ")[1]), //derived from the argument 
        date: dateStamp.split(" ")[0]//derived from the argument 
    }
     //Add an object with keys to the timeInEvents Array on the record Object
     employeeRecord.timeInEvents.push(timeStart);

     return employeeRecord;
}

function createTimeOutEvent(employeeRecord2, dateStamp2){

    const timeEnd = {
        type: "TimeOut",
        hour: parseInt(dateStamp2.split(" ")[1]),
        date: dateStamp2.split(" ")[0]
    }

    employeeRecord2.timeOutEvents.push(timeEnd);

    return employeeRecord2;
}

function hoursWorkedOnDate(employee, dateForm){

    let inEvent = employee.timeInEvents.find(e => {
        return e.date === dateForm
    })

   let outEvent = employee.timeOutEvents.find(e => {
       return e.date === dateForm
   })

   employee = (outEvent.hour - inEvent.hour) / 100;
   // why does this need to be divided by 100?


   
   return employee;
 
}

function wagesEarnedOnDate(employee2, dateForm2){

    let hoursWorked = hoursWorkedOnDate(employee2, dateForm2);

    let totalWage = hoursWorked * employee2.payPerHour;
    return totalWage;
}

function allWagesFor(employee3){
    //accumulate the value of all dates worked by the employee in the record used as context. Amount should be returned as a number
    let dates = employee3.timeInEvents.map(obj => obj.date);
    console.log("dates array", dates)
    
    let payableWages = dates.reduce(
        (accumulator, date) => { return accumulator + wagesEarnedOnDate(employee3, date)
        }, 0);

        console.log("PAYABLE WAGES", payableWages);

        return payableWages;

    // return accumulateDates;
 
    

  
    // how can i use the return value of wagesearnedondate in the reducer
    // return employee3;
}

function calculatePayroll(employee4){
    console.log("EMPLOYEES", employee4);


    let payAllEmployees = employee4.reduce(
        (accumulator, employee) => { return accumulator + allWagesFor(employee)
        }, 0);


    return payAllEmployees;
}