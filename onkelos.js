function fixup_footnote(elem, href, name, counter) {
	elem.href = "#" + href + counter;
	elem.name = name + counter;
	elem.innerHTML = counter;
}

function number_footnotes() {
	var anchors = document.getElementsByTagName("a");
	var footnote_ref_counter = 0;
	var footnote_backref_counter = 0;

	for ( var i = 0; i < anchors.length; ++i) {
		var elem = anchors.item(i);
		if (elem.className == "footnote_ref") {
			fixup_footnote(elem, "fn", "fr", ++footnote_ref_counter);
		} else if (elem.className == "footnote_backref") {
			fixup_footnote(elem, "fr", "fn", ++footnote_backref_counter);
		}
	}
}

const unitsDigit = Array("", "\u05d0", "\u05d1", "\u05d2", "\u05d3", "\u05d4", "\u05d5", "\u05d6", "\u05d7", "\u05d8");
const tensDigit = Array("", "\u05d9", "\u05db", "\u05dc", "\u05de", "\u05e0", "\u05e1", "\u05e2", "\u05e4", "\u05e6");
const hundredsDigit = Array("", "\u05e7", "\u05e8", "\u05e9", "\u05ea");

function NumToHebrew(number)
{
	var temp = number;
	var result = "";

	while (temp > 400) {
		temp -= 400;
		result += hundredsDigit[4];
	}

	var hundreds = Math.trunc(temp / 100);
	if (hundreds) {
		temp -= hundreds * 100;
		result += hundredsDigit[hundreds];
	}

	if (temp == 15 || temp == 16) {
		temp -= 9;
		result += unitsDigit[9];
	} else {
		var tens = Math.trunc(temp /  10);
		if (tens) {
			temp -= tens * 10;
			result += tensDigit[tens];
		}
	}

	if (temp) {
		result += unitsDigit[temp];
	}

	return result;
}

function GenerateIndex(elementID, verses)
{
	var parentElement = document.getElementById(elementID);
	for (var i = 0; i < verses; ++i) {
		var verseNum = i + 1;
		var verseRef = "<a class=\"index\" href=\"#verse_" + verseNum + "\">" +
			NumToHebrew(verseNum) + "</a>";
		parentElement.innerHTML += verseRef;
    }
}