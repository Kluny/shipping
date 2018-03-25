/**
 * Created by shannon on 2018-03-21.
 */
debug = false;


/**
 * 'stock cost' => item count * price point
 *
 * @param data
 * @return number
 */
function getStockCost(data) {
    var stockCost = Number(data['item_count']) * Number(data['price_point']);

    if(true === debug) {
        console.log('stockCost');
        console.log(stockCost);
    }
    return stockCost;
}

/**
 * 'capital' => 'cash' + 'loan'
 * @param data
 * @return number
 */
function getCapital(data) {
    var capital = ( Number(data['cash']) + Number(data['loan1']) );

    if(true === debug) {
        console.log('capital');
        console.log(capital);
    }
    return capital;
}

function getRequiredNet(data) {
    var requiredNet = getCapital(data) / 3;
    if(true === debug) {
        console.log('required net');
        console.log(requiredNet);
    }
    return requiredNet;
}

/**
 * 'gross' => cost * markup
 *
 * @param data
 * @return number
 */
function getGross(data) {
    var gross = getStockCost(data) + ( getStockCost(data) * ( Number(data['markup']) / 100 ) ) ;
    // $20,000 * 50%; == $20,000 * (50/100) == $30,000
    //if markup is 50%, that means gross is 1.5 times 500

    if(true === debug) {
        console.log('gross');
        console.log(gross);
    }
    return gross;
}


/**
 * 'insurance' => stock cost * insurance rate
 *
 * @param data
 */
function getInsurance(data) {
    var insurance = 0;

    insurance = getStockCost(data) * ( Number(data['insurance_rate']) / 100 );
    if(true === debug) {
        console.log('insurance');
        console.log(insurance);
    }
    return parseFloat(insurance.toPrecision());
}

/**
 * 'profit' =>  ( gross - ( fixed total - stock cost ) - ( stock cost * ( tax rate / 100 ) ) )
 * @param data
 * @return number
 */
function getProfit(data) {
    var profit = getGross(data) - getInsurance(data) - getFixedCost(data) - getStockCost(data) - getTax(data) ;
    if(true === debug) {
        console.log('profit');
        console.log(profit);
    }
    return profit;
}

/**
 * 'tax' => ( stock cost * ( tax rate / 100 ) )
 * @param data
 * @return number
 */
function getTax(data) {
    var tax = ( getStockCost(data) * ( Number(data['tax_rate']) / 100 ) );
    if(true === debug) {
        console.log('tax');
        console.log(tax);
    }
    return tax;
}

/**
 * 'total cost' => fixed cost + stock cost
 *
 * @param data
 * @return number
 */
function getTotalCost(data) {
    var totalCost = getFixedCost(data) + getStockCost(data);

    if(true === debug) {
        console.log('totalCost');
        console.log(totalCost);
    }
    return totalCost;
}

/**
 * Sum of all fixed costs
 *
 * @param data
 * @return number
 */
function getFixedCost(data) {
    var fixedCosts = 0;
    $('section.fixed-costs input').each(function() {
        fixedCosts = fixedCosts + Number(data[this.id]);
    });

    if(true === debug) {
        console.log('fixedCosts');
        console.log(fixedCosts);
    }
    return fixedCosts;
}

/**
 * Returns tuple list of fixed costs
 *
 * @param data
 * @returns array
 */
function listFixedCosts(data) {
    var listOfCosts = [];

    $('section.fixed-costs input').each(function() {
        listOfCosts.push( [ $("label[for='"+$(this).attr('id')+"']").text(), Number(data[this.id]) ] );
    });

    if(true === debug) {
        console.log('listOfCosts');
        console.log(listOfCosts);
    }

    return listOfCosts;
}

/**
 * Calls methods that do the calculations
 *
 * @param data
 */
function parse(data) {
    if(true === debug) {
        data = testData();
        test(data);
    }

    clear();

    $('#results').append(expenseTable(data));
    $('#results').append(inventoryTable(data));
    $('#results').append(summary(data));
}

/**
 * Clear current results tables.
 */
function clear(){
    var node = document.getElementById("results");
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    assign_defaults();

    document.getElementById('main_form').addEventListener('submit', function(){
        event.preventDefault();
        var data = { };
        $.each($(this).serializeArray(), function() {
            data[this.name] = this.value;
        });

        parse( data );

    }, false);
}, false);

function testData(){
    return {
        airfare: "1400",
        cash: "10000",
        everything_else: "1000",
        insurance_rate: "0.65",
        item_count: "200",
        loan1: "20000",
        loan_rate1: "4.5",
        markup: "100",
        price_point: "100",
        shipping_rate: "5800",
        tax_rate: "9"
    }
}

function test(data) {
    answers = {
        'getFixedCost': 8400,
        'getGross': 2550,
        'getProfit': -1300,
        'getStockCost': 500,
        'getTax': 450,
        'getTotalCost':  13400,
        'getCapital':  30000
    };

    console.log('Starting test...');
    console.log(data);
    console.log(answers);

    if( answers['getStockCost'] === getStockCost(data)) {
        console.log('pass');
    } else {
        console.log('FAIL');
    }

    if(answers['getGross'] === getGross(data)) {
        console.log('pass');
    } else {
        console.log('FAIL');
    }

    if(answers['getProfit'] === getProfit(data)) {
        console.log('pass');
    } else {
        console.log('FAIL');
    }

    if(answers['getTax'] === getTax(data)) {
        console.log('pass');
    } else {
        console.log('FAIL');
    }

    if(answers['getTotalCost'] === getTotalCost(data)) {
        console.log('pass');
    } else {
        console.log('FAIL');
    }

    if(answers['getFixedCost'] === getFixedCost(data)) {
        console.log('pass');
    } else {
        console.log('FAIL');
    }

    if(answers['getCapital'] === getCapital(data)) {
        console.log('pass');
    } else {
        console.log('FAIL');
    }

    listFixedCosts(data);

    console.log('End test.');
}
