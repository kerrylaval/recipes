export default function RecipeDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
          Recipe Details for {params.slug}
        </h1>
        <p className="mt-2 text-lg/8 text-gray-600">
          Here you can find the details for the recipe with slug: {params.slug}.
        </p>
      </div>
    </div>
  );
}
