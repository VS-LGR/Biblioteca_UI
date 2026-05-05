import { TreeMenu } from "../components/navigation";
import menuData from "../data/psychologyTreeMenu.json";
import type { TreeMenuNode } from "../components/navigation/types";

export const PsychologyHome = () => {
  return (
    <main style={{ padding: "24px" }}>
      <h1 style={{ marginBottom: "18px" }}>Clínica de Psicologia</h1>
      <TreeMenu
        title="Menu principal da clínica"
        data={menuData as TreeMenuNode[]}
        variant="psychology"
        size="lg"
        onNodeClick={(node) => {
          if (!node.href) return;
          // Keep callback explicit to integrate analytics later.
          console.info("Menu node clicked:", node.id);
        }}
      />
    </main>
  );
};

export default PsychologyHome;
