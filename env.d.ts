/// <reference types="vite/client" />


// Cela dit à TypeScript que tous les fichiers .vue sont des composants Vue valides.
declare module "*.vue" {
    import { DefineComponent } from "vue";
    const component: DefineComponent<{}, {}, any>;
    export default component;
}