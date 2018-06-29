<template>
  <div class="hello">
      <h2>Conditions Générales d'Utilisation</h2>
      <h3>Préambule</h3>
<p>La présente charte définit les modalités d’utilisation du site Tâtevin.</p>
<p>Le site permet la consultation en ligne d’informations et de données sur les vins, incluant des actualités, des témoignages, des images, etc…</p>
<p>Ainsi que des accès à différents services tels qu’une liste des vins inscrits par nos utilisateurs, des pages d’apprentissage autour du vin, une page de lexique, un outil de gestion de cave, etc…<p>
<p>L’accès à une partie des données et services peut être restreint, ainsi qu’exposé ci-après.</p>
<p>Toute personne naviguant sur le site est considérée comme un utilisateur, qu’elle soit identifiée ou non sur le site, contributrice ou non.</p>
<h3>Acceptation de la charte</h3>
<p>En utilisant le site Tâtevin, l’utilisateur accepte de respecter les conditions d'utilisation et de navigation définies dans la présente charte. </p>
<p>La charte pouvant être modifiée à tout moment par l'éditeur sans notification préalable, il appartient à l’utilisateur du site de la consulter régulièrement. </p>
<p>L’utilisateur est réputé avoir accepté la dernière version à chaque nouvelle connexion au site. Toute connexion au site est subordonnée au respect de la présente charte.</p>
<h3>Engagement de l’utilisateur</h3>
<p>L’utilisateur du site s’engage à avoir plus de 18 ans, ainsi qu’à participer à l’activité du site comme un bon père de famille. </p>
<p>Les producteurs s’engagent à créer un compte producteur pour renseigner des informations supplémentaires sur leurs vins, dans les espaces destinés à cette endroit.</p>
<p>L’utilisateur s’engage à n'enfreindre aucune loi ou règlement. Sont notamment interdits, sous peine, le cas échéant, de sanctions pénales :</p>
<p>L’atteinte à la vie privée d'autrui (citation nominative de tierces personnes sans leur accord explicite). Dans ce cadre, l'envoi de messages électroniques non sollicités aux utilisateurs du site est interdit ;</p>
<p>La diffamation et l'injure ;</p>
<p>L’incitation aux crimes et délits et la provocation au suicide, la provocation à la discrimination, à la haine notamment raciale, ou à la violence ;</p>
<p>L’apologie de tous les crimes, notamment meurtre, viol, crime de guerre et crime contre l'humanité ; la négation de crimes contre l'humanité ;</p>
<p>La reproduction, représentation ou diffusion d'une œuvre soumise à des droits de propriété intellectuelle ne le permettant pas ;</p>
<p>La publicité ou les messages ou contenus de quelque nature que ce soit à vocation commerciale ;</p>
<p>Les discussions traitant de la copie de logiciels commerciaux pour un usage autre qu'une copie de sauvegarde dans les conditions prévues par le code de la propriété intellectuelle.</p>
<h3>Protection des données</h3>
<p>Tâtevin s’engage à fournir un registre de l’ensemble des données par utilisateur, depuis son profil, afin de lui donner une vision d’ensemble de son activité au sein du site à un instant précis.</p>
<h3>Respect de l’intégrité et de la sécurité informatique</h3>
<p>L’utilisateur s’engage à respecter la réglementation en vigueur en matière de fraude informatique, et à ce titre, à s’abstenir de tenter une intrusion dans un système de traitement automatisé de données ou d'altérer, totalement ou partiellement les éléments qu'il contient. Il est informé que de tels actes sont passibles de sanctions pénales. Il appartient également à l’utilisateur de ne pas transmettre d’éléments contenant des virus, d’utiliser le site pour toute action malveillante de type piratage ou autres hackings.</p>
<h3>Indemnisation</h3>
<p>L’utilisateur pourra être contraint à indemniser Tâtevin en cas de dommage ou réclamation émanant de tiers consécutif à l'envoi, la diffusion ou la transmission de contenu par l'utilisateur ou à l'utilisation du site de manière non autorisée ou au non-respect des dispositions de la charte.</p>
<h3>Liens vers d’autres sites</h3>
<p>Les liens proposés vers des sites externes au site de Tâtevin ne sauraient engager la responsabilité de Tâtevin quant à leur contenu et à leurs conditions d’accès. De tels liens ne constituent pas une recommandation ni une validation des sites en cause ou de leur contenu.</p>
<h3>Mots de passe </h3>
<p>L’utilisateur est responsable des mots de passe qui lui sont attribués pour l'accès et la mise en œuvre des services à accès restreints du site Tâtevin.</p>
<p>Il lui appartient de :</p>
<p>Mettre en œuvre les mesures de précaution et de sécurité nécessaires à la protection de ses identifiants et mots de passe,</p>
<p>Contacter Tâtevin sans délai s’il prend connaissance d’un vol, d’une perte, d’une utilisation de ses identifiants par un tiers non autorisé.</p>
<p>Tâtevin ne pourra être tenue responsable de l'utilisation frauduleuse d’identifiants utilisés par un tiers les ayant subtilisés.</p>
  </div>
</template>

<script>
  import { EventBusModal } from "./../events/";

  export default {
    name: 'cgu',
    data () {
      return {
      }
    },
    mounted(){
      EventBusModal.$on('loading', loading => {
EventBusModal.$emit("loading", false);
      })
    },
    methods:{
      test() {
        EventBusModal.$emit("loading", true);
      }
    }
  }
</script>
