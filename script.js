// Import des fonctions Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase.app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

// Votre configuration Firebase fournie
const firebaseConfig = {
    apiKey: "AIzaSyApk1QOLqPKRDqoU7GyegFcnwTRK5q6eAo",
    authDomain: "macro-photos-7390a.firebaseapp.com",
    projectId: "macro-photos-7390a",
    storageBucket: "macro-photos-7390a.firebasestorage.app",
    messagingSenderId: "799361840451",
    appId: "1:799361840451:web:89c21e45258aa24dc82bf6",
    measurementId: "G-J8432MEDBX"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Logique de gestion des images (1cm, 5cm, 10cm)
let currentAttempt = 1; // 1 = 10cm, 2 = 5cm, 3 = 1cm
let playerScore = 0;

function setupImageUpload(id, imgId) {
    const input = document.getElementById(id);
    const img = document.getElementById(imgId);
    
    input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                img.src = event.target.result;
                img.style.display = 'block';
                input.style.display = 'none'; // Cache l'input une fois chargé
            }
            reader.readAsDataURL(file);
        }
    });
}

setupImageUpload('file-1', 'img-1');
setupImageUpload('file-5', 'img-5');
setupImageUpload('file-10', 'img-10');

// Simulation du système de score et de devinette
document.getElementById('submit-guess-btn').addEventListener('click', () => {
    const guess = document.getElementById('guess-input').value.trim().toLowerCase();
    const message = document.getElementById('game-message');
    
    // Exemple de réponse correcte fixée à "trombone" pour le test
    const correctAnswers = ["trombone", "cle", "stylo"];
    
    if (correctAnswers.includes(guess)) {
        let pointsEarned = 0;
        // 3 points si trouvé rapidement (ou selon l'indice), système simplifié ici
        pointsEarned = 3; 
        playerScore += pointsEarned;
        document.getElementById('player-score').textContent = playerScore;
        message.style.color = "#4ade80";
        message.textContent = `Bravo ! C'est gagné, vous remportez ${pointsEarned} points !`;
    } else {
        message.style.color = "#f87171";
        message.textContent = "Ce n'est pas ça, essayez encore ou révélez l'indice suivant !";
    }
});
