'use strict';

/* Manages operations on the ticker table */
class TableManager {
	/* removes all rows that don't have the tickers in the filter text box */
	static filter_table(table_id, filter_tickers_id, ticker_column_index) {
		// arg: table_id: id of the table to be filtered
		// arg: filter_tickers_id: id of the text input that contains tickers
		// arg: ticker_column_index: index of the colun with the tickers
		let checker = new InputVerifier();
		let user_input_tickers = document.getElementById(filter_tickers_id).value.toLowerCase();
		user_input_tickers = checker.remove_whitespace(user_input_tickers);		
		if (checker.contains_disallowed_chars(user_input_tickers)) {
			alert("Invalid character input: please only use letters, numbers, dashes, dots, and underscores.");
			return;
		}
		user_input_tickers = user_input_tickers.split(",");
		let tbl = document.getElementById(table_id);
		let rowNum = 1  // first row, index zero, has column headers
		let table_ticker = "";
		while (rowNum < tbl.rows.length){
			table_ticker = tbl.rows[rowNum].cells[ticker_column_index].innerHTML.trim().toLowerCase();
			let found = false;
			if (user_input_tickers.indexOf(table_ticker) > -1) { found = true;}
			if (!found){ tbl.deleteRow(rowNum);}
			else{ rowNum += 1;}
		}
	}

	/* Adds listener for Enter being hit inside ticker text box */
	add_ticker_filter_listener(table_id, filter_tickers_id, ticker_column_index) {
		// arg: table_id: id of the table to be filtered
		// arg: filter_tickers_id: id of the text input that contains tickers
		// arg: ticker_column_index: index of the colun with the tickers
		let ticker_txtbox = window.document.getElementById(filter_tickers_id);
		ticker_txtbox.addEventListener('keypress', (event) => {
			if (event.keyCode == 13) {  // 'Enter' key
				TableManager.filter_table(table_id, filter_tickers_id, ticker_column_index);
			}
		}, false);
	}
	
	/* Bubble sort the given table by the given column */
	static sort_table(table_id, column_index) {
		// Do not sort if there are more than 300 rows
		// as this may cause the browser to hang
		// arg: table_id: identifier of the table to sort
		// arg: column_index: column
		const ROW_LIMIT = 300;
		let table, rows, switching, i, x, y, shouldSwitch, desc;
		table = document.getElementById(table_id);
		switching = true;
		// if first row > last row, then sort ascending
		// otherwise sort descending
		rows = table.getElementsByTagName("TR")
		if (rows.length > ROW_LIMIT) {
			alert("Please filter to fewer than 300 tickers before sorting");
			return;
		}
		if (rows.length > 2) { // need at least 1 header row and 2 data rows
			x = rows[1].getElementsByTagName("TD")[column_index];
			y = rows[rows.length-1].getElementsByTagName("TD")[column_index];
			if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) { desc = false; }
			else { desc = true; }
		}
		else { return; }
		while (switching) {
			switching = false;
			rows = table.getElementsByTagName("TR");
			// skip index zero row, which has table headers
			for (i = 1; i < (rows.length - 1); i++) {
				shouldSwitch = false;
				// compare current and next rows
				x = rows[i].getElementsByTagName("TD")[column_index];
				y = rows[i + 1].getElementsByTagName("TD")[column_index];
				if (!desc && x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
					shouldSwitch= true;
					break;
				}
				else if (desc && x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
					shouldSwitch= true;
					break;
				}
			}
			if (shouldSwitch) {
				rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
				switching = true;
			}
		}
	}
	
	/* Scale sentiment from -1-0-+1, 0.2-5, or other range to 1-5 range */
	static scale_sentiment(table_id, col_index, invert=false) {
		// arg: table_id: identifier of table to scale
		// arg: col_index: index of sentiment column
		// arg: invert: if True, use 1/num instead of num
		//      this is for flipping a range from a-b to b-a
		let tbl = document.getElementById(table_id);
		let len = tbl.rows.length;
		let min = 9999999;
		let max = -9999999;
		for (let i=1; i<len; i++) {
			let num = parseFloat(tbl.rows[i].cells[col_index].innerHTML);
			if (num > max) { max = num; }
			if (num < min) { min = num; }
		}
		let multiplier = (5-1) / (max - min);
		let step = 1 - min * multiplier;
		for (let i=1; i<len; i++) {
			let num = parseFloat(tbl.rows[i].cells[col_index].innerHTML);
			let scaled_num = num * multiplier + step;
			if (invert) { scaled_num = 5 / scaled_num; }
			tbl.rows[i].cells[col_index].innerHTML = scaled_num.toFixed(2);
		}
	}
	
	/* Rounds the given table's column to two decimal places */
	static round_table_nums(table_id, col_index) {
		let tbl = document.getElementById(table_id);
		let len = tbl.rows.length;
		for (let i=1; i<len; i++) {
			let num = parseFloat(tbl.rows[i].cells[col_index].innerHTML);
			tbl.rows[i].cells[col_index].innerHTML = num.toFixed(2);
		}
	}
	
	/* Adds an additional row to the table with an emoji */
	static add_emojis(table_id, col_index) {
		// arg: table_id: identifier of table to add emoji to
		// arg: col_index: index of sentiment column to use to
		//      determine which emoji to add
		let tbl = document.getElementById(table_id);
		let len = tbl.rows.length;
		for (let i=1; i<len; i++) {
			let sentiment = parseFloat(tbl.rows[i].cells[col_index].innerHTML);
			let new_cell = tbl.rows[i].insertCell(-1);
			let img_source = ""
			if (sentiment < 2.0) { img_source = "images/mood_1.jpg"; }
			else if (sentiment < 3.0) { img_source = "images/mood_2.jpg"; }
			else if (sentiment < 4.0) { img_source = "images/mood_3.jpg"; }
			else if (sentiment < 5.0) { img_source = "images/mood_4.jpg"; }
			else { img_source = "images/mood_5.jpg"; }
			let src_str = '<img src="' + img_source + '" alt="emoji" class="mood"></img>';
			new_cell.innerHTML = src_str;
		}
	}
}


/* Verifies user input */
class InputVerifier {
	// return true if bad characters exist, false otherwise
	contains_disallowed_chars(str) {
		if (str == null || str == undefined || '' === str) { return false; }
		else { return -1 !== str.search(/[^\^0-9a-zA-Z,\._\-]/); }
	}
	
	remove_whitespace(str) {
		return str.replace(/\s/g, '');
	}
}
