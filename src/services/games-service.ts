import { app } from '../config/firebase';
import { getFirestore, addDoc, collection, getDocs } from 'firebase/firestore';
import { Game } from '../interfaces/game';

const db = getFirestore(app);

export async function getGames() {
    try {
        const querySnapshot = await getDocs(collection(db, 'game'));
        const gamesData: Game[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const game = {
                name: data.name || '',
                consoleId: data.consoleId || '',
                regionId: data.regionId || '',
                countryId: data.countryId || '',
                genderId: data.genderId || '',
                companyId: data.companyId || '',
                description: data.description || '',
                image: data.image || '',
                amount: data.amount || 0,
                isFavorite: data.isFavorite || false,
                isHack: data.isHack || false,
                isPhysical: data.isPhysical || false,
                twoPlayers: data.twoPlayers || false
            };
            gamesData.push(game);
        });
        console.log('service',gamesData)
        return gamesData;
    } catch (error) {
        console.error('Error al obtener los games:', error);
        throw error;
    }
}

export async function addGame(gameData: Game) {
    try {
        const gamesCollection = collection(db, 'game');
        await addDoc(gamesCollection, gameData);
        console.log('Juego añadido con éxito');
    } catch (error) {
        console.error('Error al añadir el juego a Firebase:', error);
        throw error;
}
}