import express from 'express';
import { getOrder } from '../services/firebase.js';

const router = express.Router();

/**
 * GET /api/download/:orderId/:packId
 * Générer un lien de téléchargement sécurisé temporaire
 * 
 * NOTE: Cette route nécessite l'intégration avec AWS S3 ou Cloudinary
 * pour stocker et générer des liens signés temporaires.
 */
router.get('/:orderId/:packId', async (req, res) => {
  try {
    const { orderId, packId } = req.params;

    // Vérifier que la commande existe
    const order = await getOrder(orderId);

    if (!order) {
      return res.status(404).json({ 
        error: 'Commande introuvable' 
      });
    }

    // Vérifier que le pack fait partie de la commande
    const packInOrder = order.cart.find(item => 
      item.product?.id === packId || item.name?.includes(packId)
    );

    if (!packInOrder) {
      return res.status(403).json({ 
        error: 'Ce pack ne fait pas partie de votre commande' 
      });
    }

    // TODO: Générer un lien signédtemporaire avec AWS S3
    // const signedUrl = await generateS3SignedUrl(packId);
    
    // Pour l'instant, retourner un placeholder
    const downloadUrl = `https://votre-bucket-s3.amazonaws.com/packs/${packId}.wav?expires=48h`;

    res.json({
      success: true,
      downloadUrl,
      packName: packInOrder.name || packInOrder.product?.name,
      expiresIn: '48 hours',
      message: 'Lien de téléchargement généré avec succès'
    });

  } catch (error) {
    console.error('❌ Erreur génération lien:', error.message);
    res.status(500).json({ 
      error: 'Erreur lors de la génération du lien de téléchargement',
      message: error.message 
    });
  }
});

/**
 * Fonction à implémenter pour AWS S3
 * 
 * import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
 * import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
 * 
 * async function generateS3SignedUrl(packId) {
 *   const client = new S3Client({ region: "eu-west-3" });
 *   const command = new GetObjectCommand({
 *     Bucket: "ghost-remix-packs",
 *     Key: `${packId}.wav`,
 *   });
 *   
 *   const url = await getSignedUrl(client, command, { expiresIn: 172800 }); // 48h
 *   return url;
 * }
 */

export default router;







