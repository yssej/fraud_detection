import React from "react";
import {Bell, Building, BadgeDollarSign, Zap, CreditCard, BrainCircuit, LayoutDashboard} from "lucide-react";

const Features = () => {
    const features = [
        {
            id: 1,
            icon: Building,
            title: "Gestion des comptes multi-tenant",
            description: "Créez et pilotez vos organisations en toute simplicité: invitez vos équipes, attribuez " +
                "des rôles clairs et profitez d’une expérience fluide avec inscription rapide, connexion simplifiée et " +
                "sécurité renforcée."
        },
        {
            id: 2,
            icon: CreditCard,
            title: "Connexion aux sources financières",
            description: "Connectez vos comptes externes en un clic (API bancaire, Stripe, PayPal, CSV, webhooks) et " +
                "profitez d’une synchronisation automatique ou en temps réel pour ne rien manquer."
        },
        {
            id: 3,
            icon: BadgeDollarSign,
            title: "Gestion des transactions",
            description: "Accédez à vos transactions avec filtres, recherche et tri intelligents, puis explorez chaque " +
                "détail avec historique, score de risque et analyse IA enrichie."
        },
        {
            id: 4,
            icon: BrainCircuit,
            title: "Moteur de détection de fraude (IA)",
            description: "Déjouez la fraude avant qu’elle ne frappe ! Notre moteur IA analyse chaque transaction " +
                "avec un scoring dynamique, déclenche des alertes intelligentes en temps réel et révèle les comportements " +
                "suspects grâce à une analyse avancée, pour une sécurité proactive et une confiance totale."
        },
        {
            id: 5,
            icon: LayoutDashboard,
            title: "Tableau de bord & Analytics",
            description: "Pilotez vos performances avec un dashboard intelligent qui met en avant vos KPI clés " +
                "et des graphiques dynamiques pour suivre l’évolution d’œil. Grâce aux filtres globaux, vous obtenez " +
                "une analyse sur‑mesure et une vision claire pour des décisions rapides et stratégiques."
        },
        {
            id: 6,
            icon: Bell,
            title: "Alertes intelligentes",
            description: "Recevez des notifications et emails personnalisées dès qu'un seuil de risque critique est détecté."
        }
    ];

    return (
      <section id="features" className="py-20 bg-slate-50">
          <div className="container mx-auto px-6">

              {/* En-tête de section */}
              <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-xl font-bold text-slate-900 mb-4">
                      Fonctionnalités puissantes
                  </h2>
                  <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                      Tout ce dont vous avez besoin pour surveiller et gérer vos risques financiers en toute confiance
                  </p>
              </div>

              {/* Grille de features - Utilisation du .map() pour itérer */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {features.map((feature) => {
                      // Extraction de l'icône - Pattern senior
                      const Icon = feature.icon;

                      return (
                          <div
                              key={feature.id}
                              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300
                               border border-slate-200 hover:border-blue-300 group"
                          >
                              {/* Conteneur de l'icône avec effet hover */}
                              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6
                              group-hover:bg-blue-600 transition-colors duration-300">
                                  <Icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors
                                  duration-300" />
                              </div>

                              {/* Titre de la feature */}
                              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                                  {feature.title}
                              </h3>

                              {/* Description */}
                              <p className="text-slate-600 leading-relaxed">
                                  {feature.description}
                              </p>
                          </div>
                      );
                  })}
              </div>

              {/* CTA supplémentaire en bas de section */}
              <div className="text-center mt-16">
                  <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold
                  text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
                      Explorer toutes les fonctionnalités
                  </button>
              </div>

          </div>
      </section>
    );
};

export default Features;
