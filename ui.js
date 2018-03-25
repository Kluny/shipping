/**
 * Assign some default values so I don't have to type as much.
 */
function assign_defaults() {
    /* fixed defaults */

    var shipping_rate = 5800;
    var airfare = 1400;
    var tax_rate = 9;
    var insurance_rate = 0.65;
    var everything_else = 1000;
    var cash = 10000;
    var loan1 = 20000;
    var loan_rate1 = 4.5;
    var price_point = 100;
    var markup = 100;
    var item_count = 200;

    /* projection defaults */

    document.getElementById('price_point').value = price_point;
    document.getElementById('markup').value = markup;
    document.getElementById('item_count').value = item_count;

    document.getElementById('shipping_rate').value = shipping_rate;
    document.getElementById('airfare').value = airfare;
    document.getElementById('tax_rate').value = tax_rate;
    document.getElementById('insurance_rate').value = insurance_rate;
    document.getElementById('everything_else').value = everything_else;

    document.getElementById('cash').value = cash;
    document.getElementById('loan1').value = loan1;
    document.getElementById('loan_rate1').value = loan_rate1;

}

function expenseTable(data) {
    console.log("here!");
    console.log(data);
    //create and return a table of expenses
    var table = document.createElement('table');
    var tbody = document.createElement('tbody');

    var items = listFixedCosts(data);
    items.unshift( [ 'Expense', 'Amount' ] );
    items.push( [ 'Total: ', getFixedCost(data) ]);

    var firstRow = true;
    items.forEach(function (item) {
        var tr = document.createElement('tr');
        item.forEach(function (cell) {
            if(firstRow) {
                var tdh = document.createElement('th');
            } else {
                var tdh = document.createElement('td');
            }
            tdh.appendChild(document.createTextNode(cell));
            tr.appendChild(tdh);
        });
        firstRow = false;
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    return table;
}

function inventoryTable(data) {
    var items = []

    items.push(
           [ 'item_count', "Item Count", data['item_count']],
           [ 'price_point', "Price Point", "$" + data['price_point']],
           [ 'markup', "Markup", data['markup'] + "%" ],
           [ 'stock_cost', "Stock Cost", "$" + getStockCost(data)],
           [ 'tax', "Import Tax", "$" + getTax(data)],
           [ 'insurance', "Freight Insurance", "$" + getInsurance(data)],
           [ 'gross_cad', "Gross CAD", "$" + getGross(data)]
    );

    var table = document.createElement('table');
    var tbody = document.createElement('tbody');

    var headingRow = document.createElement('tr');
    var bodyRow = document.createElement('tr');

    items.forEach(function (cell) {
        var th = document.createElement('th');
        var td = document.createElement('td');
        th.appendChild(document.createTextNode(cell[1]));
        td.appendChild(document.createTextNode(cell[2]));
        headingRow.appendChild(th);
        bodyRow.appendChild(td);
    });

    tbody.appendChild(headingRow);
    tbody.appendChild(bodyRow);
    table.appendChild(tbody);
    return table;
}

function summary(data) {

    console.log(data);
    var summary = document.createElement('div') ;
    var heading = document.createElement('h2');
    heading.appendChild(document.createTextNode("Summary"));
    summary.appendChild(heading);

    var paragraphs = [];
    paragraphs.push(
        "Total cost: fixed + stock",
        nf(getFixedCost(data)) + " + " + nf(getStockCost(data)) + " = " + nf(getTotalCost(data)) + " of " + nf(getCapital(data)),
        "Net: gross = ( stock + fixed ) - tax - insurance",
        "" + nf(getGross(data))+ " - (" + nf(getStockCost(data)) + " + " + nf(getFixedCost(data)) +") - " + nf(getTax(data)) + " - " + nf(getInsurance(data)),
        "I want a 1/3 return on my investment, so " + nf(getCapital(data)) + " / 3 = " + nf(getRequiredNet(data)),
        "Net: " + nf(getProfit(data)) + " of " + nf(getRequiredNet(data))
    );

    paragraphs.forEach(function(para) {
        var p = document.createElement('p');
        p.appendChild(document.createTextNode(para));
        summary.appendChild(p);
    });

    return summary;

}

function nf(n){
    n = new Intl.NumberFormat().format(n);
    return "$" + n;
}
