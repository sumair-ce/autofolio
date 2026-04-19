import { CreatedPage } from "@/components/created-page";

export default async function CreatedRoute(props: {
  params: Promise<{ code: string }>;
}) {
  const params = await props.params;

  return <CreatedPage code={params.code} />;
}
