const mailToJustin = 'mailto:justinchen3946@gmail.com?Subject=Email%20Justin!';
const gitJustin = 'https://github.com/ComradeDiamond';

const initialize = () => {
	//Insert display
	displayJSON = {
	}
}

const getClipboard = (navigator) => new Promise((resolve, reject) => {
	let clipboard = navigator.clipboard.readText();

	clipboard.then((text) => resolve(text));
	clipboard.catch((err) => reject(""));
});


function seal(doIWipe) //Justin's blockfile presets #dank
{

	let tempLabel = document.createElement("div");
	tempLabel.style.textAlign = "center";
	
	let tempSubLabel = document.createElement("span");
	tempSubLabel.textContent = cardLabel.value;
	tempSubLabel.style.fontFamily = "georgia"; //we could abstract these Georgia, but it's the same amt of work anyways
	tempSubLabel.style.fontSize = "18pt";
	tempSubLabel.style.backgroundColor = "#f0dbaa";
	tempSubLabel.style.textDecoration = "underline";
	tempSubLabel.style.fontWeight = "bold";
	tempLabel.appendChild(tempSubLabel);

	let tempAuthor = document.createElement("div");

	let tempLink = document.createElement("a");
	tempLink.href = cardLink.value
	tempLink.target = "_blank";
	tempLink.textContent = authorTag.value;
	tempLink.style.fontFamily = "georgia";
	tempLink.style.color = "#00a2ff";
	tempLink.style.fontSize = "12pt";
	tempLink.style.fontWeight = "bold";
	tempLink.style.textDecoration = "none";
	tempAuthor.appendChild(tempLink);

	let tempDescription = document.createElement("div");
	tempDescription.textContent = cardDescription.value;
	tempDescription.style.fontFamily = "georgia"
	tempDescription.style.color = "green";
	tempDescription.style.fontStyle = "italic";
	tempDescription.style.fontSize = "12pt";

	let tempPaste = document.createElement("div");
	tempPaste.innerText = inputForm.pasteBox.value;
	tempPaste.style.fontFamily = "georgia";
	tempPaste.style.fontSize = "12pt"
	
	//Tempdescription goes after
	styleForm.descriptionPosition.value = "after";

	display(tempLabel, tempAuthor, tempDescription, tempPaste, doIWipe);
}
function mla(doIWipe)
{
	let tempLabel = document.createElement("span");
	tempLabel.innerText = cardLabel.value;
	tempLabel.style.fontFamily = "Times New Roman"; //We could literally abstract all this but it's the same line length
	tempLabel.style.fontSize = "14pt";
	tempLabel.style.fontWeight = "bold";
	tempLabel.style.textDecoration = "underline";

	let tempAuthor = document.createElement("a");
	tempAuthor.href = cardLink.value;
	tempAuthor.style.fontFamily = "Times New Roman";
	tempAuthor.style.fontSize = "12pt";
	tempAuthor.style.fontWeight = "bold";
	tempAuthor.innerText = authorTag.value;

	let tempDescription = document.createElement("div");
	tempDescription.innerText = cardDescription.value;
	tempDescription.style.fontFamily = "Times New Roman";
	tempDescription.style.fontSize = "12pt";

	let tempPaste = document.createElement("div");
	tempPaste.innerText = inputForm.pasteBox.value;
	tempPaste.style.fontFamily = "Times New Roman";
	tempPaste.style.fontSize = "12pt";
	styleForm.descriptionPosition.value = "before";

	display(tempLabel, tempAuthor, tempDescription, tempPaste, doIWipe);
}
function bulletBoard(doIWipe)
{
	let tempList = document.createElement("ul");

	let tempLabel = document.createElement("li");
	//We're doing a no-no and making this innerHTML, but it doesn't matter because I'm lazy
	//Yes I know making it innerHTML is very brainlet because code injection hacks are a thing
	tempLabel.innerHTML = `${cardLabel.value} - <a href=${cardLink.value} style="text-decoration: none;" target="_blank">${authorTag.value}</a>`;
	tempLabel.style.fontFamily = styleForm.fontFamily.value;
	tempLabel.style.fontSize = "18pt";
	tempList.appendChild(tempLabel);

	let tempPaste = document.createElement("li");
	tempPaste.innerText = inputForm.pasteBox.value;
	tempPaste.style.fontFamily = styleForm.fontFamily.value;
	tempPaste.style.fontSize = "14pt";
	tempPaste.style.marginLeft = "2%";

	let tempDescription = document.createElement("li");
	tempDescription.innerText = cardDescription.value;
	tempDescription.style.fontFamily = styleForm.fontFamily.value;
	tempDescription.style.fontSize = "14pt";
	tempDescription.style.color = "green";
	tempDescription.style.marginLeft = "2%";

	tempLabel.appendChild(tempDescription);
	tempLabel.appendChild(tempPaste);

	outputDiv.appendChild(tempList);

	if (doIWipe)
	{
		authorTag.value = "";
		cardLabel.value = "";
		cardDescription.value = "";
		cardLink.value = "";
		inputForm.pasteBox.value = "";
	}
}
function generate(doIWipe) //A clusterfuck of code - will try to comment
{
	let switchBoolean = false;
	outputDiv.innerHTML = ""; //Resets outputDiv

	/* Unused code - patched by changing textContent to innerText. Trade the span detection for newline detection.
	Extra spacing is irrelevant because this is an article, so for the purposes of card cutting we're yeeting that out the window

	pastedText = inputForm.pasteBox.value.replace(/ /ig, " ");
	pastedText = pastedText.replace(/\n/ig, "\n");
	console.log(pastedText);*/

	//If there are certain presets, abide by those presets and return the rest
	switch(styleForm.presets.value) 
	{
		case "seal":
			seal(doIWipe);
			switchBoolean = true;
		break;

		case "none":
		break;

		case "bulletBoard":
			bulletBoard(doIWipe);
			switchBoolean = true;
		break;

		case "mla":
			mla(doIWipe);
			switchBoolean = true;
		break;

		case "blockfile":
			blockfile(doIWipe);
			switchBoolean = true;
		break;

		default:
			console.log("There is an error: please contact Justin to see what went wrong");
			switchBoolean = true;
	}

	if (switchBoolean) //If the presets have been applied, just yeet the rest of the code.
	{
		return;
	}

	let tempLabel = document.createElement("span");
	tempLabel.textContent = cardLabel.value;
	tempLabel.style.fontFamily = styleForm.fontFamily.value;
	if ((styleForm.labelSize.value <= 0) || (styleForm.labelSize.value > 48))
	{
		alert("Bruh stop trying to break the code this thing isn't made by Wix");
		tempLabel.style.fontSize = "12pt";
	}
	else
	{
		tempLabel.style.fontSize = styleForm.labelSize.value + "pt";
	}
	tempLabel.fontFamily = styleForm.fontFamily;
	if (styleForm.highlightEnter.value != "")
	{
		try
		{
			tempLabel.style.backgroundColor = styleForm.highlightEnter.value;
		}
		catch
		{
			alert("yea you don't know what you're doing");
			tempLabel.style.backgroundColor = styleForm.labelHighlight.value;
		}
	}
	else
	{
		tempLabel.style.backgroundColor = styleForm.labelHighlight.value;
	}
	tempLabel.appendChild(document.createElement("br"));

	let tempAuthor = document.createElement("a");
	tempAuthor.href = cardLink.value;
	tempAuthor.target = "_blank";
	tempAuthor.textDecoration = "none";
	tempAuthor.textContent = authorTag.value;
	tempAuthor.style.fontFamily = styleForm.fontFamily.value;
	if (styleForm.authorTagEnter.value != "")
	{
		try
		{
			tempAuthor.style.color = styleForm.authorTagEnter.value;
		}
		catch
		{
			alert("yea you don't know what you're doing");
			tempAuthor.style.color = styleForm.authorTagColor.value;
		}
	}
	else
	{
		tempAuthor.style.color = styleForm.authorTagColor.value;
	}
	if ((styleForm.size.value <= 0) && (styleForm.size.value > 36))
	{
		alert("IDK, it's not Wix.com. Your font size doesn't exist in the select limitations");
		tempSize = "12pt"
	}
	else
	{
		tempSize = styleForm.size.value + "pt";
	}
	tempAuthor.style.fontSize = tempSize; //Nope we're not messing with shorthand in the backend
	if (styleForm.authorTagCustomization.value == "italics")
	{
		tempAuthor.style.fontStyle = "italic";
	}
	else if (styleForm.authorTagCustomization.value == "underline")
	{
		tempAuthor.style.textDecoration = "underline";
	}
	else if (styleForm.authorTagCustomization.value == "bold")
	{
		tempAuthor.style.fontWeight = "bold";
	}
	//The none option automatically returns

	let tempDescription = document.createElement("div");
	tempDescription.textContent = cardDescription.value;
	tempDescription.style.fontFamily = styleForm.fontFamily.value;
	tempDescription.style.color = styleForm.descriptionTagColor.value;
	//Sets bold italics and what not because I'm not sitting here and dealing with shorthand
	if (styleForm.descriptionCustomization.value == "italics")
	{
		tempDescription.style.fontStyle = "italic";
	}
	else if (styleForm.descriptionCustomization.value == "underline")
	{
		tempDescription.style.textDecoration = "underline";
	}
	else if (styleForm.descriptionCustomization.value == "bold")
	{
		tempDescription.style.fontWeight = "bold";
	}
	if ((styleForm.size.value <= 0) && (styleForm.size.value > 36))
	{
		tempDescription.style.fontSize = "12pt"
	}
	else
	{
		tempDescription.style.fontSize = styleForm.size.value + "pt";
	}

	let tempPaste = document.createElement("div");
	tempPaste.innerText = inputForm.pasteBox.value;
	tempPaste.style.fontFamily = styleForm.fontFamily.value;
	if ((styleForm.size.value <= 0) && (styleForm.size.value > 36))
	{
		tempPaste.style.fontSize = "12pt"
	}
	else
	{
		tempPaste.style.fontSize = styleForm.size.value + "pt";
	}

	display(tempLabel, tempAuthor, tempDescription, tempPaste, doIWipe);
}
async function blockfile(doIWipe) 
{
	//Date
	let date = new Date();
	
	let tempName = document.createElement("div");
	tempName.innerText = `${nameJS.value} ${date.getMonth() + 1}/${date.getDate()}`;
	tempName.style.fontFamily = "Arial"; //We could literally abstract all this but it's the same line length
	tempName.style.fontSize = "11pt";
	tempName.style.fontWeight = "bold";
	tempName.style.textDecoration = "underline";
	tempName.appendChild(document.createElement("br"));
	tempName.appendChild(document.createElement("br"));

	let tempAuthor = document.createElement("a");
	tempAuthor.href = cardLink.value;
	tempAuthor.style.fontFamily = "Arial";
	tempAuthor.style.fontSize = "11pt";
	tempAuthor.style.textDecoration = "underline";
	tempAuthor.style.textDecorationColor = "cornflowerblue";
	tempAuthor.style.color = "cornflowerblue";
	tempAuthor.innerText = cardLink.value;
	tempAuthor.appendChild(document.createElement("br"));

	let tempDescription = document.createElement("div");
	tempDescription.innerText = cardDescription.value;
	tempDescription.style.fontFamily = "Arial";
	tempDescription.style.fontSize = "11pt";

	let tempPaste = document.createElement("div");
	//tempPaste.innerText = inputForm.pasteBox.value;
	tempPaste.style.fontFamily = "Arial";
	tempPaste.style.fontSize = "11pt";

	//HTML DOM Mental Gymnastics because you can't trust people not to mess with SQL Injection Hacks lmao
	var createHighlight = function(text, isHighlighted) {
		let tempThingy = document.createElement("span");
		tempThingy.innerText = text;
		tempThingy.style.fontFamily = "Arial";
		tempThingy.style.fontSize = "11pt";

		if (isHighlighted)
		{
			tempThingy.style.backgroundColor = `rgba(33, 252, 88, 0.8)`;
			tempThingy.style.fontWeight = "bold";
		}
		tempPaste.appendChild(tempThingy);
	}

	let pasteArray = inputForm.pasteBox.value.split("\\");

	//Due to some wack math nature of sandwiched arrays, only the odd intervals will need to be highlighted
	//IDK, ask someone in that math team class because software engineers hate math with a passion
	//That's why computers were invented

	var tempBoolean = false;
	for (var c=0; c<pasteArray.length; c++)
	{
		createHighlight(pasteArray[c], tempBoolean);
		tempBoolean = !tempBoolean;
	}
	
	tempPaste.appendChild(document.createElement("br"));
	tempPaste.appendChild(document.createElement("br"));
	styleForm.descriptionPosition.value = "after";

	display(tempName, tempAuthor, tempDescription, tempPaste, doIWipe);
}
function display(tempLabel, tempAuthor, tempDescription, tempPaste, doIWipe) //Literally just copy this
{
	outputDiv.appendChild(tempLabel);
	outputDiv.appendChild(tempAuthor);

	if (styleForm.descriptionPosition.value == "before")
	{
		outputDiv.appendChild(tempDescription);
		outputDiv.appendChild(tempPaste);
	}
	else
	{
		outputDiv.appendChild(tempPaste);
		outputDiv.appendChild(tempDescription);
	}

	if (doIWipe)
	{
		nameJS.value = "";
		authorTag.value = "";
		cardLabel.value = "";
		cardDescription.value = "";
		cardLink.value = "";
		inputForm.pasteBox.value = "";
	}

	document.querySelector("section").style.height = (document.body.scrollHeight + 50) + "px";	
}
function asyncQuerySwap(htmlElement) //Swap the inputs
{
	if (swappedBoolean) //This will always run when blockfile is switched out
	{
		nameJS.style.display = "none";
		nameOut.style.display = "none";
		cardLabel.style.display = "inline-block";
		cardLabelBoxOut.style.display = "inline-block";

		inputForm.children[0].placeholder = "Your paste goes here!"

		swappedBoolean = false;
	}
	else
	{
		if (htmlElement.presets.value == "blockfile") //maybe add some animations
		{
			nameJS.style.display = "inline-block";
			nameOut.style.display = "inline-block";
			cardLabel.style.display = "none";
			cardLabelBoxOut.style.display = "none";

			inputForm.children[0].placeholder = "Your paste goes here! Use \\ around what you want to highlight!"
			
			swappedBoolean = true;
		}
	}
}