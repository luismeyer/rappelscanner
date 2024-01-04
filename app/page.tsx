import { kv } from '@vercel/kv';

import { RappelConso } from '@/components/rappel-conso';
import { ProductSection } from '@/app/components/product-section';
import { generatePageMeta } from '@/config/seo';
import { appDescription, appTitle } from '@/config/constants';

export const metadata = generatePageMeta({
  title: `${appTitle} - Vérification de rappels produits par code barre`,
  description: appDescription,
  url: '/',
});

export const revalidate = 60;

export default async function Home() {
  const scans = await kv.get<string | null>('scans');

  return (
    <main className="max-w-2xl mx-auto my-10 sm:my-16">
      <h1 className="font-bold text-3xl">
        Scannez le code barre de votre produit, découvrez s&apos;il fait
        l&apos;objet d&apos;un rappel
      </h1>
      <p className="text-slate-600 mt-3">
        Chaque année, des centaines de produits font l&apos;objet de rappels à
        la consommation pour des raisons de sécurité. RappelScanner vous permet
        de vérifier si le produit que vous possédez est rappelé.
      </p>
      <ProductSection className="mt-5" />
      <RappelConso className="mt-5" />
      <p>Scans: {scans || 'xxxxxx'}</p>
    </main>
  );
}
