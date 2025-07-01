import { useEffect, useState, RefObject } from "react";

// Hook personnalisé pour détecter si un élément est visible dans la fenêtre
export const useInViewport = (
  elementRef: RefObject<Element>,                // Référence à l'élément à observer
  unobserveOnIntersect: boolean,                 // Si true, on arrête d'observer après intersection
  options: IntersectionObserverInit = {}         // Options de l'IntersectionObserver (root, rootMargin, threshold)
): boolean => {
  const [intersect, setIntersect] = useState(false);  // État : est-ce que l’élément est dans le viewport ?
  const [isUnobserved, setIsUnobserved] = useState(false); // État : est-ce qu’on a arrêté l’observation ?

  useEffect(() => {
    // Si la référence n'est pas définie, on ne fait rien
    if (!elementRef?.current) return;

    // Création de l'observer avec un callback exécuté à chaque changement d'intersection
    const observer = new IntersectionObserver(([entry]) => {
      const { isIntersecting, target } = entry;

      setIntersect(isIntersecting); // Mise à jour de l’état si visible ou non

      if (isIntersecting && unobserveOnIntersect) {
        observer.unobserve(target);   // On arrête d’observer l’élément
        setIsUnobserved(true);        // On marque comme désobervé pour éviter les futures observations
      }
    }, options);

    // On observe l'élément seulement si ce n’est pas déjà désactivé
    if (!isUnobserved) {
      observer.observe(elementRef.current);
    }

    // Nettoyage : on arrête l'observer quand le composant se démonte
    return () => observer.disconnect();
  }, [elementRef, unobserveOnIntersect, options, isUnobserved]);

  return intersect; // On retourne si l’élément est visible ou non
};
