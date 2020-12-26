customizations = {
	presets: "none",
	font: "Times New Roman",
	cardSize: "12pt",
	highlightColor: "None",
	linkColor: "Black",
	linkCustom: "None",
	descriptionColor: "Black",
	descriptionPosition: "None",
	tagColor: "Black",
	tagAlign: "Left",
	tagSize: "12pt",
	tagCustomization: "None"
};

//We'll use this + JSON bracket notation to later modify these things
//hmm looks like it's going to be impossible to do functional programming unless we want 
//to store everything in the frontend
//Parallel array to the indexHTML order and customizations JSON
const customizationNames = [
	"presets", 
	"font", 
	"cardSize", 
	"highlightColor", 
	"linkColor", 
	"linkCustom",
	"descriptionColor",
	"descriptionPosition",
	"tagColor",
	"tagAlign",
	"tagSize",
	"tagCustomization"
];

function initialize(document)
{
	custArr = Array.from(document.getElementsByClassName("flexCard"));
	//Adds an event listener to each array and update all of their customizations
	custArr.forEach((el, idx) => {
		el.addEventListener("click", () => {
			mdcDisplay(this, idx, document);
		});
		el.querySelector(".flexVal").innerText = customizations[customizationNames[idx]];
	});
}

const mdcDisplay = (el, idx, document) => {
	//Stops scrolling
	document.body.style.overflowY = "hidden";

	//Inits the dom object. divItem is parallel to the corresponding custNames array
	const tempWrap = document.getElementById("invisFormHTML");
	const divItem = tempWrap.children[idx];

	tempWrap.style.visibility = "visible";
	divItem.style.display = "block";

	//Animation
	tempWrap.classList.add("fadeBlackIn");
	divItem.classList.add("zoomIn");

	//Add btn action - loose type saves lives :P
	//The eAdded short circuiting prevents multiple event listeners from stacking
	//!str == bool
	!!divItem.eAdded || divItem.querySelector("img").addEventListener("click", () => {
		mdcDisplaynt(document, tempWrap, divItem, idx);
	})
}

//If regularn't means former regular
//Staffn't means former staff
//Displayn't is next lmao
const mdcDisplaynt = (document, tempWrap, divItem, idx) => {

	//Animations
	tempWrap.classList.add("fadeBlackOut");
	tempWrap.classList.remove("fadeBlackIn");

	divItem.classList.add("zoomOut");
	divItem.classList.remove("zoomIn");

	let customizationVal = divItem.querySelector(".modalSelect").value;

	customizations[customizationNames[idx]] = customizationVal;
	custArr[idx].querySelector(".flexVal").innerText = customizationVal;

	//Async clear elements and stuff after it ends
	setTimeout(() => {
		document.body.style.overflowY = "auto";

		divItem.classList.remove("zoomOut");
		divItem.style.display = "none";

		tempWrap.classList.remove("fadeBlackOut");
		tempWrap.style.visibility = "hidden";
	}, 1000);
}