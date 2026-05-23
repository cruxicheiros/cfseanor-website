function getUniqueEntries(arr) {
	var unique = [];
  
  for (var i=0; i<arr.length; i++) {
  	if (unique.indexOf(arr[i]) === -1) {
    	unique.push(arr[i]);
    }
  }
  
  return unique;
}

function validateUtf8(text) {
	var errorCharacters = [];
  
  for (var i=0; i<text.length; i+=1) {
  	if (split(text[i])[0] != 0) {
      if (errorCharacters.indexOf(text[i]) === -1) {
    		errorCharacters.push(text[i])
    	}
    }
  }
  
  if (errorCharacters.length === 1) {
  	throw Error("Character '" + errorCharacters[0] + "' requires more han one byte to be represented.");
  }
  
  if (errorCharacters.length) {
  	var quoted = errorCharacters.map(function(c) { return '"' + c + '"'});
  	var formatted = quoted.slice(0, -1).join(", ") + " and " + quoted.slice(-1);
        
  	throw Error("The characters " + formatted + " require more than one byte to be represented.");
  }
}

function utf8to16(text) {
	validateUtf8(text);

  if (text.length % 2) {
  	throw Error("Please enter an even number of characters.");
  }
  
	var utf16 = "";
  
	for (var i=0; i<text.length; i+=2) {
  	var value = text.charCodeAt(i);
    value = (value << 8) + text.charCodeAt(i + 1);
    utf16 = utf16 + String.fromCharCode(value)
  }
  
  return utf16
}

function utf16to8(text) {
	var utf8 = "";
  
	for (var i=0; i<text.length; i++) {
  	var characters = split(text[i]);
    
    utf8 = utf8 + String.fromCharCode(characters[0], characters[1]);
  }
  
  return utf8
}

function split(character) {
  	var value = character.charCodeAt(0);
    var mask = 255;
    
    return [value >> 8, value & mask];
}


function bindFunctions() {  
  document.getElementById("bake").addEventListener('click', function () {
    try {
      document.getElementById("error-box").innerText = "";
      document.getElementById("output").value = utf8to16(document.getElementById("input").value)
    } catch (e) {
      document.getElementById("error-box").innerText = e;
    }	
  });
  
  document.getElementById("unbake").addEventListener('click', function () {
    document.getElementById("error-box").innerText = "";
  	document.getElementById("output").value = utf16to8(document.getElementById("input").value)
  });
  
  document.getElementById("input").addEventListener('input', function () {
  	var length = document.getElementById("input").value.length;
   	
    if (length === 1) {
    	document.getElementById('char-count').innerText = length + " character";
    } else {
      document.getElementById('char-count').innerText = length + " characters";
    }
  });
}

