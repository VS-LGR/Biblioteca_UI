import { TreeMenu } from "../components/navigation";
import menuData from "../data/psychologyTreeMenu.json";
import type { TreeMenuNode } from "../components/navigation/types";

const servicesMenu = (menuData as TreeMenuNode[]).map((item) => {
  if (item.id === "inicio") {
    return { ...item, state: "default" as const };
  }
  if (item.id === "terapia-individual") {
    return { ...item, state: "active" as const };
  }
  return item;
});

export const PsychologyServices = () => {
  return (
    <main style={{ padding: "24px" }}>
      <h1 style={{ marginBottom: "18px" }}>Serviços de Psicologia</h1>
      <TreeMenu title="Menu de serviços da clínica" data={servicesMenu} variant="calm" size="md" />
    </main>
  );
};

export default PsychologyServices;
