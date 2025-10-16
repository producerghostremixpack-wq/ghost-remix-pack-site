import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-secondary font-poppins px-8 py-20">
      {/* Bouton retour */}
      <div className="max-w-4xl mx-auto mb-8">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-neon-violet hover:text-glow-violet transition-all duration-300"
        >
          <ArrowLeft size={20} />
          <span>Retour à l'accueil</span>
        </a>
      </div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-text-primary mb-10 text-center"
      >
        Mentions légales & Conditions générales de vente
      </motion.h1>

      <div className="max-w-4xl mx-auto space-y-10 leading-relaxed">
        <section>
          <h2 className="text-2xl font-semibold text-neon-violet mb-3">
            1. Présentation du site
          </h2>
          <p>
            Le site <strong>Ghost Remix Pack</strong> est édité par une équipe de
            producteurs et DJs indépendants opérant sous label anonyme.
            L'objectif du site est de proposer la vente de packs de remixes
            exclusifs destinés aux DJs, créateurs de contenu et artistes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-neon-violet mb-3">
            2. Nature du service
          </h2>
          <p>
            Chaque pack vendu est <strong>unique</strong> et retiré du site dès
            son achat. Cela garantit une exclusivité totale. Une fois vendu, un
            nouveau pack est mis en ligne. Le principe repose sur la règle du{" "}
            <strong>premier arrivé, premier servi</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-neon-violet mb-3">
            3. Conditions d'utilisation
          </h2>
          <p>
            Les remixes proposés sont livrés <strong>sans tag, sans signature
            vocale</strong> et peuvent être utilisés librement à des fins de
            performance, diffusion ou création de contenu. Toute reproduction,
            revente ou diffusion massive du pack en tant que produit brut est
            strictement interdite.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-neon-violet mb-3">
            4. Paiement et livraison
          </h2>
          <p>
            Les paiements sont sécurisés via la plateforme{" "}
            <strong>Stripe</strong>. Après validation du paiement, le client
            reçoit son pack par e-mail sous un délai maximum de{" "}
            <strong>48 heures</strong>. Les fichiers sont livrés au format WAV ou
            MP3 selon la configuration du pack.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-neon-violet mb-3">
            5. Anonymat et confidentialité
          </h2>
          <p>
            L'identité des producteurs et acheteurs reste{" "}
            <strong>strictement confidentielle</strong>. Les contenus vendus sont
            sous licence anonyme : vous gardez 100 % des droits d'exploitation.
            Aucune mention du site ou de ses créateurs ne doit apparaître dans
            les publications associées au pack acheté.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-neon-violet mb-3">
            6. Efficacité et contenu des remixes
          </h2>
          <p>
            Les remixes proposés sont conçus par des{" "}
            <strong>DJs professionnels européens</strong> encore actifs. Chaque
            production est testée en conditions réelles, avec un taux moyen de{" "}
            <strong>85 % d'efficacité en club</strong> (France et Europe). Les
            remixes concernent exclusivement des{" "}
            <strong>hits français ou européens</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-neon-violet mb-3">
            7. Absence de remboursement
          </h2>
          <p>
            En raison de la nature numérique et exclusive des fichiers,{" "}
            <strong>aucun remboursement</strong> ne pourra être effectué après
            livraison du pack. L'acheteur reconnaît expressément renoncer à son
            droit de rétractation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-neon-violet mb-3">
            8. Propriété intellectuelle
          </h2>
          <p>
            Tous les éléments du site Ghost Remix Pack (textes, visuels,
            concepts, codes sources) demeurent la propriété exclusive de leurs
            auteurs. Toute reproduction partielle ou totale est interdite sans
            autorisation écrite préalable.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-neon-violet mb-3">
            9. Responsabilité
          </h2>
          <p>
            Ghost Remix Pack décline toute responsabilité en cas d'utilisation
            non conforme des fichiers achetés. L'acheteur est seul responsable de
            la diffusion et de l'usage public des remixes obtenus.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-neon-violet mb-3">
            10. Contact
          </h2>
          <p>
            Pour toute question, collaboration ou problème technique, contactez
            notre équipe via :{" "}
            <a
              href="mailto:producerghostremixpack@gmail.com"
              className="text-neon-violet hover:text-glow-violet hover:underline transition-all duration-300"
            >
              producerghostremixpack@gmail.com
            </a>
          </p>
        </section>

        <div className="text-center mt-16 text-sm text-text-secondary/60">
          <p>© {new Date().getFullYear()} Ghost Remix Pack — Tous droits réservés.</p>
        </div>
      </div>
    </div>
  );
}

