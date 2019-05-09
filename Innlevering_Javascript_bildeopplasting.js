// JavaScript Document
//Bildeopplasting
// HTML-elementer
const inpFil = document.querySelector("#inpFil");
const inpTekst = document.querySelector("#inpTekst");
const skjema_2 = document.querySelector("#skjema_2");
const overlay = document.querySelector("#overlay");
const main = document.querySelector(".main2");
const sokefelt = document.getElementById("sokefelt");
            var soketekst ="";

// Firebase
const db = firebase.database();
const storage = firebase.storage();
const bloggen = db.ref("bloggen");

// Sokefelt
sokefelt.oninput = sok;
            function sok () {
                soketekst=sokefelt.value;
				visUtvalg();
            };

// Funksjon som lagrer bilde i databasen
function lagreBilde(evt) {
	evt.preventDefault();

	// Viser overlay
	overlay.style.display = "flex";

	// Bilde som skal lastes opp
	const bilde = inpFil.files[0];

	// Hvor skal vi lagre bildet
	const lagringsplass = storage.ref("bloggbilder/" + (new Date() ) + bilde.name);

	// Vi laster opp bildet til storage
	lagringsplass.put(bilde)
		.then( bilde => bilde.ref.getDownloadURL() )
		.then( url => {
		bloggen.push({
			url: url,
			tekst: inpTekst.value
		});
		skjema_2.reset();
		overlay.style.display = "none";
	} );
}

function visUtvalg() {
                main.innerHTML = " ";
                bloggen
                    .orderByChild("tekst")
                    .startAt(soketekst)
                    .endAt(soketekst + '\uf8ff')
                    .on("child_added", visBilde);
            }

function visBilde(snap) {
	const key = snap.key;
	const data = snap.val();
	main.innerHTML = `
		<article>
		<img src="${data.url}">
		<p>${data.tekst}</p>
		</article>
	` + main.innerHTML;
}

// Event Listeners
skjema_2.addEventListener("submit", lagreBilde);
bloggen.on("child_added", visBilde);