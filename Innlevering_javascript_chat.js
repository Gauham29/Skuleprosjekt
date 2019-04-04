// JavaScript Document
//Chat
let database = firebase.database(); 
let meldinger = database.ref("meldinger"); 
let skjema = document. getElementById("skjema"); 
let inpAvsender = document. getElementById("inpAvsender"); 
let inpMening = document. getElementById("inpMening"); 
let txtMeldinger = document. getElementById("txtMeldinger"); 
function visMelding(snapshot) { 
	let melding = snapshot.val(); 
	let meldingTekst = `<p>
		<b>${melding.avsender}: </b>
		<i>${melding.tekst}</i> 
	</p>`; 
	txtMeldinger.innerHTML = txtMeldinger. 
	innerHTML + meldingTekst; 
} 
function regNyMelding(evt) { 
	evt.preventDefault(); 
	var nyMelding = { 
		avsender: inpAvsender.value, 
		tekst: inpMening.value 
	}; 
	meldinger.push(nyMelding); 
	inpMening.value = " "; 
} meldinger.on("child_added", visMelding); 
skjema.onsubmit = regNyMelding;