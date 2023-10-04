import { initializeSidebar } from "./uiManagement.js";
import { initializePokemonList } from "./uiManagement.js";
import { initializeModals } from "./uiManagement.js";
import { initializeCollectionManagement} from "./uiManagement.js";

export function initializeApp() {
    initializeSidebar();
    initializePokemonList();
    initializeModals();

initializeCollectionManagement();
}
