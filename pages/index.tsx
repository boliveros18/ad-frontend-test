import { Layout } from "@/components/layouts/Layout";
import { FilterUi } from "@/components/ui/FilterUi";
import { Header } from "@/components/Header";
import { ItemsContainer } from "@/components/ItemsContainer";

export default function Home() {
  return (
    <Layout>
      <Header />
      <FilterUi />
      <ItemsContainer />
    </Layout>
  );
}
