import admin from 'firebase-admin';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialisation de Firebase Admin
let db;
let isFirebaseInitialized = false;

try {
  // Charger la clé de service Firebase
  const serviceAccount = JSON.parse(
    readFileSync(join(__dirname, '../serviceAccountKey.json'), 'utf8')
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.FIREBASE_PROJECT_ID,
  });

  db = admin.firestore();
  isFirebaseInitialized = true;
  console.log('✅ Firebase initialisé avec succès');
  
} catch (error) {
  console.warn('⚠️  Firebase non configuré - Le serveur fonctionnera en mode dégradé');
  console.warn('⚠️  Pour activer Firebase, placez serviceAccountKey.json dans le dossier backend/');
}

/**
 * Sauvegarder une commande dans Firestore
 * @param {Object} orderData - Données de la commande
 * @returns {String} ID de la commande créée
 */
export async function saveOrder(orderData) {
  if (!isFirebaseInitialized) {
    console.warn('⚠️  Firebase non disponible - Commande non sauvegardée');
    return null;
  }
  
  try {
    const ordersRef = db.collection('orders');
    const docRef = await ordersRef.add({
      ...orderData,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'paid',
      deliveryStatus: 'pending',
    });

    console.log('✅ Commande sauvegardée:', docRef.id);
    return docRef.id;
    
  } catch (error) {
    console.error('❌ Erreur sauvegarde commande:', error.message);
    throw error;
  }
}

/**
 * Récupérer une commande par ID
 * @param {String} orderId - ID de la commande
 * @returns {Object} Données de la commande
 */
export async function getOrder(orderId) {
  if (!isFirebaseInitialized) {
    throw new Error('Firebase non configuré');
  }
  
  try {
    const doc = await db.collection('orders').doc(orderId).get();
    
    if (!doc.exists) {
      throw new Error('Commande introuvable');
    }
    
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error('❌ Erreur récupération commande:', error.message);
    throw error;
  }
}

/**
 * Mettre à jour le statut de livraison
 * @param {String} orderId - ID de la commande
 * @param {String} status - Nouveau statut (pending, sent, delivered)
 */
export async function updateDeliveryStatus(orderId, status) {
  if (!isFirebaseInitialized) {
    throw new Error('Firebase non configuré');
  }
  
  try {
    await db.collection('orders').doc(orderId).update({
      deliveryStatus: status,
      deliveredAt: status === 'delivered' ? admin.firestore.FieldValue.serverTimestamp() : null,
    });
    
    console.log(`✅ Statut de livraison mis à jour: ${orderId} → ${status}`);
  } catch (error) {
    console.error('❌ Erreur mise à jour statut:', error.message);
    throw error;
  }
}

/**
 * Sauvegarder les informations client
 * @param {Object} customerData - Données du client
 * @returns {String} ID du client
 */
export async function saveCustomer(customerData) {
  if (!isFirebaseInitialized) {
    console.warn('⚠️  Firebase non disponible - Client non sauvegardé');
    return null;
  }
  
  try {
    const customersRef = db.collection('customers');
    
    // Vérifier si le client existe déjà (par email)
    const existingCustomer = await customersRef
      .where('email', '==', customerData.email)
      .limit(1)
      .get();

    if (!existingCustomer.empty) {
      // Mettre à jour le client existant
      const docId = existingCustomer.docs[0].id;
      await customersRef.doc(docId).update({
        ...customerData,
        lastOrderAt: admin.firestore.FieldValue.serverTimestamp(),
        totalOrders: admin.firestore.FieldValue.increment(1),
      });
      return docId;
    } else {
      // Créer un nouveau client
      const docRef = await customersRef.add({
        ...customerData,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        totalOrders: 1,
      });
      return docRef.id;
    }
  } catch (error) {
    console.error('❌ Erreur sauvegarde client:', error.message);
    throw error;
  }
}

export { db };
export default admin;







