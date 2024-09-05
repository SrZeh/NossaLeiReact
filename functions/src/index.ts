/** @format */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.updateNoticias = functions.https.onRequest(async (req: any, res: any) => {
	try {
		const response = await fetch("http://servicodados.ibge.gov.br/api/v3/noticias/?tipo=noticia&qtd=8&destaque=1&de=01-01-2022");
		const data = await response.json();

		// Limit to first 10 items (optional)
		if (data.items.length > 10) {
			data.items = data.items.slice(0, 10);
		}

		// Store limited data in Firestore
		for (const item of data.items) {
			const limitedNoticia = {
				titulo: item.titulo,
				introducao: item.introducao,
				link: item.link,
			};
			await db.collection("noticias").doc(item.id).set(limitedNoticia, { merge: true }); // Use item.id for unique document IDs
		}

		console.log("Successfully updated noticia in Firestore");
		res.status(200).send("Noticias updated successfully!"); // Send a response
	} catch (error) {
		console.error("Error:", error);
		res.status(500).send("Error updating noticias"); // Send an error response
	}
});
